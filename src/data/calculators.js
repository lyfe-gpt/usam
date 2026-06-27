// Loan calculators. Each is a high-intent SEO landing page (investors search
// "DSCR calculator", "fix and flip calculator" constantly) that also keeps the
// visitor on-site and feeds the apply flow. Meta/copy here; the interactive
// widgets live in src/components/calculators/.

export const calculators = [
  {
    slug: "dscr",
    kind: "dscr",
    title: "DSCR Calculator",
    navSub: "Rental debt-service ratio",
    metaTitle: "DSCR Calculator | Rental Loan Debt-Service Ratio | USAM Fund",
    description:
      "Free DSCR calculator for rental property investors. Enter rent, loan terms, taxes, and insurance to see your debt-service coverage ratio and monthly cash flow instantly.",
    h1: "DSCR Calculator",
    tagline: "See if your rental cash-flows before you apply.",
    intro:
      "DSCR (debt-service coverage ratio) is how rental lenders decide whether a property pays for itself. It compares the monthly rent to the full monthly payment (principal, interest, taxes, insurance, and HOA). A DSCR of 1.0 means the rent exactly covers the payment; most lenders want 1.0 or higher, and the best pricing usually starts around 1.25.",
    relatedProgram: "rental-dscr",
    relatedGuide: "dscr-loans",
    faqs: [
      {
        q: "What is a good DSCR for a rental loan?",
        a: "Most DSCR lenders require a ratio of at least 1.0, meaning the rent covers the full payment. A ratio of 1.25 or higher generally unlocks the best rates and leverage. Some programs allow ratios below 1.0 at lower leverage or with reserves.",
      },
      {
        q: "How is DSCR calculated?",
        a: "DSCR equals the gross monthly rent divided by the total monthly payment, including principal, interest, property taxes, insurance, and any HOA dues (PITIA). A result of 1.20 means the property earns 20 percent more than its payment each month.",
      },
      {
        q: "Does a low DSCR mean I can't get a loan?",
        a: "Not necessarily. A lower DSCR may still qualify at reduced leverage, with cash reserves, or under a no-ratio program. Run your scenario by us and we will tell you what is realistic for your deal.",
      },
    ],
  },
  {
    slug: "fix-and-flip",
    kind: "fixflip",
    title: "Fix and Flip Calculator",
    navSub: "ARV, profit, and the 70% rule",
    metaTitle: "Fix and Flip Calculator | ARV, Profit, 70% Rule | USAM Fund",
    description:
      "Free fix and flip calculator. Enter purchase price, rehab budget, and ARV to see projected profit, ROI, and your maximum allowable offer under the 70% rule.",
    h1: "Fix and Flip Calculator",
    tagline: "Underwrite the flip before you make the offer.",
    intro:
      "Before you tie up a flip, the numbers have to work. This calculator estimates your net profit, return on investment, and the maximum allowable offer (MAO) under the classic 70% rule, so you know whether a deal pencils out before you sign anything.",
    relatedProgram: "fix-flip",
    relatedGuide: "fix-and-flip-loans",
    faqs: [
      {
        q: "What is the 70% rule in house flipping?",
        a: "The 70% rule says an investor should pay no more than 70 percent of a property's after-repair value (ARV) minus rehab costs. It builds in a margin for holding costs, selling costs, and profit. The formula is: Maximum Allowable Offer = (ARV x 0.70) - rehab budget.",
      },
      {
        q: "What costs should I include in a flip analysis?",
        a: "Beyond purchase and rehab, account for holding costs (loan interest, taxes, insurance, utilities) and selling costs (agent commissions and closing, usually 6 to 8 percent of the sale price). Leaving these out is the most common way flippers overpay.",
      },
      {
        q: "How much profit should a flip make?",
        a: "Many active flippers target a minimum net profit of 10 to 15 percent of ARV, or a fixed dollar floor, to absorb surprises. This calculator shows your projected net profit and ROI so you can compare a deal against your own threshold.",
      },
    ],
  },
];

export const calcBySlug = Object.fromEntries(calculators.map((c) => [c.slug, c]));
