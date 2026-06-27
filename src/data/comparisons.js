// Head-to-head comparison pages. High-intent searches ("DSCR vs hard money")
// where the investor is deciding between two financing paths. Each renders a
// comparison table + bottom-line guidance + FAQ schema, and routes to apply.

export const comparisons = [
  {
    slug: "dscr-vs-hard-money",
    metaTitle: "DSCR vs Hard Money Loan | Which to Use | USAM Fund",
    description:
      "DSCR loan vs hard money loan: how they differ on term, qualification, rate, and best use. A plain-English comparison for real estate investors.",
    h1: "DSCR Loan vs Hard Money Loan",
    tagline: "Long-term rental financing versus short-term project capital.",
    intro:
      "These two solve different problems. A DSCR loan is long-term financing for a rental you intend to hold, qualified on the property's cash flow. A hard money loan is short-term, asset-based capital for a project, like a flip or a bridge, that you plan to exit quickly. Many investors use both: hard money to acquire and renovate, then a DSCR loan to refinance and hold.",
    a: { name: "DSCR Loan", blurb: "Buy-and-hold rentals" },
    b: { name: "Hard Money Loan", blurb: "Flips, bridges, short-term" },
    rows: [
      ["Loan purpose", "Long-term rental hold", "Short-term project or bridge"],
      ["Typical term", "30-year amortization", "6 to 18 months"],
      ["Qualifies on", "Property rent vs. payment (DSCR)", "The asset and the deal"],
      ["Payment type", "Principal and interest", "Usually interest-only"],
      ["Speed to close", "Days to a couple weeks", "As few as 5 to 7 days"],
      ["Best for", "Stabilized, rented properties", "Distressed or value-add deals"],
    ],
    bottomLine:
      "If the property is rented and you plan to hold it, a DSCR loan is the cheaper long-term home. If you are buying to renovate or need to move fast, hard money gets you in, then refinance into a DSCR loan once it is stabilized.",
    relatedProgram: "rental-dscr",
    relatedGuide: "what-is-a-dscr-loan",
    faqs: [
      { q: "Can I refinance a hard money loan into a DSCR loan?", a: "Yes, and it is a very common path. Investors use hard money to buy and renovate, then refinance into a long-term DSCR loan once the property is rented and stabilized, often pulling cash back out in the process." },
      { q: "Is hard money more expensive than a DSCR loan?", a: "Per month, usually yes, because hard money prices in speed and short-term risk. But you only hold it briefly. A DSCR loan has a lower rate because it is a long-term, lower-risk loan on a stabilized property." },
    ],
  },
  {
    slug: "hard-money-vs-private-money",
    metaTitle: "Hard Money vs Private Money | What's the Difference | USAM Fund",
    description:
      "Hard money vs private money loans: both are asset-based, but the source and flexibility differ. A clear comparison for real estate investors.",
    h1: "Hard Money vs Private Money",
    tagline: "Same asset-based idea, different source and flexibility.",
    intro:
      "The terms overlap and are often used interchangeably. Both are asset-based loans secured by the property rather than your personal income, and both are faster and more flexible than a bank. The practical difference is the source: hard money typically comes from a lending company with structured programs, while private money comes from an individual or a fund and can be more negotiable, deal by deal.",
    a: { name: "Hard Money", blurb: "Structured lender programs" },
    b: { name: "Private Money", blurb: "Individual or fund capital" },
    rows: [
      ["Source of capital", "Lending company / fund", "Individual lender or fund"],
      ["Underwriting", "Defined programs and criteria", "Often case-by-case"],
      ["Flexibility", "Consistent, repeatable terms", "More negotiable per deal"],
      ["Secured by", "The property (asset-based)", "The property (asset-based)"],
      ["Speed", "Fast, process-driven", "Fast, relationship-driven"],
      ["Best for", "Predictable, repeat borrowing", "Unusual deals needing flexibility"],
    ],
    bottomLine:
      "If you want consistent, repeatable terms you can plan around, a hard money program is ideal. If your deal is unusual and needs a custom structure, private money's flexibility can be the difference. As a direct lender, USAM does both, our own capital, our own decisions.",
    relatedProgram: "fix-flip",
    relatedGuide: "hard-money-vs-private-money",
    faqs: [
      { q: "Are hard money and private money the same thing?", a: "Close, and the terms are often used interchangeably. Both are asset-based and faster than a bank. The distinction people draw is the source: hard money from a structured lending company, private money from an individual or fund with more case-by-case flexibility." },
      { q: "Which is cheaper?", a: "It varies by lender and deal, not by the label. A direct lender using its own capital can often price better than a broker on either, because there is no middle layer taking a cut." },
    ],
  },
  {
    slug: "dscr-vs-conventional",
    metaTitle: "DSCR vs Conventional Loan | Investor Comparison | USAM Fund",
    description:
      "DSCR loan vs conventional mortgage for investment property: qualification, property limits, LLC ownership, and rates compared.",
    h1: "DSCR Loan vs Conventional Loan",
    tagline: "Qualify on the property, or on your personal income.",
    intro:
      "For an investment property, the core difference is what you qualify on. A DSCR loan looks at whether the property's rent covers its payment, with no personal income documentation, and it can be held in an LLC with no cap on how many you own. A conventional loan qualifies you on your personal income and debt-to-income ratio, usually offers a lower rate, but limits how many financed properties you can hold.",
    a: { name: "DSCR Loan", blurb: "Qualifies on the property" },
    b: { name: "Conventional Loan", blurb: "Qualifies on your income" },
    rows: [
      ["Qualifies on", "Property cash flow (DSCR)", "Personal income and DTI"],
      ["Income docs", "None required", "Tax returns, W-2s, pay stubs"],
      ["Ownership", "LLC friendly", "Usually personal name"],
      ["Property limit", "No set cap", "Often capped (e.g. ~10 financed)"],
      ["Typical rate", "Higher than conventional", "Lowest available"],
      ["Best for", "Self-employed, scaling investors", "W-2 buyers, first few rentals"],
    ],
    bottomLine:
      "If you are self-employed, scaling past the conventional property limit, or want to hold in an LLC, a DSCR loan removes the income-doc and property-count hurdles. If you have strong W-2 income and only a few rentals, a conventional loan's lower rate may win.",
    relatedProgram: "rental-dscr",
    relatedGuide: "dscr-vs-conventional-loan",
    faqs: [
      { q: "Is a DSCR loan rate higher than conventional?", a: "Usually a bit higher, because it is an investor product qualified on the property rather than your income. Investors accept the slightly higher rate for no income docs, LLC ownership, and no cap on the number of properties." },
      { q: "Can I hold a DSCR loan in an LLC?", a: "Yes. DSCR loans are typically LLC-friendly, which is one of the main reasons investors choose them over conventional financing for scaling a portfolio." },
    ],
  },
];

export const comparisonBySlug = Object.fromEntries(comparisons.map((c) => [c.slug, c]));
