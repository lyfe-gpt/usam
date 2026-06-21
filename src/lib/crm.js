// Pushes website leads into the Airtable Sales Pipeline via the REST API.
//
// SECURITY NOTE: This runs in the browser, so VITE_AIRTABLE_TOKEN is baked
// into the shipped JS bundle and is publicly readable. The token MUST be a
// Personal Access Token scoped to ONLY this base with ONLY the
// `data.records:write` scope (no read access), so a leaked token cannot be
// used to read existing leads. Rotate it from the Airtable account if abused.
const BASE_ID = "appJPMRkPVWMwxjsu";
const TABLE_ID = "tblpfqONyahzor2Pn";
const ENDPOINT = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

// Maps the camelCase keys the forms send to stable Airtable field IDs.
// Field IDs (not names) so renaming a column in Airtable never breaks intake.
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
};

// Today's date as YYYY-MM-DD for the Last Contact field.
function today() {
  return new Date().toISOString().slice(0, 10);
}

// Sends a lead to the CRM. Returns true on success, false on failure.
// Never throws — form UX should proceed regardless of CRM availability.
export async function submitLead(payload) {
  const lead = { salesStage: "Qualification", lastContact: today(), ...payload };

  // Translate to { fldXXX: value }, dropping empty/undefined values so we
  // never send blank cells that would overwrite Airtable defaults.
  const fields = {};
  for (const [key, value] of Object.entries(lead)) {
    const fieldId = FIELD_IDS[key];
    if (fieldId && value !== undefined && value !== null && value !== "") {
      fields[fieldId] = value;
    }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      // typecast lets single-select values (Loan Program, Timeline, etc.) be
      // matched/created by their string name instead of requiring option IDs.
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
