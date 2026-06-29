// Static config for the Apply flow: loan-type cards, the program-slug to
// loan-type map, the experience/timeline options, and the per-program "numbers"
// step field lists. Kept out of Apply.jsx so the component stays focused on flow.

export const LOAN_TYPES = [
  { value: "Fix and Flip", label: "Fix and Flip", sub: "Buy, renovate, sell", icon: "fixFlip" },
  { value: "Rental / DSCR", label: "Rental / DSCR", sub: "Long-term hold", icon: "rental" },
  { value: "Ground-Up Construction", label: "Ground-Up", sub: "New construction", icon: "construction" },
  { value: "CRE Bridge", label: "CRE Bridge", sub: "Commercial bridge", icon: "bridge" },
  { value: "Transactional", label: "Transactional", sub: "Double closing", icon: "transactional" },
  { value: "Bank Statement / No-Doc", label: "Bank Statement", sub: "No tax returns", icon: "bankStatement" },
  { value: "Conventional Investment", label: "Conventional", sub: "Investment property", icon: "conventional" },
  { value: "Portfolio Loans", label: "Portfolio", sub: "Multiple properties", icon: "portfolio" },
  { value: "CRE Permanent", label: "CRE Permanent", sub: "Long-term commercial", icon: "commercial" },
  { value: "SBA Financing", label: "SBA", sub: "7(a) & 504", icon: "sba" },
];

// Maps a program slug (from the /qualify quiz or a program-page deep link, e.g.
// /apply?program=fix-flip) to the matching loan-type value above, so the choice
// carries through and we can skip the redundant loan-type step.
export const PROGRAM_TO_LOANTYPE = {
  "fix-flip": "Fix and Flip",
  "rental-dscr": "Rental / DSCR",
  "construction": "Ground-Up Construction",
  "cre-bridge": "CRE Bridge",
  "transactional": "Transactional",
  "bank-statement": "Bank Statement / No-Doc",
  "conventional-investment": "Conventional Investment",
  "portfolio": "Portfolio Loans",
  "cre-permanent": "CRE Permanent",
  "sba": "SBA Financing",
};

export const EXPERIENCE = [
  ["This is my first", "First deal"],
  ["1-2 deals", "1-2 deals"],
  ["3-5 deals", "3-5 deals"],
  ["6 or more", "6+ deals"],
];

export const TIMELINE = [
  ["As soon as possible", "ASAP"],
  ["Within 30 days", "Within 30 days"],
  ["60+ days out", "60+ days"],
  ["Just exploring", "Just exploring"],
];

// The "numbers" step (step 2) asks different questions per program. Each entry
// is the ordered list of fields to render. Currency keys "purchase", "rehab",
// "arv" reuse the existing Airtable columns (the primary amount flexes by
// program); "monthlyRent" and "loanAmount" have their own columns; everything
// else (noi, downPayment, etc.) is folded into Notes in finish().
export const DEFAULT_NUMBERS = [
  { key: "purchase", label: "Purchase price", type: "currency" },
  { key: "rehab", label: "Rehab budget", type: "currency", hint: "(if any)" },
  { key: "arv", label: "After-repair value (ARV)", type: "currency", hint: "(if known)" },
];

export const NUMBERS_BY_PROGRAM = {
  "Fix and Flip": DEFAULT_NUMBERS,
  "Ground-Up Construction": [
    { key: "purchase", label: "Land / lot cost", type: "currency" },
    { key: "rehab", label: "Construction budget", type: "currency" },
    { key: "arv", label: "Completed value", type: "currency", hint: "(if known)" },
  ],
  "Rental / DSCR": [
    { key: "purchase", label: "Purchase price", type: "currency" },
    { key: "monthlyRent", label: "Expected monthly rent", type: "currency" },
    { key: "rehab", label: "Light rehab budget", type: "currency", hint: "(if any)" },
  ],
  "CRE Bridge": [
    { key: "loanAmount", label: "Loan amount needed", type: "currency" },
    { key: "purchase", label: "Property value", type: "currency" },
    { key: "noi", label: "Annual net operating income (NOI)", type: "currency", hint: "(if known)" },
  ],
  "CRE Permanent": [
    { key: "loanAmount", label: "Loan amount needed", type: "currency" },
    { key: "purchase", label: "Property value", type: "currency" },
    { key: "noi", label: "Annual net operating income (NOI)", type: "currency", hint: "(if known)" },
  ],
  "Transactional": [
    { key: "purchase", label: "Your purchase price (A to B)", type: "currency" },
    { key: "resalePrice", label: "Resale price (B to C)", type: "currency" },
  ],
  "Bank Statement / No-Doc": [
    { key: "purchase", label: "Purchase price", type: "currency" },
    { key: "downPayment", label: "Down payment", type: "select", options: ["25% or more", "20%", "15%", "10% or less"] },
    { key: "avgDeposits", label: "Avg monthly bank deposits", type: "currency", hint: "(if known)" },
  ],
  "Conventional Investment": [
    { key: "purchase", label: "Purchase price", type: "currency" },
    { key: "downPayment", label: "Down payment", type: "select", options: ["25% or more", "20%", "15%", "Less than 15%"] },
    { key: "creditBand", label: "Estimated credit score", type: "select", options: ["740+", "700-739", "660-699", "Below 660"] },
  ],
  "Portfolio Loans": [
    { key: "numProperties", label: "Number of properties", type: "number", placeholder: "e.g. 6" },
    { key: "purchase", label: "Total portfolio value", type: "currency" },
    { key: "monthlyRent", label: "Total monthly rent", type: "currency", hint: "(if known)" },
  ],
  "SBA Financing": [
    { key: "loanAmount", label: "Loan amount", type: "currency" },
    { key: "useOfFunds", label: "Use of funds", type: "select", options: ["Owner-occupied real estate", "Business acquisition", "Equipment", "Working capital"] },
    { key: "timeInBusiness", label: "Time in business", type: "select", options: ["Startup / pre-revenue", "Less than 2 years", "2-5 years", "5+ years"] },
  ],
};
