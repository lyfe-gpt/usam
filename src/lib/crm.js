// Pushes website submissions into Airtable via the REST API.
//
// SECURITY NOTE: This runs in the browser, so VITE_AIRTABLE_TOKEN is baked
// into the shipped JS bundle and is publicly readable. The token MUST be a
// Personal Access Token scoped to ONLY this base with ONLY the
// `data.records:write` scope (no read access), so a leaked token cannot be
// used to read existing records. Rotate it from the Airtable account if abused.
const BASE_ID = "appJPMRkPVWMwxjsu";
const TABLE_ID = "tblpfqONyahzor2Pn"; // Sales Deals (borrower leads)
const PARTNERS_TABLE_ID = "tbl1AzCPOIDxpy4Zx"; // Partners (referral partners)
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

// Borrower-lead fields (Sales Deals). IDs (not names) so renaming a column in
// Airtable never breaks intake.
const FIELD_IDS = {
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
  partnerCode: "fldaDER9xotXel3kd", // ?ref=CODE attribution to the Partners table
};

// Referral-partner fields (Partners table).
const PARTNER_FIELD_IDS = {
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
};

// Today's date as YYYY-MM-DD.
function today() {
  return new Date().toISOString().slice(0, 10);
}

// Posts one record to a table. Translates camelCase keys to field IDs, drops
// empty values, and never throws so form UX proceeds regardless of CRM state.
async function postRecord(tableId, fieldMap, payload) {
  const fields = {};
  for (const [key, value] of Object.entries(payload)) {
    const fieldId = fieldMap[key];
    if (fieldId && value !== undefined && value !== null && value !== "") {
      fields[fieldId] = value;
    }
  }
  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      // typecast lets single-select values be matched/created by name.
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });
    if (!res.ok) {
      console.error("CRM submit failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("CRM submit failed:", err);
    return false;
  }
}

// Sends a borrower lead to the Sales Deals table.
export async function submitLead(payload) {
  return postRecord(TABLE_ID, FIELD_IDS, { salesStage: "Qualification", lastContact: today(), ...payload });
}

// Sends a partner application to the Partners table.
export async function submitPartner(payload) {
  return postRecord(PARTNERS_TABLE_ID, PARTNER_FIELD_IDS, { status: "Applied", appliedDate: today(), ...payload });
}
