// USAM form-intake Lambda. Receives website form submissions and writes them to
// Airtable using a server-side token (process.env.AIRTABLE_TOKEN), so the token
// never ships in the public browser bundle. Routes: POST /leads, POST /partners.
//
// Mirrors the field mapping that used to live in src/lib/crm.js. Node 20 runtime
// (global fetch, no dependencies). CORS is handled by API Gateway, not here.

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

export const handler = async (event) => {
  const path = event.rawPath || event.requestContext?.http?.path || "";
  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, error: "invalid JSON" });
  }

  let ok = false;
  if (path.endsWith("/leads")) {
    ok = await postRecord(
      LEADS_TABLE,
      LEAD_FIELDS,
      withConsent({ salesStage: "Qualification", lastContact: today(), ...payload })
    );
  } else if (path.endsWith("/partners")) {
    ok = await postRecord(
      PARTNERS_TABLE,
      PARTNER_FIELDS,
      withConsent({ status: "Applied", appliedDate: today(), ...payload })
    );
  } else {
    return json(404, { ok: false, error: "unknown route" });
  }

  return json(ok ? 200 : 502, { ok });
};
