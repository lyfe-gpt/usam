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
    relatedGuide: "what-is-a-dscr-loan",
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
    relatedGuide: "fix-and-flip-loan-requirements",
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
  {
    slug: "brrrr",
    kind: "brrrr",
    title: "BRRRR Calculator",
    navSub: "Buy, rehab, rent, refinance",
    metaTitle: "BRRRR Calculator | Cash Left In Deal & Cash-on-Cash | USAM Fund",
    description:
      "Free BRRRR calculator. Enter purchase, rehab, ARV, and refinance terms to see how much cash you pull back out, what stays in the deal, and your cash-on-cash return.",
    h1: "BRRRR Calculator",
    tagline: "See how much capital you recover on the refinance.",
    intro:
      "BRRRR (buy, rehab, rent, refinance, repeat) works when the refinance returns most or all of the cash you put in, so you can roll it into the next deal. This calculator shows how much you pull back out, how much stays trapped in the property, and the cash-on-cash return on whatever is left.",
    relatedProgram: "fix-flip",
    relatedGuide: "brrrr-method-financing",
    faqs: [
      {
        q: "How does the BRRRR method work?",
        a: "You buy a distressed property, rehab it to force appreciation, rent it to a tenant, then refinance based on the new (higher) appraised value to pull your capital back out, and repeat. The refinance loan is sized off the after-repair value, not your purchase price.",
      },
      {
        q: "What is a good BRRRR outcome?",
        a: "The ideal is a full BRRRR, where the cash-out refinance returns all the money you invested, leaving zero of your own capital in the deal and an effectively infinite cash-on-cash return. Even a partial recovery that leaves a small amount in at strong cash flow is a solid result.",
      },
      {
        q: "What refinance LTV should I expect?",
        a: "Many DSCR and conventional cash-out refinances on investment property cap out around 70 to 75 percent of the after-repair value. This calculator defaults to 75 percent; adjust it to match your lender's terms.",
      },
    ],
  },
  {
    slug: "hard-money-cost",
    kind: "hardmoneycost",
    title: "Hard Money Cost Calculator",
    navSub: "Points, interest, and fees",
    metaTitle: "Hard Money Loan Cost Calculator | Points + Interest | USAM Fund",
    description:
      "Free hard money cost calculator. Enter loan amount, rate, points, term, and fees to see the all-in cost of the loan and an effective annualized cost of capital.",
    h1: "Hard Money Cost Calculator",
    tagline: "Know the all-in cost before you borrow.",
    intro:
      "A hard money loan's headline rate is only part of the cost. Origination points and fees are paid up front no matter how long you hold, while interest accrues for the months you keep the loan. This calculator adds it all up so you can compare lenders on total cost, not just the rate.",
    relatedProgram: "fix-flip",
    relatedGuide: "hard-money-loan-rates-and-costs",
    faqs: [
      {
        q: "What are points on a hard money loan?",
        a: "Points are an origination fee charged up front, expressed as a percentage of the loan. Two points on a 300,000 dollar loan is 6,000 dollars. Points are paid regardless of how long you hold the loan, so a fast exit does not reduce them.",
      },
      {
        q: "Are hard money loans interest-only?",
        a: "Most are. You typically pay only the monthly interest during the term and repay the full principal at the end (at sale or refinance). That keeps the monthly payment lower while you renovate, which is why this calculator models interest-only.",
      },
      {
        q: "How do I lower the total cost of a hard money loan?",
        a: "Hold the loan for less time. Points and fees are fixed, but interest is the meter that runs every month, so closing the project and exiting faster is the biggest lever on total cost.",
      },
    ],
  },
  {
    slug: "cap-rate",
    kind: "caprate",
    title: "Cap Rate Calculator",
    navSub: "Yield, cash flow, cash-on-cash",
    metaTitle: "Cap Rate Calculator | Rental Yield & Cash-on-Cash | USAM Fund",
    description:
      "Free cap rate calculator for rental property. Enter price, rent, vacancy, and expenses to see cap rate, net operating income, monthly cash flow, and cash-on-cash return.",
    h1: "Cap Rate Calculator",
    tagline: "Measure a rental's yield before you buy.",
    intro:
      "Cap rate is the unlevered yield on a rental, net operating income divided by purchase price, and it is the quickest way to compare deals on an apples-to-apples basis. This calculator also factors in your financing to show monthly cash flow and cash-on-cash return.",
    relatedProgram: "rental-dscr",
    relatedGuide: "what-is-a-dscr-loan",
    faqs: [
      {
        q: "What is a good cap rate?",
        a: "It depends on the market and the risk. In many investor markets, cap rates between 5 and 8 percent are common for stabilized rentals; higher cap rates often signal higher risk or a softer location. Compare cap rates within the same market, not across very different ones.",
      },
      {
        q: "What is the difference between cap rate and cash-on-cash return?",
        a: "Cap rate is unlevered: net operating income divided by purchase price, ignoring any loan. Cash-on-cash return divides your annual cash flow after debt service by the actual cash you put in, so it reflects your financing and down payment.",
      },
      {
        q: "What counts as operating expenses?",
        a: "Property taxes, insurance, property management, maintenance, and reserves, plus any HOA. Operating expenses exclude your mortgage payment, which is why cap rate (which uses NOI) is independent of how the deal is financed.",
      },
    ],
  },
  {
    slug: "cash-out-refinance",
    kind: "cashout",
    title: "Cash-Out Refinance Calculator",
    navSub: "Tappable equity + new payment",
    metaTitle: "Cash-Out Refinance Calculator | Tappable Equity | USAM Fund",
    description:
      "Free cash-out refinance calculator for investment property. Enter value, balance, and max LTV to see how much equity you can pull out and your new monthly payment.",
    h1: "Cash-Out Refinance Calculator",
    tagline: "See how much equity you can put back to work.",
    intro:
      "A cash-out refinance replaces your current loan with a larger one and hands you the difference, tax-free at closing because it is debt, not income. This calculator shows the maximum new loan at your target LTV, the net cash after paying off the existing balance and closing costs, and the new monthly payment.",
    relatedProgram: "rental-dscr",
    relatedGuide: "cash-out-refinance-investment-property",
    faqs: [
      {
        q: "How much can I cash out of an investment property?",
        a: "Most investment-property cash-out refinances cap the new loan around 70 to 75 percent of the value. Your cash out is that new loan minus your existing balance and closing costs, so the more equity you hold, the more you can tap.",
      },
      {
        q: "Is cash-out refinance money taxable?",
        a: "No. Loan proceeds are not income, so a cash-out refinance is not taxable at closing. You are borrowing against your equity, and you repay it through the new loan.",
      },
      {
        q: "Why do investors use cash-out refinances?",
        a: "To recycle equity into the next deal without selling, the refinance step of the BRRRR method. It frees up capital for another down payment while keeping the appreciating asset and its cash flow.",
      },
    ],
  },
];

export const calcBySlug = Object.fromEntries(calculators.map((c) => [c.slug, c]));
