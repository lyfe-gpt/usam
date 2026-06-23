// FAQ content for the dedicated /faq page and the per-program FAQ sections.
// Written in USAM's voice and kept consistent with the program term cards in
// programs.js. Answers are grounded in 2025-2026 competitor/market research
// (Kiavi, Lima One, RCN, Easy Street, Visio, CoreVest, Roc, Anchor, SBA norms)
// and phrased as real borrower questions for answer-engine optimization (AEO).
// `a` may contain light inline HTML (links, <strong>). No user input here.

// Cross-program questions any private-lending borrower asks.
export const generalFaqs = [
  {
    q: "How is private (hard money) lending different from a bank loan?",
    a: "We are asset-based, which means we underwrite the property, its equity, and your business plan rather than your personal income and tax returns. Because we lend our own capital and decide in house, we fund in days instead of the 30 to 60+ days a bank takes, on short interest-only terms built around a flip, refinance, or sale. You pay a higher rate than a bank in exchange for speed, flexibility, and certainty on deals a bank cannot fund in time.",
  },
  {
    q: "Do you lend to individuals, or do I need an LLC?",
    a: "Most of our loans are made to a business entity such as an LLC, corporation, or partnership rather than to you personally, which keeps them business-purpose. Holding the property in a single-purpose LLC is standard practice, and it is quick and inexpensive to set up. We can point you in the right direction before closing if you do not have an entity yet.",
  },
  {
    q: "Are these consumer mortgages? Can I use one for my own home?",
    a: "No. Every program we offer is a <strong>business-purpose loan</strong> for investment or commercial real estate, not a consumer mortgage. You cannot use these loans to buy or refinance the home you live in. The deciding factor is the purpose of the loan, financing non-owner-occupied or income property, not the property type alone.",
  },
  {
    q: "What states do you lend in?",
    a: "We are a direct private lender working nationwide, across all 50 states. A few programs carry state-specific nuances, so we will confirm availability for your exact scenario the first time we talk.",
  },
  {
    q: "How fast can you close?",
    a: "Bridge and fix and flip loans typically close in <strong>5 to 7 business days</strong> once we have your basics. Rental (DSCR) loans usually take 2 to 3 weeks because of the appraisal and rent verification, and SBA financing runs 30 to 90 days. The biggest variable is how quickly title, insurance, and your documents come together.",
  },
  {
    q: "Do you check credit, and is there a minimum score?",
    a: "We do run credit, but on our asset-based loans it carries far less weight than at a bank, and weaker credit can often be offset with a larger down payment or lower leverage. There is no personal income test on these programs. Credit matters most on long-term rental loans, where most lenders look for a score around 660 to 680 and it affects your rate and leverage.",
  },
  {
    q: "Do I need to provide income documents or tax returns?",
    a: "Generally no. Our bridge, fix and flip, and construction loans qualify off the property and your equity, and our DSCR rental loans qualify off the property's rent, so we do not ask for W-2s or pay stubs. We will want to see bank statements or proof of reserves. SBA financing is the one exception and is fully documented.",
  },
  {
    q: "What do you need to give me a quote?",
    a: "Just the basics of the deal: the property address or type, the purchase price or current value, your rehab budget if any, the loan amount you are after, and your exit plan. We can often pre-qualify you over the phone or through a short application and issue a proof-of-funds letter before you are even under contract.",
  },
  {
    q: "What is a point, and how do your rates compare to a bank?",
    a: "A point is an upfront fee equal to 1% of the loan amount, and origination on private loans typically runs 1 to 3 points. Our rates are higher than a bank, generally in the high single digits to low teens depending on the program, because the loans are short, fast, and flexible. When you compare offers, weigh the rate and the points together as your true cost of capital.",
  },
  {
    q: "What happens if my project runs over schedule?",
    a: "Tell us early. Our terms are built with a cushion, often 12 to 18 months on a bridge loan, and when a project needs more time we can usually arrange an extension. We would rather keep you moving toward a successful exit than be surprised at the maturity date.",
  },
];

// Per-program questions, keyed by program slug.
export const programFaqs = {
  "fix-flip": [
    {
      q: "How much of my fix and flip deal will USAM finance?",
      a: "We fund up to <strong>90% of the purchase price and up to 100% of your rehab budget</strong>, with the total capped against the after-repair value (ARV). Rehab money is released in draws as the work is completed. When the ARV supports an interest reserve, we can structure the loan with no monthly payments for its duration, so your cash stays in the project.",
    },
    {
      q: "What interest rate and points should I expect on a flip loan?",
      a: "Our fix and flip pricing starts around 9.50%, interest-only, with origination typically 1 to 3 points depending on your experience, leverage, and the deal. Across the market most flip loans run roughly 9% to 12%. You pay interest on rehab funds only after you draw them, not on the full budget up front.",
    },
    {
      q: "Do I need flipping experience to qualify?",
      a: "No. We work with first-time flippers as well as full-time operators. Experience mainly affects your leverage and rate, since a longer track record earns higher loan-to-cost and better pricing. A newer investor can still get funded with a sound deal, a realistic budget, and a clear exit.",
    },
    {
      q: "How fast can a fix and flip loan close?",
      a: "We can get you a term sheet in <strong>as little as 48 hours</strong> from a complete application, and we <strong>fund within 48 hours of clear title</strong>. The main variable is how fast title and insurance come together, which is why a full close usually runs <strong>5 to 7 business days</strong>. Because we are the lender and underwrite in house, there is no second layer of approval to wait on.",
    },
    {
      q: "Is there a prepayment penalty if I sell quickly?",
      a: "No. Our fix and flip loans have no prepayment penalty, so paying off early when the property sells costs you nothing extra. Terms run 12 to 18 months, which leaves room if a renovation or sale takes longer than planned.",
    },
    {
      q: "Do you check credit or require income documents?",
      a: "We run credit, but this is an asset-based loan, so the property, your budget, and the ARV matter most. We do not ask for W-2s or tax returns to qualify a flip. We will want to confirm you have reserves to carry the project to its exit.",
    },
  ],
  "rental-dscr": [
    {
      q: "What is a DSCR loan, and how do I qualify without tax returns?",
      a: "A DSCR (debt service coverage ratio) loan qualifies on the property's rental income instead of your personal income, so there are no W-2s or tax returns required. We compare the rent, from a signed lease or the appraiser's market-rent estimate, against the monthly payment. A DSCR of 1.00 means the rent covers the payment, and we lend with a <strong>DSCR as low as 1.00</strong>.",
    },
    {
      q: "What rate and terms can I get on a rental loan?",
      a: "Our rental program starts around 5.50% interest-only, with 30-year fixed and 5/7/10-year ARM options, for a single property or a whole portfolio. Market 30-year DSCR rates generally sit in the 6% to 8% range, and the lowest pricing goes to strong credit, lower leverage, and a DSCR above 1.20.",
    },
    {
      q: "How much can I borrow, and what is the maximum LTV?",
      a: "We finance up to <strong>80% loan-to-value</strong> on a purchase, with rate-and-term and cash-out refinances available, on loan amounts from $75K to $3M. Cash-out leverage is typically a little lower than purchase. The property's cash flow and your credit set your final leverage.",
    },
    {
      q: "What credit score do I need for a DSCR loan?",
      a: "Most DSCR lenders look for a minimum around 660 to 680, and the best pricing goes to borrowers with strong credit. Because the loan qualifies on the asset, your score affects your rate and leverage more than whether you are approved.",
    },
    {
      q: "Can I get a DSCR loan on a short-term rental (Airbnb)?",
      a: "Yes, short-term rentals are considered. We can underwrite using market or projected rents, and the property still needs to meet our DSCR. Tell us how the property is operated so we can structure it correctly.",
    },
    {
      q: "Is there a prepayment penalty?",
      a: "Long-term rental loans usually carry a prepayment penalty, commonly a step-down such as 5/4/3/2/1. We offer flexible prepay structures, including buying down to a shorter penalty for a slightly higher rate, and we will lay out the options on your term sheet.",
    },
  ],
  construction: [
    {
      q: "How much of my construction project will you finance?",
      a: "We fund new construction <strong>up to 80% of value and up to 85% of total cost</strong> (land plus build), nationwide, on loans up to $5M. Experienced builders reach the higher end of leverage. We finance both the lot and the vertical construction within those caps.",
    },
    {
      q: "Will you finance the land or lot purchase?",
      a: "Yes. Lot acquisition is funded as part of your loan-to-cost. If you already own the lot, that equity can serve as your down payment, which often lets us fund most or all of the build cost.",
    },
    {
      q: "How does the draw schedule work?",
      a: "Construction funds are released in draws as milestones are completed and verified, not handed over at closing. You submit your budget and scope of work up front, complete a phase, request a draw, and we release that portion after inspection. You pay interest on funds as they are drawn.",
    },
    {
      q: "What are the rates and terms on a ground-up loan?",
      a: "Our construction pricing starts around 10%, interest-only, on terms of 12 to 24 months. Market ground-up rates generally run 9% to 12% with 1 to 3 points. Your pricing and leverage depend on your build experience and the strength of the project.",
    },
    {
      q: "Do you lend to first-time builders?",
      a: "We consider builders at all levels, though a track record helps your leverage and rate. A first-time builder should expect to bring a strong general contractor, a detailed budget, and typically a larger equity contribution. A well-documented project goes a long way.",
    },
    {
      q: "What do you need to quote a construction loan?",
      a: "The lot cost or current value, your construction budget and scope of work, the projected after-built value, and your build experience. With those we can size the loan against both cost and completed value and send you terms.",
    },
  ],
  "cre-bridge": [
    {
      q: "What can a commercial bridge loan be used for?",
      a: "Bridge capital is for repositioning or stabilizing a commercial property before permanent financing: value-add, lease-up, a partner buyout, or pulling equity out through a cash-out. We lend across property types on terms <strong>up to 24 to 36 months, with loans up to $10M</strong>.",
    },
    {
      q: "What rates, leverage, and terms should I expect?",
      a: "Our commercial bridge pricing starts around 8%, interest-only, up to roughly 75% loan-to-value, on terms up to 24 to 36 months. Published bridge pricing generally runs 8% to 12% with 1 to 3 points. Final terms depend on the asset, the business plan, and sponsor strength.",
    },
    {
      q: "How fast can a commercial bridge loan close?",
      a: "Commercial deals usually close in 2 to 4 weeks. They take a little longer than residential because of the appraisal, the rent roll and operating-statement review, and any third-party reports. We move as fast as the diligence allows and keep one point of contact on your file.",
    },
    {
      q: "Do I need positive cash flow (DSCR) to qualify?",
      a: "Not necessarily at closing. Bridge loans are often underwritten interest-only to the as-stabilized business plan rather than a minimum in-place DSCR, since the property is being repositioned. We do want to see a credible path to stabilization and enough in-place income or reserves to carry the loan.",
    },
    {
      q: "What documents do you need for a commercial bridge request?",
      a: "Typically the purchase contract or current debt, a rent roll and trailing-12-month operating statement, your business plan and renovation budget, and sponsor financials. Larger assets may also need a property condition report and an environmental review. We will give you a clear checklist up front.",
    },
    {
      q: "Is the loan recourse, and is cash-out available?",
      a: "Most bridge loans are recourse with a personal guarantee, while lower-leverage non-recourse can be possible on stronger assets. Cash-out is available when there is equity to support it. We structure recourse and leverage around the specific deal.",
    },
  ],
  transactional: [
    {
      q: "What is transactional funding, and when do I use it?",
      a: "Transactional funding is short-term capital that funds the <strong>A-to-B leg of a back-to-back (double) closing</strong>, so you can resell to your end buyer (B-to-C) the same day. It is built for wholesalers and assignment deals where you need to take title briefly without using your own cash.",
    },
    {
      q: "How much does transactional funding cost?",
      a: "It is priced as a flat fee rather than an interest rate, since the money is only out for a day or two. Market pricing generally runs about 1% to 3% of the amount funded, with a dollar minimum on small deals. You also cover the normal double-close costs such as title, escrow, and recording.",
    },
    {
      q: "How much of the purchase will you fund?",
      a: "We can fund up to <strong>100% of your purchase price</strong> on the A-to-B closing, so you bring no money to the table. The loan is repaid directly from the proceeds of your simultaneous B-to-C sale.",
    },
    {
      q: "Do you check credit or require an appraisal?",
      a: "No. Transactional funding requires no credit check and no appraisal. Approval rests on a verified, ready-to-close end buyer rather than your personal finances, which is why it can fund same-day.",
    },
    {
      q: "What do you need to fund the deal?",
      a: "Your executed A-to-B and B-to-C contracts, proof of the end buyer's funds or financing, and a title or escrow company that allows back-to-back closings. With those in hand we can fund the same day.",
    },
    {
      q: "How long is the loan?",
      a: "Very short, usually a matter of days. It is designed to be repaid out of the same-day or next-day resale, not held.",
    },
  ],
  "bank-statement": [
    {
      q: "What is a bank statement loan, and how is it different from a no-doc loan?",
      a: "A <strong>bank statement loan</strong> qualifies you on 12 to 24 months of business or personal bank deposits instead of tax returns, which suits self-employed borrowers whose returns understate their real income. A <strong>no-doc</strong> (or no-ratio) loan goes further and leans on the property and your reserves rather than any income calculation. Both are business-purpose loans for investment property, not consumer mortgages.",
    },
    {
      q: "Do I really not need tax returns or W-2s?",
      a: "Correct. We do not ask for tax returns, W-2s, or pay stubs on these programs. We verify the deal, your credit, and either your bank-statement cash flow or your reserves, depending on the structure. It is built so write-offs and a complex return do not work against a strong borrower.",
    },
    {
      q: "Who is a bank statement or no-doc loan best for?",
      a: "Self-employed investors, business owners, 1099 and commission earners, and anyone whose write-offs shrink their taxable income. If your bank deposits tell a stronger story than your tax return, this is usually the right fit.",
    },
    {
      q: "What credit score and down payment do I need?",
      a: "Most no-doc and bank-statement programs look for a credit score around 660 or higher, with the best terms above 700, and a larger down payment than a fully documented loan, often 20% to 30%. Stronger credit and more equity improve both your rate and your leverage.",
    },
    {
      q: "What rates and terms can I expect?",
      a: "Pricing is higher than a fully documented conventional loan because the lender takes on more uncertainty, and it varies with your credit, leverage, and the structure. We offer both short-term and long-term options, so we match the term to whether you are flipping, bridging, or holding.",
    },
    {
      q: "Can I close in an LLC?",
      a: "Yes. These are business-purpose loans and routinely close in an LLC or other entity. Holding investment property in an entity is standard and often preferred.",
    },
  ],
  "conventional-investment": [
    {
      q: "What is a conventional investment property loan?",
      a: "It is standard, competitively priced financing for a <strong>non-owner-occupied investment property</strong>, the long-term loan you take when your file fits the conventional box. It usually carries a lower rate than a bridge or DSCR loan, in exchange for full documentation.",
    },
    {
      q: "How is it different from a DSCR loan?",
      a: "A conventional loan qualifies on your documented personal income and credit, while a DSCR loan qualifies on the property's rent. Conventional pricing is often lower if you can document your income and you are within the limit on financed properties; DSCR is easier to scale and skips the income docs. We compare both and put you in the one that fits.",
    },
    {
      q: "How much do I need to put down?",
      a: "Plan on roughly 20% to 25% down on an investment-property purchase, with the best pricing at lower leverage and higher credit. Cash-out refinances are typically capped a bit lower than purchases.",
    },
    {
      q: "What credit score do I need?",
      a: "Conventional investment financing generally wants a credit score around 680 or higher, and your rate improves meaningfully as your score and reserves go up. We will tell you up front where your file lands.",
    },
    {
      q: "What can I use it for?",
      a: "Purchases, rate-and-term refinances, and cash-out refinances on non-owner-occupied 1-4 unit investment property. If you will live in the property, that is owner-occupied financing, which we refer to a trusted partner rather than originate here.",
    },
    {
      q: "What documents are required?",
      a: "Because it is fully documented, expect to provide income verification, tax returns, bank statements, and the standard conventional paperwork. If that documentation is a hurdle, our DSCR and bank-statement programs are the no-tax-return alternatives.",
    },
  ],
  portfolio: [
    {
      q: "What is a portfolio (blanket) loan?",
      a: "A portfolio or blanket loan rolls several rental properties into one loan with a <strong>single monthly payment</strong>, instead of a separate mortgage on each property. It simplifies your financing, frees up capital, and lets you scale a rental portfolio without managing a stack of individual loans.",
    },
    {
      q: "How many properties do I need?",
      a: "These structures usually make sense at around five or more properties, though we can look at smaller groups. The portfolio can be a mix of single-family rentals, small multifamily, and other income property.",
    },
    {
      q: "Can I sell or release individual properties?",
      a: "Yes. Most blanket loans include a release provision, so you can sell an individual property and pay down the loan by that property's allocated amount while the rest stays in place. We set the release terms up front.",
    },
    {
      q: "How do you size and price a portfolio loan?",
      a: "We underwrite the combined cash flow and overall leverage of the portfolio, similar to a DSCR loan but across the whole group. Pricing depends on the asset mix, the leverage, and your experience, and loan amounts typically start in the high six figures.",
    },
    {
      q: "Do I need to document my personal income?",
      a: "Usually not. Like our DSCR program, a blanket rental loan qualifies on the portfolio's cash flow rather than your personal income, so tax returns are generally not required. We will want to see the rent roll and operating history.",
    },
    {
      q: "Can I cash out equity across the portfolio?",
      a: "Yes. A common use of a blanket loan is to consolidate existing mortgages and pull cash out of the combined equity, giving you capital to acquire more property. Cash-out leverage is set against the portfolio's value and cash flow.",
    },
  ],
  "cre-permanent": [
    {
      q: "What is permanent commercial financing?",
      a: "Permanent (or perm) financing is <strong>long-term debt on a stabilized commercial property</strong>, the loan you move into once a building is leased up and performing. It replaces short-term bridge or construction debt with a longer fixed term and a lower rate.",
    },
    {
      q: "What channels do you place loans through?",
      a: "We place permanent debt through agency multifamily programs (Fannie Mae and Freddie Mac), insurance companies, and other wholesale lenders. Because we shop multiple sources, we can match your asset to the program with the best long-term terms.",
    },
    {
      q: "What properties qualify?",
      a: "Stabilized multifamily of five units and up, plus mixed-use and other commercial assets with a solid operating history. Agency multifamily in particular looks for occupancy and cash flow that support long-term debt.",
    },
    {
      q: "How is this different from your CRE bridge program?",
      a: "The bridge program is short-term capital to acquire or reposition a property; permanent financing is the long-term exit once it is stabilized. Many investors use both in sequence, bridging to stabilize and then refinancing into permanent debt. We can line up both.",
    },
    {
      q: "What rates and terms can I expect?",
      a: "Permanent commercial rates run well below bridge pricing and move with the agency and wholesale market, on long fixed terms. The exact rate depends on the asset, the program, and current conditions, and we will walk you through the options.",
    },
    {
      q: "How long does a permanent placement take?",
      a: "Plan on several weeks, since agency and wholesale permanent loans require full underwriting, third-party reports, and lender approval. We manage the placement and keep one point of contact on your file from quote to close.",
    },
  ],
  sba: [
    {
      q: "What is the difference between an SBA 7(a) and a 504 loan?",
      a: "The <strong>7(a)</strong> is the flexible, all-purpose SBA loan: owner-occupied real estate, business acquisition, partner buyouts, equipment, and working capital under one note. The <strong>504</strong> is purpose-built for owner-occupied commercial real estate and heavy equipment, with a long-term fixed rate and a low down payment. We place both and match your scenario to the right one.",
    },
    {
      q: "How much can I borrow, and how much do I put down?",
      a: "SBA loans go up to $5M, with larger total project sizes possible on the 504 since a bank funds part of the deal. Down payments are low, often around 10%, rising to 15% to 20% for startups or special-purpose properties. On the right deal we finance up to 90%.",
    },
    {
      q: "What are the terms and rates?",
      a: "Terms run up to 25 years for real estate, which keeps payments low. 7(a) rates are usually variable and tied to the Prime rate, while the 504 carries a long-term fixed rate on the CDC portion. Because we place your file across 20+ SBA lenders, we shop your scenario for the strongest terms.",
    },
    {
      q: "Do I have to occupy the property?",
      a: "Yes. SBA real estate loans require owner-occupancy, at least 51% of an existing building or 60% of new construction. That requirement is what separates SBA-eligible deals from pure investment property, which fits our other programs.",
    },
    {
      q: "How long does an SBA loan take to close?",
      a: "SBA loans are slower than our bridge products, typically 30 to 90 days, because of the documentation and approval process. The tradeoff is a much lower long-term cost. If you need speed now, we can bridge the deal and refinance into SBA later.",
    },
    {
      q: "What do you need to get started?",
      a: "Generally two to three years of business and personal tax returns, business financials, a personal financial statement, and details on the property or business. We will tell you exactly what is needed and place your file with the best-fit lender in our network.",
    },
  ],
};
