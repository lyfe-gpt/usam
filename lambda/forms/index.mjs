// USAM form-intake Lambda. Receives website form submissions and writes them to
// Airtable using a server-side token (process.env.AIRTABLE_TOKEN), so the token
// never ships in the public browser bundle. Routes: POST /leads, POST /partners.
//
// Mirrors the field mapping that used to live in src/lib/crm.js. Node 20 runtime
// (global fetch + bundled AWS SDK v3, no extra deps). CORS is handled by API
// Gateway, not here. Abuse controls: per-IP rate limit (DynamoDB) + validation.

import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const BASE_ID = "appJPMRkPVWMwxjsu";
const LEADS_TABLE = "tblpfqONyahzor2Pn"; // Sales Deals (borrower leads)
const PARTNERS_TABLE = "tbl1AzCPOIDxpy4Zx"; // Partners (referral partners)

// Version tag for the SMS consent wording. Bump when the consent text changes so
// the stored record matches what the user agreed to (A2P 10DLC / TCR audits).
const SMS_CONSENT_VERSION = "v1-2026-06";

// Borrower-lead fields (Sales Deals). Field IDs so renaming a column never breaks intake.
const LEAD_FIELDS = {
  name: "fldFqwY86stOpk3Ri",
  email: "fldZZdcEQ7c15vqfC",
  phone: "fldBQVJLK4Lo7cpB1",
  leadSource: "fld4MwaC5sm4v91zd",
  loanProgram: "fldsePsubhX4YLdeb",
  propertyAddress: "fldgBBYGdJA52qhK0",
  propertyType: "fldAEef5dNzNBqiGa",
  purchasePrice: "fldI1bFhETTgp1qNL",
  rehabBudget: "fldpRdZDpjmCGQqQ2",
  arv: "fldD9rBU97vVpcOEk",
  loanAmount: "fld0d6DC9z6cwBPXo",
  monthlyRent: "fldrcnjalB79Csjwk",
  experience: "fldOPFP1f2RFDx6Ll",
  timeline: "fldGv7FXGaivnKIFd",
  salesStage: "fldRFOBTo95UgYeco",
  lastContact: "fldwG5l0QJ8ID78ud",
  notes: "fldyNqmtvb4R7Az5r",
  partnerCode: "fldaDER9xotXel3kd",
  smsConsent: "fld86sRfGN6vRODUb",
  smsConsentAt: "fldNI7vVzoMowsQz2",
  consentVersion: "fldaakMHa1niFBSnb",
};

// Referral-partner fields (Partners table).
const PARTNER_FIELDS = {
  name: "fldYWZBKZA5K29viA",
  company: "fldn3UhJkTAjEAaFH",
  email: "fldhDxQmp4q4LuANw",
  phone: "fld3qlq6aANu0eNoY",
  partnerType: "fldUznVWVkKEP1qyw",
  market: "fld0LPL2JPVPJvKdD",
  dealsPerMonth: "fldl5EeB3cIBcwNh5",
  referralCode: "fldVz14e7OOMtogm8",
  status: "fldCiYvCG4ajlUnje",
  notes: "fldO09oad4XxGAXIO",
  appliedDate: "fldwJuzIKp4E0NBTa",
  smsConsent: "fldmSAuQ3iqVg2dXw",
  smsConsentAt: "fldThXBvw0FusOWuk",
  consentVersion: "fldiINURaxlCGsDVB",
};

const today = () => new Date().toISOString().slice(0, 10);

// Stamp consent date + version server-side when the form passed smsConsent: true.
function withConsent(payload) {
  if (!payload.smsConsent) return payload;
  return { ...payload, smsConsentAt: today(), consentVersion: SMS_CONSENT_VERSION };
}

// Translate camelCase keys to Airtable field IDs, drop empties, POST one record.
async function postRecord(tableId, fieldMap, payload) {
  const fields = {};
  for (const [key, value] of Object.entries(payload)) {
    const id = fieldMap[key];
    if (id && value !== undefined && value !== null && value !== "") fields[id] = value;
  }
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  if (!res.ok) {
    console.error("Airtable submit failed:", res.status, await res.text());
    return false;
  }
  return true;
}

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

// ── Email notifications (SendGrid) ──────────────────────────────────────────
// Two emails fire after a successful write: (1) an instant lead alert to Jack
// for speed-to-lead, and (2) an auto-reply confirmation to the applicant. Both
// are gated on SENDGRID_API_KEY + SENDGRID_FROM being set, so until Jack adds a
// key in the Lambda env this is a complete no-op and changes nothing. Failures
// are logged and swallowed — a flaky email must never fail a real submission.
//   Env: SENDGRID_API_KEY (secret), SENDGRID_FROM (verified sender),
//        ALERT_EMAIL (where Jack gets alerts; defaults to SENDGRID_FROM).
async function sendEmail({ to, subject, text, replyTo }) {
  const key = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM;
  if (!key || !from || !to) return; // not configured yet — no-op
  const body = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from, name: "USAM Fund" },
    subject,
    content: [{ type: "text/plain", value: text }],
  };
  if (replyTo) body.reply_to = { email: replyTo };
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error("SendGrid send failed:", res.status, await res.text());
}

// Master pause switch for the email layer. Set true to keep all the code below
// but send nothing (lead alert + applicant auto-reply both off). Flip to false
// to re-enable; sends still also require SENDGRID_API_KEY + SENDGRID_FROM.
const NOTIFY_PAUSED = true;

// Fire the lead alert + applicant auto-reply for a submission. `kind` is
// "lead" or "partner". Never throws.
async function notify(kind, payload) {
  if (NOTIFY_PAUSED) return; // paused — code kept, nothing sent
  if (!process.env.SENDGRID_API_KEY) return; // skip the work entirely if unset
  const alertTo = process.env.ALERT_EMAIL || process.env.SENDGRID_FROM;
  const who = payload.name || "Someone";
  const contact = [payload.email, payload.phone].filter(Boolean).join(" · ");

  const alertLines =
    kind === "lead"
      ? [
          `New lead from the website.`,
          ``,
          `Name: ${payload.name || "—"}`,
          `Contact: ${contact || "—"}`,
          `Program: ${payload.loanProgram || "—"}`,
          `Property: ${payload.propertyAddress || "—"}`,
          `Loan amount: ${payload.loanAmount || "—"}`,
          `Timeline: ${payload.timeline || "—"}`,
          payload.notes ? `Notes: ${payload.notes}` : ``,
        ]
      : [
          `New partner application from the website.`,
          ``,
          `Name: ${payload.name || "—"}`,
          `Company: ${payload.company || "—"}`,
          `Contact: ${contact || "—"}`,
          `Type: ${payload.partnerType || "—"}`,
          `Market: ${payload.market || "—"}`,
        ];

  const replyText =
    kind === "lead"
      ? `Hi ${who},\n\nThanks for reaching out to USAM Fund. We received your request and a member of our team will follow up shortly to talk through your deal. If you need us sooner, call 512-488-6087.\n\nUSAM Fund\nDirect private and hard-money lending`
      : `Hi ${who},\n\nThanks for your interest in partnering with USAM Fund. We received your application and will be in touch soon. Questions in the meantime? Call 512-488-6087.\n\nUSAM Fund\nDirect private and hard-money lending`;

  const tasks = [
    sendEmail({
      to: alertTo,
      subject: kind === "lead" ? `New lead: ${who}` : `New partner: ${who}`,
      text: alertLines.filter((l) => l !== undefined).join("\n"),
      replyTo: payload.email || undefined,
    }),
  ];
  if (payload.email) {
    tasks.push(
      sendEmail({
        to: payload.email,
        subject: "We got your request — USAM Fund",
        text: replyText,
      })
    );
  }
  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("notify error:", r.reason));
}

// Per-IP rate limit via DynamoDB fixed-minute buckets. Fail-open on any DB error
// so an infra hiccup never blocks a legitimate lead.
const ddb = new DynamoDBClient({});
const THROTTLE_TABLE = process.env.THROTTLE_TABLE || "usam-forms-throttle";
const PER_IP_PER_MINUTE = 8;

async function rateLimited(ip) {
  if (!ip) return false;
  const minute = Math.floor(Date.now() / 60000);
  try {
    const res = await ddb.send(new UpdateItemCommand({
      TableName: THROTTLE_TABLE,
      Key: { pk: { S: `${ip}#${minute}` } },
      UpdateExpression: "ADD #c :one SET #t = :ttl",
      ExpressionAttributeNames: { "#c": "count", "#t": "ttl" },
      ExpressionAttributeValues: { ":one": { N: "1" }, ":ttl": { N: String(minute * 60 + 120) } },
      ReturnValues: "UPDATED_NEW",
    }));
    return Number(res.Attributes?.count?.N || "0") > PER_IP_PER_MINUTE;
  } catch (err) {
    console.error("rate-limit check failed (fail-open):", err);
    return false;
  }
}

export const handler = async (event) => {
  const path = event.rawPath || event.requestContext?.http?.path || "";
  const ip = event.requestContext?.http?.sourceIp;

  // Abuse control: cap submissions per IP per minute.
  if (await rateLimited(ip)) return json(429, { ok: false, error: "rate limited" });

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, error: "invalid JSON" });
  }

  // Reject obvious junk: a real lead or partner always has an email or phone.
  if (!payload.email && !payload.phone) {
    return json(400, { ok: false, error: "missing contact info" });
  }

  let ok = false;
  let kind = null;
  if (path.endsWith("/leads")) {
    kind = "lead";
    ok = await postRecord(
      LEADS_TABLE,
      LEAD_FIELDS,
      withConsent({ salesStage: "Qualification", lastContact: today(), ...payload })
    );
  } else if (path.endsWith("/partners")) {
    kind = "partner";
    ok = await postRecord(
      PARTNERS_TABLE,
      PARTNER_FIELDS,
      withConsent({ status: "Applied", appliedDate: today(), ...payload })
    );
  } else {
    return json(404, { ok: false, error: "unknown route" });
  }

  // Fire alert + auto-reply on success. Wrapped so an email failure never
  // changes the response the visitor sees.
  if (ok && kind) {
    try {
      await notify(kind, payload);
    } catch (err) {
      console.error("notify failed (non-blocking):", err);
    }
  }

  return json(ok ? 200 : 502, { ok });
};
