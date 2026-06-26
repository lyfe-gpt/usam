// Sends website form submissions to the USAM forms API (API Gateway + Lambda).
//
// The Airtable token now lives ONLY in the Lambda's server-side environment, so
// it is no longer baked into this public browser bundle. The Lambda does the
// field-ID mapping, default fields, and SMS-consent stamping (see
// lambda/forms/index.mjs). This module just POSTs the raw payload.
const API_URL = import.meta.env.VITE_API_URL;

// Posts a payload to one of the API routes. Never throws, so form UX proceeds
// regardless of backend state.
async function submit(route, payload) {
  if (!API_URL) {
    console.error(`VITE_API_URL is not set; cannot submit "${route}"`);
    return false;
  }
  try {
    const res = await fetch(`${API_URL}/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Form submit failed:", res.status);
      return false;
    }
    const data = await res.json().catch(() => ({}));
    return data.ok !== false;
  } catch (err) {
    console.error("Form submit failed:", err);
    return false;
  }
}

// Sends a borrower lead to the Sales Deals table (via the Lambda).
export async function submitLead(payload) {
  return submit("leads", payload);
}

// Sends a partner application to the Partners table (via the Lambda).
export async function submitPartner(payload) {
  return submit("partners", payload);
}
