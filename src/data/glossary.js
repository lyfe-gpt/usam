// Investor-finance glossary. A single hub page that defines the terms used across
// the programs, guides, and calculators, with anchor links per term. Doubles as an
// internal-linking hub and emits DefinedTermSet structured data. Keep definitions
// plain-English and bold-free (the page styles the term itself).

export const glossaryTerms = [
  { term: "After-Repair Value (ARV)", slug: "arv", def: "The estimated market value of a property after planned renovations are complete. Lenders size fix-and-flip and BRRRR loans off ARV, and the 70% rule uses it to set a maximum offer." },
  { term: "Amortization", slug: "amortization", def: "The schedule by which a loan is paid down over time. A 30-year amortization spreads principal and interest across 360 monthly payments, even if the loan has a shorter term or a balloon." },
  { term: "Bridge Loan", slug: "bridge-loan", def: "Short-term financing that 'bridges' a gap, for example buying a new property before selling another, or holding an asset while you reposition it for permanent financing." },
  { term: "BRRRR", slug: "brrrr", def: "Buy, Rehab, Rent, Refinance, Repeat. A strategy where you force value through renovation, refinance based on the higher value to recover your capital, and roll it into the next deal." },
  { term: "Cap Rate", slug: "cap-rate", def: "Capitalization rate: a property's net operating income divided by its price, expressed as a percentage. The unlevered yield, used to compare rentals independent of financing." },
  { term: "Cash-on-Cash Return", slug: "cash-on-cash", def: "Annual pre-tax cash flow divided by the actual cash you invested. Unlike cap rate, it reflects your financing and down payment." },
  { term: "Cash-Out Refinance", slug: "cash-out-refinance", def: "Replacing an existing loan with a larger one and taking the difference in cash. The proceeds are not taxable because they are debt, not income." },
  { term: "Debt-Service Coverage Ratio (DSCR)", slug: "dscr", def: "A rental's monthly rent divided by its full monthly payment (principal, interest, taxes, insurance, HOA). A DSCR of 1.0 means rent exactly covers the payment; lenders usually want 1.0 or higher." },
  { term: "Draw Schedule", slug: "draw-schedule", def: "On a rehab or construction loan, the plan for releasing renovation funds in stages as work is completed and inspected, rather than all at once up front." },
  { term: "Hard Money Loan", slug: "hard-money", def: "Short-term, asset-based financing secured by the property rather than the borrower's income. Priced on speed and the deal, typically interest-only, used for flips and bridges." },
  { term: "Interest-Only", slug: "interest-only", def: "A loan where the monthly payment covers only interest, with the full principal due at the end of the term (at sale or refinance). Common on hard money loans." },
  { term: "Loan-to-Cost (LTC)", slug: "ltc", def: "The loan amount as a percentage of the total project cost (purchase plus rehab). A lender funding 90% LTC covers 90% of your all-in cost." },
  { term: "Loan-to-Value (LTV)", slug: "ltv", def: "The loan amount as a percentage of the property's value (or ARV). Caps how much you can borrow against a property and how much you can pull out on a refinance." },
  { term: "Net Operating Income (NOI)", slug: "noi", def: "A property's effective gross income minus operating expenses, before debt service. The numerator in the cap-rate calculation." },
  { term: "No-Doc / Bank-Statement Loan", slug: "no-doc", def: "A loan that qualifies a borrower on the property's cash flow or bank deposits instead of tax returns and W-2 income. Useful for self-employed investors." },
  { term: "Points", slug: "points", def: "An up-front origination fee expressed as a percentage of the loan. Two points on a $300,000 loan is $6,000, paid regardless of how long you hold the loan." },
  { term: "Portfolio / Blanket Loan", slug: "portfolio-loan", def: "A single loan secured by multiple properties, letting an investor finance or refinance a group of rentals under one instrument instead of many separate loans." },
  { term: "Private Money", slug: "private-money", def: "Capital from a private lender or fund rather than a bank. Like hard money, it is relationship- and asset-based, often with more flexible, faster decisions." },
  { term: "Proof of Funds (POF)", slug: "proof-of-funds", def: "Documentation showing a buyer has the capital or financing to close. Sellers and wholesalers often require it before accepting an offer." },
  { term: "Seasoning", slug: "seasoning", def: "The length of time you must own a property (or hold funds) before a lender will use its new value or those funds. Affects how soon you can refinance after a rehab." },
  { term: "70% Rule", slug: "seventy-percent-rule", def: "A flipping guideline: pay no more than 70% of ARV minus rehab costs. It builds in margin for holding costs, selling costs, and profit." },
  { term: "Transactional Funding", slug: "transactional-funding", def: "Very short-term capital that funds a same-day 'double close,' letting a wholesaler buy and resell a property back-to-back without using their own cash." },
];

export const glossaryBySlug = Object.fromEntries(glossaryTerms.map((t) => [t.slug, t]));
