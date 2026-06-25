// FAQ content for the dedicated /faq page and the per-program FAQ sections.
// Written in USAM's voice and kept consistent with the program term cards in
// programs.js. Answers are grounded in 2025-2026 competitor/market research
// (Kiavi, Lima One, RCN, Easy Street, Visio, CoreVest, Roc, Anchor, SBA norms)
// and phrased as real borrower questions for answer-engine optimization (AEO).
// `a` may contain light inline HTML (links, <strong>). No user input here.
// Convention (DESIGN.md §12): bold 3 to 5 key terms or summarizing phrases in
// every answer so a reader scanning lands on the crux, the figures, and the
// decision points. Bold phrases, not whole sentences or paragraphs.

// Cross-program questions any private-lending borrower asks.
export const generalFaqs = [
  {
    q: "How is private (hard money) lending different from a bank loan?",
    a: "We are <strong>asset-based</strong>, which means we underwrite <strong>the property, its equity, and your business plan</strong> rather than your personal income and tax returns. Because we <strong>lend our own capital and decide in house</strong>, we <strong>fund in days instead of the 30 to 60+ days a bank takes</strong>, on short interest-only terms built around a flip, refinance, or sale. You pay a higher rate than a bank in exchange for <strong>speed, flexibility, and certainty</strong> on deals a bank cannot fund in time.",
  },
  {
    q: "Do you lend to individuals, or do I need an LLC?",
    a: "Most of our loans are made to a <strong>business entity such as an LLC</strong>, corporation, or partnership rather than to you personally, which keeps them <strong>business-purpose</strong>. Holding the property in a <strong>single-purpose LLC is standard practice</strong>, and it is <strong>quick and inexpensive to set up</strong>. We can point you in the right direction before closing if you do not have an entity yet.",
  },
  {
    q: "Are these consumer mortgages? Can I use one for my own home?",
    a: "No. Every program we offer is a <strong>business-purpose loan</strong> for investment or commercial real estate, <strong>not a consumer mortgage</strong>. You <strong>cannot use these loans to buy or refinance the home you live in</strong>. The deciding factor is the <strong>purpose of the loan</strong>, financing non-owner-occupied or income property, not the property type alone.",
  },
  {
    q: "What states do you lend in?",
    a: "We are a <strong>direct private lender</strong> working <strong>nationwide, across all 50 states</strong>. A few programs carry <strong>state-specific nuances</strong>, so we will <strong>confirm availability for your exact scenario</strong> the first time we talk.",
  },
  {
    q: "How fast can you close?",
    a: "Bridge and fix and flip loans typically close in <strong>5 to 7 business days</strong> once we have your basics. Rental (DSCR) loans usually take <strong>2 to 3 weeks</strong> because of the appraisal and rent verification, and SBA financing runs <strong>30 to 90 days</strong>. The biggest variable is how quickly <strong>title, insurance, and your documents</strong> come together.",
  },
  {
    q: "Do you check credit, and is there a minimum score?",
    a: "We do run credit, but on our asset-based loans it <strong>carries far less weight than at a bank</strong>, and weaker credit can often be offset with a <strong>larger down payment or lower leverage</strong>. There is <strong>no personal income test</strong> on these programs. Credit matters most on <strong>long-term rental loans</strong>, where we look for a <strong>640 minimum</strong> and it affects your rate and leverage.",
  },
  {
    q: "Do I need to provide income documents or tax returns?",
    a: "<strong>Generally no.</strong> Our bridge, fix and flip, and construction loans <strong>qualify off the property and your equity</strong>, and our DSCR rental loans <strong>qualify off the property's rent</strong>, so we <strong>do not ask for W-2s or pay stubs</strong>. We will want to see bank statements or proof of reserves. <strong>SBA financing is the one exception</strong> and is fully documented.",
  },
  {
    q: "What do you need to give me a quote?",
    a: "Just <strong>the basics of the deal</strong>: the <strong>property address or type, the purchase price or current value, your rehab budget, the loan amount, and your exit plan</strong>. We can often <strong>pre-qualify you over the phone</strong> or through a short application and issue a <strong>proof-of-funds letter before you are even under contract</strong>.",
  },
  {
    q: "What is a point, and how do your rates compare to a bank?",
    a: "A point is an <strong>upfront fee equal to 1% of the loan amount</strong>, and origination on private loans typically runs <strong>1 to 3 points</strong>. Our rates are <strong>higher than a bank</strong>, generally in the <strong>high single digits to low teens</strong> depending on the program, because the loans are short, fast, and flexible. When you compare offers, weigh the rate and the points together as your <strong>true cost of capital</strong>.",
  },
  {
    q: "What happens if my project runs over schedule?",
    a: "<strong>Tell us early.</strong> Our terms are <strong>built with a cushion</strong>, often <strong>12 to 18 months</strong> on a bridge loan, and when a project needs more time we can <strong>usually arrange an extension</strong>. We would rather keep you moving toward a <strong>successful exit</strong> than be surprised at the maturity date.",
  },
];

// Per-program questions, keyed by program slug.
export const programFaqs = {
  "fix-flip": [
    {
      q: "How much of my fix and flip deal will USAM finance?",
      a: "We fund up to <strong>90% of the purchase price and up to 100% of your rehab budget</strong>, with the total capped against the <strong>after-repair value (ARV)</strong>. Rehab money is <strong>released in draws</strong> as the work is completed. When the ARV supports an interest reserve, we can structure the loan with <strong>no monthly payments</strong> for its duration, so your cash stays in the project.",
    },
    {
      q: "What interest rate and points should I expect on a flip loan?",
      a: "Our fix and flip pricing <strong>starts around 7.99%, interest-only</strong>, with origination typically <strong>1 to 3 points</strong> depending on your experience, leverage, and the deal. Across the market most flip loans run roughly <strong>9% to 12%</strong>. You pay <strong>interest on rehab funds only after you draw them</strong>, not on the full budget up front.",
    },
    {
      q: "Do I need flipping experience to qualify?",
      a: "<strong>No. We work with first-time flippers</strong> as well as <strong>full-time operators</strong>. Experience mainly affects your leverage and rate, since a longer track record earns <strong>higher loan-to-cost and better pricing</strong>. A newer investor can still get funded with a <strong>sound deal, a realistic budget, and a clear exit</strong>.",
    },
    {
      q: "How fast can a fix and flip loan close?",
      a: "We can get you a term sheet the <strong>same day</strong> on a complete application, and we <strong>fund within 48 hours of clear title</strong>. The main variable is how fast title and insurance come together, which is why a full close usually runs <strong>5 to 7 business days</strong>. Because we are the lender and underwrite in house, there is <strong>no second layer of approval</strong> to wait on.",
    },
    {
      q: "Is there a prepayment penalty if I sell quickly?",
      a: "No. Our fix and flip loans have <strong>no prepayment penalty</strong>, so paying off early when the property sells <strong>costs you nothing extra</strong>. Terms run <strong>12 to 18 months</strong>, which leaves <strong>room if a renovation or sale takes longer</strong> than planned.",
    },
    {
      q: "Do you check credit or require income documents?",
      a: "We run credit, but this is an <strong>asset-based loan</strong>, so <strong>the property, your budget, and the ARV</strong> matter most. We <strong>do not ask for W-2s or tax returns</strong> to qualify a flip. We will want to confirm you have <strong>reserves to carry the project</strong> to its exit.",
    },
  ],
  "rental-dscr": [
    {
      q: "What is a DSCR loan, and how do I qualify without tax returns?",
      a: "A DSCR (debt service coverage ratio) loan qualifies on the <strong>property's rental income instead of your personal income</strong>, so there are <strong>no W-2s or tax returns required</strong>. We compare the rent, from a <strong>signed lease or the appraiser's market-rent estimate</strong>, against the monthly payment. A DSCR of 1.00 means the rent covers the payment, and we lend with a <strong>DSCR as low as 0.75</strong>.",
    },
    {
      q: "What rate and terms can I get on a rental loan?",
      a: "Our rental program <strong>starts around 5.50% interest-only</strong>, with <strong>30-year fixed and 5/7/10-year ARM options</strong>, for a single property or a whole portfolio. Market 30-year DSCR rates generally sit in the <strong>6% to 8% range</strong>, and the lowest pricing goes to strong credit, lower leverage, and a <strong>DSCR above 1.20</strong>.",
    },
    {
      q: "How much can I borrow, and what is the maximum LTV?",
      a: "We finance up to <strong>80% loan-to-value</strong> on a purchase, with <strong>rate-and-term and cash-out refinances</strong> available, on loan amounts from <strong>$100K to $3M</strong>. <strong>Cash-out leverage is typically a little lower</strong> than purchase. The property's cash flow and your credit set your final leverage.",
    },
    {
      q: "What credit score do I need for a DSCR loan?",
      a: "We start at <strong>640</strong>, and the <strong>best pricing goes to strong credit</strong>. Because the loan <strong>qualifies on the asset</strong>, your score affects your <strong>rate and leverage</strong> more than whether you are approved.",
    },
    {
      q: "Can I get a DSCR loan on a short-term rental (Airbnb)?",
      a: "<strong>Yes, short-term rentals are considered.</strong> We can underwrite using <strong>market or projected rents</strong>, and the property still needs to <strong>meet our DSCR</strong>. Tell us <strong>how the property is operated</strong> so we can structure it correctly.",
    },
    {
      q: "Is there a prepayment penalty?",
      a: "Long-term rental loans usually carry a prepayment penalty, commonly a <strong>step-down such as 5/4/3/2/1</strong>. We offer <strong>flexible prepay structures</strong>, including <strong>buying down to a shorter penalty</strong> for a slightly higher rate, and we will <strong>lay out the options on your term sheet</strong>.",
    },
  ],
  construction: [
    {
      q: "How much of my construction project will you finance?",
      a: "We fund new construction <strong>up to 70% of value and up to 85% of total cost</strong> (<strong>land plus build</strong>), nationwide, on <strong>loans up to $5M</strong>. Experienced builders reach the higher end of leverage. We finance <strong>both the lot and the vertical construction</strong> within those caps.",
    },
    {
      q: "Will you finance the land or lot purchase?",
      a: "<strong>Yes. Lot acquisition is funded as part of your loan-to-cost.</strong> If you <strong>already own the lot</strong>, that equity can <strong>serve as your down payment</strong>, which often lets us fund <strong>most or all of the build cost</strong>.",
    },
    {
      q: "How does the draw schedule work?",
      a: "Construction funds are <strong>released in draws as milestones are completed</strong> and verified, <strong>not handed over at closing</strong>. You submit your <strong>budget and scope of work up front</strong>, complete a phase, request a draw, and we release that portion after inspection. You pay <strong>interest on funds as they are drawn</strong>.",
    },
    {
      q: "What are the rates and terms on a ground-up loan?",
      a: "Our construction pricing <strong>starts around 10%, interest-only</strong>, on <strong>terms of 12 to 24 months</strong>. Market ground-up rates generally run <strong>9% to 12% with 1 to 3 points</strong>. Your pricing and leverage depend on your <strong>build experience and the strength of the project</strong>.",
    },
    {
      q: "Do you lend to first-time builders?",
      a: "<strong>We consider builders at all levels</strong>, though a <strong>track record helps your leverage and rate</strong>. A first-time builder should expect to bring a <strong>strong general contractor, a detailed budget</strong>, and typically a <strong>larger equity contribution</strong>. A well-documented project goes a long way.",
    },
    {
      q: "What do you need to quote a construction loan?",
      a: "The <strong>lot cost or current value</strong>, your <strong>construction budget and scope of work</strong>, the <strong>projected after-built value</strong>, and your <strong>build experience</strong>. With those we can <strong>size the loan against both cost and completed value</strong> and send you terms.",
    },
  ],
  "cre-bridge": [
    {
      q: "What can a commercial bridge loan be used for?",
      a: "Bridge capital is for <strong>repositioning or stabilizing a commercial property</strong> before permanent financing: <strong>value-add, lease-up, a partner buyout</strong>, or pulling equity out through a <strong>cash-out</strong>. We lend across property types on terms <strong>up to 24 to 36 months, with loans up to $10M</strong>.",
    },
    {
      q: "What rates, leverage, and terms should I expect?",
      a: "Our commercial bridge pricing <strong>starts around 9%, interest-only, up to roughly 75% loan-to-value</strong>, on <strong>terms up to 24 to 36 months</strong>. Published bridge pricing generally runs <strong>8% to 12% with 1 to 3 points</strong>. Final terms depend on the <strong>asset, the business plan, and sponsor strength</strong>.",
    },
    {
      q: "How fast can a commercial bridge loan close?",
      a: "Commercial deals usually <strong>close in 2 to 4 weeks</strong>. They take a little longer than residential because of the <strong>appraisal, the rent roll and operating-statement review</strong>, and any <strong>third-party reports</strong>. We move as fast as the diligence allows and keep <strong>one point of contact</strong> on your file.",
    },
    {
      q: "Do I need positive cash flow (DSCR) to qualify?",
      a: "<strong>Not necessarily at closing.</strong> Bridge loans are often <strong>underwritten interest-only to the as-stabilized business plan</strong> rather than a minimum in-place DSCR, since the property is being repositioned. We do want to see a <strong>credible path to stabilization</strong> and enough <strong>in-place income or reserves</strong> to carry the loan.",
    },
    {
      q: "What documents do you need for a commercial bridge request?",
      a: "Typically the <strong>purchase contract or current debt</strong>, a <strong>rent roll and trailing-12-month operating statement</strong>, your <strong>business plan and renovation budget</strong>, and <strong>sponsor financials</strong>. Larger assets may also need a <strong>property condition report and an environmental review</strong>. We will give you a clear checklist up front.",
    },
    {
      q: "Is the loan recourse, and is cash-out available?",
      a: "Most bridge loans are <strong>recourse with a personal guarantee</strong>, while <strong>lower-leverage non-recourse</strong> can be possible on stronger assets. <strong>Cash-out is available</strong> when there is equity to support it. We <strong>structure recourse and leverage around the specific deal</strong>.",
    },
  ],
  transactional: [
    {
      q: "What is transactional funding, and when do I use it?",
      a: "Transactional funding is short-term capital that funds the <strong>A-to-B leg of a back-to-back (double) closing</strong>, so you can <strong>resell to your end buyer (B-to-C) the same day</strong>. It is built for <strong>wholesalers and assignment deals</strong> where you need to take title briefly <strong>without using your own cash</strong>.",
    },
    {
      q: "How much does transactional funding cost?",
      a: "It is priced as a <strong>flat fee rather than an interest rate</strong>, since the money is only out for a day or two. Market pricing generally runs <strong>about 1% to 3% of the amount funded</strong>, with a <strong>dollar minimum on small deals</strong>. You also cover the normal double-close costs such as <strong>title, escrow, and recording</strong>.",
    },
    {
      q: "How much of the purchase will you fund?",
      a: "We can fund up to <strong>100% of your purchase price</strong> on the A-to-B closing, so you <strong>bring no money to the table</strong>. The loan is <strong>repaid directly from the proceeds</strong> of your <strong>simultaneous B-to-C sale</strong>.",
    },
    {
      q: "Do you check credit or require an appraisal?",
      a: "No. Transactional funding requires <strong>no credit check and no appraisal</strong>. Approval rests on a <strong>verified, ready-to-close end buyer</strong> rather than your personal finances, which is why it can <strong>fund same-day</strong>.",
    },
    {
      q: "What do you need to fund the deal?",
      a: "Your <strong>executed A-to-B and B-to-C contracts</strong>, <strong>proof of the end buyer's funds</strong>, and a <strong>title or escrow company that allows back-to-back closings</strong>. With those in hand we can <strong>fund the same day</strong>.",
    },
    {
      q: "How long is the loan?",
      a: "Very short, <strong>usually a matter of days</strong>. It is designed to be <strong>repaid out of the same-day or next-day resale</strong>, <strong>not held</strong> like a normal loan.",
    },
  ],
  "bank-statement": [
    {
      q: "What is a bank statement loan, and how is it different from a no-doc loan?",
      a: "A <strong>bank statement loan</strong> qualifies you on <strong>12 to 24 months of business or personal bank deposits</strong> instead of tax returns, which suits self-employed borrowers whose returns understate their real income. A <strong>no-doc</strong> (or no-ratio) loan goes further and leans on the <strong>property and your reserves</strong> rather than any income calculation. Both are <strong>business-purpose loans for investment property</strong>, not consumer mortgages.",
    },
    {
      q: "Do I really not need tax returns or W-2s?",
      a: "<strong>Correct.</strong> We <strong>do not ask for tax returns, W-2s, or pay stubs</strong> on these programs. We verify the deal, your credit, and either your <strong>bank-statement cash flow or your reserves</strong>, depending on the structure. It is built so <strong>write-offs and a complex return do not work against a strong borrower</strong>.",
    },
    {
      q: "Who is a bank statement or no-doc loan best for?",
      a: "<strong>Self-employed investors, business owners, and 1099 or commission earners</strong> whose <strong>write-offs shrink their taxable income</strong>. If your <strong>bank deposits tell a stronger story than your tax return</strong>, this is usually the <strong>right fit</strong>.",
    },
    {
      q: "What credit score and down payment do I need?",
      a: "Most no-doc and bank-statement programs look for a <strong>credit score around 660 or higher</strong>, with the <strong>best terms above 700</strong>, and a <strong>larger down payment, often 20% to 30%</strong>. Stronger credit and more equity <strong>improve both your rate and your leverage</strong>.",
    },
    {
      q: "What rates and terms can I expect?",
      a: "Pricing is <strong>higher than a fully documented conventional loan</strong> because the lender takes on <strong>more uncertainty</strong>, and it varies with your credit, leverage, and the structure. We offer both <strong>short-term and long-term options</strong>, so we match the term to whether you are <strong>flipping, bridging, or holding</strong>.",
    },
    {
      q: "Can I close in an LLC?",
      a: "<strong>Yes. These are business-purpose loans</strong> and <strong>routinely close in an LLC</strong> or other entity. Holding investment property in an entity is <strong>standard and often preferred</strong>.",
    },
  ],
  "conventional-investment": [
    {
      q: "What is a conventional investment property loan?",
      a: "It is standard, competitively priced financing for a <strong>non-owner-occupied investment property</strong>, the <strong>long-term loan</strong> you take when your file fits the conventional box. It usually carries a <strong>lower rate than a bridge or DSCR loan</strong>, in exchange for <strong>full documentation</strong>.",
    },
    {
      q: "How is it different from a DSCR loan?",
      a: "A conventional loan <strong>qualifies on your documented personal income and credit</strong>, while a DSCR loan <strong>qualifies on the property's rent</strong>. Conventional pricing is <strong>often lower if you can document your income</strong> and you are within the limit on financed properties; DSCR is <strong>easier to scale and skips the income docs</strong>. We compare both and put you in the one that fits.",
    },
    {
      q: "How much do I need to put down?",
      a: "Plan on roughly <strong>20% to 25% down</strong> on an investment-property purchase, with the <strong>best pricing at lower leverage and higher credit</strong>. <strong>Cash-out refinances are typically capped a bit lower</strong> than purchases.",
    },
    {
      q: "What credit score do I need?",
      a: "Conventional investment financing generally wants a <strong>credit score around 580 or higher</strong>, and your <strong>rate improves meaningfully</strong> as your <strong>score and reserves go up</strong>. We will tell you up front <strong>where your file lands</strong>.",
    },
    {
      q: "What can I use it for?",
      a: "<strong>Purchases, rate-and-term refinances, and cash-out refinances</strong> on <strong>non-owner-occupied 1-4 unit investment property</strong>. If you will live in the property, that is <strong>owner-occupied financing</strong>, which we <strong>refer to a trusted partner</strong> rather than originate here.",
    },
    {
      q: "What documents are required?",
      a: "Because it is <strong>fully documented</strong>, expect to provide <strong>income verification, tax returns, bank statements</strong>, and the standard conventional paperwork. If that documentation is a hurdle, our <strong>DSCR and bank-statement programs</strong> are the <strong>no-tax-return alternatives</strong>.",
    },
  ],
  portfolio: [
    {
      q: "What is a portfolio (blanket) loan?",
      a: "A portfolio or blanket loan <strong>rolls several rental properties into one loan</strong> with a <strong>single monthly payment</strong>, instead of a separate mortgage on each property. It <strong>simplifies your financing, frees up capital</strong>, and lets you <strong>scale a rental portfolio</strong> without managing a stack of individual loans.",
    },
    {
      q: "How many properties do I need?",
      a: "These structures usually make sense at <strong>around five or more properties</strong>, though we can <strong>look at smaller groups</strong>. The portfolio can be a <strong>mix of single-family rentals, small multifamily</strong>, and <strong>other income property</strong>.",
    },
    {
      q: "Can I sell or release individual properties?",
      a: "<strong>Yes. Most blanket loans include a release provision</strong>, so you can <strong>sell an individual property</strong> and pay down the loan by that <strong>property's allocated amount</strong> while the rest stays in place. We <strong>set the release terms up front</strong>.",
    },
    {
      q: "How do you size and price a portfolio loan?",
      a: "We underwrite the <strong>combined cash flow and overall leverage of the portfolio</strong>, similar to a DSCR loan but <strong>across the whole group</strong>. Pricing depends on the <strong>asset mix, the leverage, and your experience</strong>, and loan amounts typically <strong>start in the high six figures</strong>.",
    },
    {
      q: "Do I need to document my personal income?",
      a: "<strong>Usually not.</strong> Like our DSCR program, a blanket rental loan <strong>qualifies on the portfolio's cash flow</strong> rather than your personal income, so <strong>tax returns are generally not required</strong>. We will want to see the <strong>rent roll and operating history</strong>.",
    },
    {
      q: "Can I cash out equity across the portfolio?",
      a: "<strong>Yes.</strong> A common use of a blanket loan is to <strong>consolidate existing mortgages and pull cash out</strong> of the combined equity, giving you <strong>capital to acquire more property</strong>. Cash-out leverage is <strong>set against the portfolio's value and cash flow</strong>.",
    },
  ],
  "cre-permanent": [
    {
      q: "What is permanent commercial financing?",
      a: "Permanent (or perm) financing is <strong>long-term debt on a stabilized commercial property</strong>, the loan you move into once a building is <strong>leased up and performing</strong>. It <strong>replaces short-term bridge or construction debt</strong> with a <strong>longer fixed term and a lower rate</strong>.",
    },
    {
      q: "What channels do you place loans through?",
      a: "We place permanent debt through <strong>agency multifamily programs (Fannie Mae and Freddie Mac)</strong>, <strong>insurance companies</strong>, and <strong>other wholesale lenders</strong>. Because we <strong>shop multiple sources</strong>, we can match your asset to the program with the <strong>best long-term terms</strong>.",
    },
    {
      q: "What properties qualify?",
      a: "<strong>Stabilized multifamily of five units and up</strong>, plus <strong>mixed-use and other commercial assets</strong> with a solid operating history. Agency multifamily in particular looks for <strong>occupancy and cash flow that support long-term debt</strong>.",
    },
    {
      q: "How is this different from your CRE bridge program?",
      a: "The bridge program is <strong>short-term capital to acquire or reposition</strong> a property; permanent financing is the <strong>long-term exit once it is stabilized</strong>. Many investors use <strong>both in sequence</strong>, <strong>bridging to stabilize and then refinancing into permanent debt</strong>. We can line up both.",
    },
    {
      q: "What rates and terms can I expect?",
      a: "Permanent commercial rates run <strong>well below bridge pricing</strong> and move with the <strong>agency and wholesale market</strong>, on <strong>long fixed terms</strong>. The exact rate depends on the <strong>asset, the program, and current conditions</strong>, and we will walk you through the options.",
    },
    {
      q: "How long does a permanent placement take?",
      a: "Plan on <strong>several weeks</strong>, since agency and wholesale permanent loans require <strong>full underwriting, third-party reports, and lender approval</strong>. We <strong>manage the placement</strong> and keep <strong>one point of contact</strong> on your file from quote to close.",
    },
  ],
  sba: [
    {
      q: "What is the difference between an SBA 7(a) and a 504 loan?",
      a: "The <strong>7(a)</strong> is the flexible, all-purpose SBA loan: <strong>owner-occupied real estate, business acquisition, partner buyouts, equipment, and working capital</strong> under one note. The <strong>504</strong> is purpose-built for <strong>owner-occupied commercial real estate and heavy equipment</strong>, with a <strong>long-term fixed rate and a low down payment</strong>. We place both and match your scenario to the right one.",
    },
    {
      q: "How much can I borrow, and how much do I put down?",
      a: "SBA loans <strong>go up to $5M</strong>, with <strong>larger total project sizes possible on the 504</strong> since a bank funds part of the deal. Down payments are <strong>low, often around 10%</strong>, rising to <strong>15% to 20% for startups or special-purpose properties</strong>. On the right deal we <strong>finance up to 90%</strong>.",
    },
    {
      q: "What are the terms and rates?",
      a: "Terms run <strong>up to 25 years for real estate</strong>, which keeps payments low. <strong>7(a) rates are usually variable and tied to the Prime rate</strong>, while the <strong>504 carries a long-term fixed rate on the CDC portion</strong>. Because we place your file across <strong>20+ SBA lenders</strong>, we shop your scenario for the strongest terms.",
    },
    {
      q: "Do I have to occupy the property?",
      a: "<strong>Yes. SBA real estate loans require owner-occupancy</strong>, at least <strong>51% of an existing building or 60% of new construction</strong>. That requirement is what <strong>separates SBA-eligible deals from pure investment property</strong>, which fits our <strong>other programs</strong>.",
    },
    {
      q: "Do I have to personally guarantee an SBA loan?",
      a: "<strong>Yes.</strong> The SBA requires a <strong>personal guarantee from anyone who owns 20% or more</strong> of the business, and on real-estate deals the loan is also <strong>secured by the property</strong>. This is <strong>standard on every SBA loan</strong>, not a sign of a weak file, and it is part of why SBA financing offers <strong>low down payments and long terms</strong>. We will walk you through exactly what you are signing before you commit.",
    },
    {
      q: "How long does an SBA loan take to close?",
      a: "SBA loans are slower than our bridge products, <strong>typically 30 to 90 days</strong>, because of the <strong>documentation and approval process</strong>. The tradeoff is a <strong>much lower long-term cost</strong>. If you need speed now, we can <strong>bridge the deal and refinance into SBA later</strong>.",
    },
    {
      q: "What do you need to get started?",
      a: "Generally <strong>two to three years of business and personal tax returns</strong>, <strong>business financials</strong>, a <strong>personal financial statement</strong>, and details on the property or business. We will tell you exactly what is needed and <strong>place your file with the best-fit lender in our network</strong>.",
    },
  ],
};
