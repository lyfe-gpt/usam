// Resource/guide articles. Each entry renders a /resources/<slug> page with
// Article + Breadcrumb structured data. Bodies are light HTML (same convention
// as data/faqs.js) rendered into a styled article container.
// `related` lists program slugs to cross-link for internal-linking value.

export const guides = [
  {
    slug: "what-is-a-dscr-loan",
    title: "What Is a DSCR Loan? How Investors Qualify on Rental Income",
    metaTitle: "What Is a DSCR Loan? How It Works | USAM Fund",
    description:
      "A DSCR loan qualifies on a rental property's income instead of your tax returns. Learn how DSCR is calculated, what ratio you need, and when it beats a conventional loan.",
    category: "Rental / DSCR",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["rental-dscr", "conventional-investment", "portfolio"],
    body: `
<p>A <strong>DSCR loan</strong> (debt service coverage ratio loan) is a business-purpose mortgage for investment property that qualifies on the <strong>property's rental income</strong> rather than your personal income. There are no W-2s and no tax returns. For self-employed investors and anyone scaling a portfolio, it is often the difference between a yes and a no.</p>

<h2>How DSCR is calculated</h2>
<p>DSCR compares the property's income to its debt payment:</p>
<ul>
  <li><strong>DSCR = Monthly rent ÷ Monthly payment (PITIA)</strong></li>
  <li>A <strong>DSCR of 1.00</strong> means the rent exactly covers the payment.</li>
  <li>Above 1.00 means positive cash flow; below 1.00 means the property needs a little support.</li>
</ul>
<p>Example: a home that rents for $2,400/month against a $2,000 payment has a DSCR of 1.20. We lend with a <strong>DSCR as low as 1.00</strong>.</p>

<h2>What you need to qualify</h2>
<ul>
  <li>The rent figure, from a signed lease or the appraiser's market-rent estimate</li>
  <li>A down payment (typically 20-25%) or equity for a refinance</li>
  <li>A qualifying credit profile (we lend from roughly a 660 score)</li>
  <li>The property held in an LLC or your name for business purposes</li>
</ul>

<h2>When a DSCR loan is the right tool</h2>
<p>Choose DSCR when your tax returns understate your real income, when you are buying through an LLC, or when you want to add doors without your debt-to-income ratio getting in the way. It pairs naturally with the <strong>BRRRR method</strong> as the long-term refinance leg.</p>

<h2>DSCR vs conventional</h2>
<p>Conventional financing is usually the cheapest money if your file fits the box and you can document income. DSCR trades a slightly higher rate for speed, simplicity, and qualifying on the asset. Many investors use both, deal by deal.</p>
`,
  },
  {
    slug: "fix-and-flip-loan-requirements",
    title: "Fix and Flip Loan Requirements: What You Need to Get Funded",
    metaTitle: "Fix and Flip Loan Requirements | USAM Fund",
    description:
      "What lenders look for on a fix and flip loan: down payment, ARV, rehab budget, experience, and credit. Plus how leverage on purchase and rehab actually works.",
    category: "Fix & Flip",
    readMins: 6,
    datePublished: "2026-06-23",
    related: ["fix-flip", "construction", "transactional"],
    body: `
<p>A <strong>fix and flip loan</strong> is short-term, business-purpose financing that funds both the <strong>purchase</strong> and the <strong>rehab</strong> of a property you intend to renovate and sell. Because it is asset-based, approval hinges less on your paystubs and more on the deal.</p>

<h2>The numbers a lender underwrites</h2>
<ul>
  <li><strong>Purchase leverage</strong> — we fund up to 90% of the purchase price, so you bring roughly 10% plus closing costs.</li>
  <li><strong>Rehab funding</strong> — up to 100% of the renovation budget, reimbursed in draws as work is completed.</li>
  <li><strong>ARV (after-repair value)</strong> — the appraised value once the work is done. Most lenders cap total loan exposure at a percentage of ARV.</li>
  <li><strong>Interest reserve</strong> — when the ARV supports it, payments can be deferred for the life of the loan so your cash stays in the deal.</li>
</ul>

<h2>What you bring to the table</h2>
<ul>
  <li>Down payment and closing costs on the purchase</li>
  <li>A realistic, itemized scope of work and budget</li>
  <li>A credit profile in reasonable shape (asset-based, but it still matters)</li>
  <li>Experience helps with leverage, but first-time flippers can still get funded</li>
</ul>

<h2>How draws work</h2>
<p>You fund the rehab as you go and get reimbursed quickly as milestones are inspected. A dedicated closer stays on your file from term sheet to payoff, and a complete application with title can fund in as few as <strong>5-7 days</strong>.</p>

<h2>Speeding up the close</h2>
<p>Have the purchase contract, scope of work, and entity documents ready, and order title early. The cleaner the file, the faster the money.</p>
`,
  },
  {
    slug: "brrrr-method-financing",
    title: "Financing the BRRRR Method: Buy, Rehab, Rent, Refinance, Repeat",
    metaTitle: "How to Finance the BRRRR Method | USAM Fund",
    description:
      "The BRRRR strategy lets investors recycle capital across deals. Here's how to finance each stage, from the short-term rehab loan to the DSCR refinance that pulls your cash back out.",
    category: "Strategy",
    readMins: 6,
    datePublished: "2026-06-23",
    related: ["fix-flip", "rental-dscr", "portfolio"],
    body: `
<p><strong>BRRRR</strong> stands for <strong>Buy, Rehab, Rent, Refinance, Repeat</strong> — a strategy for building a rental portfolio while recycling the same down payment across multiple deals. The whole model lives or dies on financing, so getting the two loans right is everything.</p>

<h2>Stage 1-2: Buy and Rehab</h2>
<p>Start with a short-term <strong>fix and flip / bridge loan</strong> that funds up to 90% of purchase and up to 100% of rehab. You force appreciation by renovating a property bought below market, the same way a flipper does, but you intend to keep it.</p>

<h2>Stage 3: Rent</h2>
<p>Place a tenant and establish the market rent. That rent figure is what your long-term loan will qualify on, so a signed lease at a strong number directly improves your refinance.</p>

<h2>Stage 4: Refinance</h2>
<p>Replace the short-term loan with a long-term <strong>DSCR loan</strong> based on the new, higher value and the rent. Because DSCR qualifies on the property, you can pull your original capital back out (a cash-out refinance) without your personal debt-to-income ratio limiting you.</p>

<h2>Stage 5: Repeat</h2>
<p>With your capital recovered, you do it again. The constraint becomes deal flow and underwriting capacity, not cash. A <strong>portfolio loan</strong> can later roll several BRRRR properties into one blanket loan with a single payment.</p>

<h2>Why one lender for both legs helps</h2>
<p>Running the bridge and the DSCR refinance through the same lender keeps the timeline tight and avoids surprises at the handoff, the moment most BRRRR deals stall.</p>
`,
  },
  {
    slug: "dscr-vs-conventional-loan",
    title: "DSCR vs Conventional Loan: Which Is Better for Investment Property?",
    metaTitle: "DSCR vs Conventional Loan for Investors | USAM Fund",
    description:
      "DSCR and conventional loans both finance rentals, but they qualify you very differently. Compare documentation, speed, cost, and limits to pick the right one for your deal.",
    category: "Rental / DSCR",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["rental-dscr", "conventional-investment", "bank-statement"],
    body: `
<p>Both a <strong>DSCR loan</strong> and a <strong>conventional investment loan</strong> can finance a rental, but they qualify you in opposite ways. The right choice depends on your tax returns, your timeline, and how many properties you already own.</p>

<h2>How they qualify you</h2>
<ul>
  <li><strong>Conventional</strong> — qualifies on <em>you</em>: tax returns, W-2s, debt-to-income ratio, and how many financed properties you hold.</li>
  <li><strong>DSCR</strong> — qualifies on the <em>property</em>: does the rent cover the payment? No tax returns required.</li>
</ul>

<h2>Cost and terms</h2>
<p>Conventional is usually the <strong>lowest-cost</strong> long-term money when your file fits the box, in exchange for full documentation and tighter limits. DSCR carries a modestly higher rate but trades it for speed, privacy, and no cap on the number of properties.</p>

<h2>When to choose each</h2>
<ul>
  <li><strong>Choose conventional</strong> if you have clean, documentable income, are early in your portfolio, and want the cheapest rate.</li>
  <li><strong>Choose DSCR</strong> if your returns understate your income, you buy through an LLC, you have hit conventional property limits, or you need to close fast.</li>
</ul>

<h2>You don't have to guess</h2>
<p>We underwrite both and will compare them side by side on your actual deal so you take the structure that fits, not just the one a single lender happens to sell.</p>
`,
  },
  {
    slug: "what-is-arv-after-repair-value",
    title: "What Is ARV (After-Repair Value) and How Do You Calculate It?",
    metaTitle: "What Is ARV? How to Calculate After-Repair Value | USAM Fund",
    description:
      "ARV is what a property will be worth after renovation. Learn how to calculate after-repair value from comps, why lenders cap loans at a percentage of ARV, and how it drives your flip.",
    category: "Fix & Flip",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["fix-flip", "construction"],
    body: `
<p><strong>ARV (after-repair value)</strong> is what a property will be worth once the planned renovation is finished. It is the single most important number in a fix and flip, because lenders size the loan against it and it sets your profit on exit.</p>

<h2>How do you calculate ARV?</h2>
<p>ARV is based on comparable sales, not on what you spend. The method:</p>
<ul>
  <li>Pull 3 to 5 recent <strong>sold</strong> comps within about a mile that match the post-rehab condition, size, beds/baths, and style.</li>
  <li>Adjust for differences (an extra bath, a bigger lot, a finished basement).</li>
  <li>Land on a price per square foot the finished house will support, then multiply by your square footage.</li>
</ul>
<p>A licensed appraiser does a formal version of this for the loan, but you should run your own before you offer.</p>

<h2>Why does ARV matter to a lender?</h2>
<p>Most fix and flip lenders cap total loan exposure at a percentage of ARV (often around 70%). That ceiling protects everyone: it keeps the loan well under the resale value so the deal still works if the market softens. If your purchase plus rehab pushes past that cap, you bring more cash or renegotiate.</p>

<h2>The quick formula investors use</h2>
<p>A common screen is the 70% rule: <strong>Max offer ≈ (ARV × 0.70) − rehab budget</strong>. It is a starting filter, not a substitute for real comps and a real budget.</p>
`,
    faqs: [
      { q: "What does ARV stand for?", a: "ARV stands for after-repair value, the estimated market value of a property once the planned renovation is complete." },
      { q: "How is ARV different from the purchase price?", a: "The purchase price is what you pay for the property as-is. ARV is what it will be worth after the rehab, based on comparable sold properties in finished condition." },
      { q: "What is the 70% rule in house flipping?", a: "The 70% rule says an investor should pay at most 70% of a property's ARV minus the rehab budget. It is a quick screening filter, not a precise underwriting tool." },
    ],
  },
  {
    slug: "hard-money-loan-rates-and-costs",
    title: "Hard Money Loan Rates and Costs, Explained",
    metaTitle: "Hard Money Loan Rates and Costs Explained | USAM Fund",
    description:
      "What hard money loans actually cost: interest rates, points/origination, and the trade-off you pay for speed. Plus what moves your rate up or down.",
    category: "Rates & Costs",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["fix-flip", "cre-bridge", "rental-dscr"],
    body: `
<p>A <strong>hard money loan</strong> costs more than a bank loan, and that is the point: you pay a higher rate in exchange for speed, flexibility, and certainty on deals a bank cannot fund in time. Pricing has two parts, the rate and the points.</p>

<h2>What is the interest rate on a hard money loan?</h2>
<p>Rates are short-term and interest-only, typically starting in the high single digits to low teens depending on the program, leverage, and your experience. Because the loan lasts months, not 30 years, the headline rate matters less than the total cost to carry the deal to its exit.</p>

<h2>What are points (origination)?</h2>
<p>A point is 1% of the loan amount, paid at closing. Most hard money loans carry a few points of origination. Add typical closing costs (title, appraisal or valuation, legal) and you have your true cost of capital.</p>

<h2>What moves your rate?</h2>
<ul>
  <li><strong>Leverage</strong> — lower loan-to-value and loan-to-cost earn better pricing.</li>
  <li><strong>Experience</strong> — a track record of completed deals lowers risk and rate.</li>
  <li><strong>Property and exit</strong> — a clean asset with a clear sale or refinance prices better.</li>
  <li><strong>Credit</strong> — it carries less weight than at a bank, but still affects rate on longer-term loans.</li>
</ul>

<h2>How to think about it</h2>
<p>Compare the all-in cost of the loan against the profit the speed unlocks. If a fast close wins a deal a bank would have lost, the higher rate pays for itself.</p>
`,
    faqs: [
      { q: "Why are hard money loans more expensive than bank loans?", a: "You pay more because the lender funds fast, takes on more risk, and lends against the asset and your plan rather than your income. The premium buys speed, flexibility, and certainty." },
      { q: "What is a point on a hard money loan?", a: "A point equals 1% of the loan amount, paid at closing as origination. A 2-point fee on a $300,000 loan is $6,000." },
      { q: "Are hard money rates fixed or variable?", a: "Most short-term hard money loans are fixed, interest-only for the term. Because the loan lasts months, the total carry cost matters more than the headline rate." },
    ],
  },
  {
    slug: "what-is-a-bridge-loan-real-estate",
    title: "What Is a Bridge Loan in Real Estate?",
    metaTitle: "What Is a Bridge Loan in Real Estate? | USAM Fund",
    description:
      "A bridge loan is short-term financing that covers the gap until a sale or permanent loan closes. Learn how bridge loans work, when to use one, and typical terms.",
    category: "Bridge",
    readMins: 4,
    datePublished: "2026-06-23",
    related: ["cre-bridge", "fix-flip", "cre-permanent"],
    body: `
<p>A <strong>bridge loan</strong> is short-term real estate financing that covers the gap between now and a future event, usually a sale, a refinance into permanent debt, or the completion of a project. It buys you time and speed when a longer-term loan is not yet possible.</p>

<h2>How does a bridge loan work?</h2>
<p>You borrow against the property's value (and equity), often interest-only, for a term measured in months to a couple of years. When the exit happens, the sale or the permanent loan, the bridge is paid off. It is built for transition, not for holding.</p>

<h2>When should you use one?</h2>
<ul>
  <li>You need to close fast on an opportunity before permanent financing is ready.</li>
  <li>You want to pull equity (cash-out) to fund the next deal.</li>
  <li>A property is not yet stabilized enough to qualify for a long-term loan.</li>
  <li>You are repositioning or finishing a project before refinancing.</li>
</ul>

<h2>Bridge vs permanent financing</h2>
<p>Bridge debt is fast, flexible, and short, with a higher rate. Permanent financing is cheaper and long-term but slower to close and stricter to qualify for. Many investors use a bridge to win the deal, then refinance into permanent debt once the property supports it.</p>
`,
    faqs: [
      { q: "How long is a bridge loan?", a: "Bridge loans are short-term, commonly 12 to 36 months, and are paid off when the property sells or refinances into permanent financing." },
      { q: "Can you get cash out with a bridge loan?", a: "Yes. A common use of a commercial bridge loan is a cash-out against existing equity to fund another project before permanent financing is in place." },
      { q: "Is a bridge loan the same as a hard money loan?", a: "They overlap. Bridge describes the purpose (covering a gap), while hard money describes the asset-based, fast-funding style. Most bridge loans from a private lender are hard money loans." },
    ],
  },
  {
    slug: "how-ground-up-construction-loans-work",
    title: "How Ground-Up Construction Loans Work",
    metaTitle: "How Ground-Up Construction Loans Work | USAM Fund",
    description:
      "Construction loans fund a new build in stages. Learn how draws work, what LTC means, and what builders need to qualify for ground-up financing.",
    category: "Construction",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["construction", "fix-flip"],
    body: `
<p>A <strong>ground-up construction loan</strong> funds the building of a new property from the dirt up. Unlike a regular mortgage, it releases money in stages as the work gets done, and it is priced and structured around the build timeline.</p>

<h2>How do construction draws work?</h2>
<p>You do not get the full loan at closing. Instead, funds release in <strong>draws</strong> tied to milestones, foundation, framing, roof, mechanicals, finish. As each stage is completed and inspected, the lender reimburses that portion. You carry interest only on the money that has been drawn, which keeps early costs down.</p>

<h2>What is LTC (loan-to-cost)?</h2>
<p>Construction loans are sized on <strong>loan-to-cost</strong>, the percentage of total project cost (land plus hard and soft construction costs) the lender will fund. Experienced builders can access higher LTC. You bring the remainder as equity.</p>

<h2>What do builders need to qualify?</h2>
<ul>
  <li>A detailed budget and draw schedule</li>
  <li>Plans, permits, and a realistic timeline</li>
  <li>A track record of completed builds (helps leverage and rate)</li>
  <li>The land, owned or being acquired with the loan</li>
</ul>

<h2>Exit</h2>
<p>When the build is done, you either sell or refinance into a permanent loan or a DSCR rental loan if you are keeping it. Planning the exit up front keeps the project from stalling at the finish line.</p>
`,
    faqs: [
      { q: "What is a draw on a construction loan?", a: "A draw is a scheduled release of loan funds tied to a completed and inspected stage of construction, such as foundation or framing. You pay interest only on funds drawn so far." },
      { q: "What is the difference between LTV and LTC on a construction loan?", a: "LTC (loan-to-cost) sizes the loan against total project cost during the build. LTV (loan-to-value) measures the loan against the finished or as-is value. Construction loans lead with LTC." },
      { q: "Can first-time builders get a construction loan?", a: "Yes, with a sound budget, permits, and a realistic plan, though experienced builders typically qualify for higher leverage and better pricing." },
    ],
  },
  {
    slug: "what-is-transactional-funding",
    title: "What Is Transactional Funding? (Double Closings for Wholesalers)",
    metaTitle: "What Is Transactional Funding? | USAM Fund",
    description:
      "Transactional funding is same-day capital that funds the A-to-B leg of a double closing so a wholesaler can close the B-to-C sale. Here's how it works and what it costs.",
    category: "Transactional",
    readMins: 4,
    datePublished: "2026-06-23",
    related: ["transactional", "fix-flip"],
    body: `
<p><strong>Transactional funding</strong> is very short-term capital that lets a wholesaler or assignor buy a property (the A-to-B closing) and immediately resell it to the end buyer (the B-to-C closing), often on the same day. It bridges the gap so you never use your own cash.</p>

<h2>How does a double closing work?</h2>
<p>There are two back-to-back transactions:</p>
<ul>
  <li><strong>A to B</strong> — you buy from the original seller, funded by transactional capital.</li>
  <li><strong>B to C</strong> — you sell to your end buyer, and their funds (or their lender's) pay off the transactional loan.</li>
</ul>
<p>Because the two closings happen together, the money is outstanding for hours, not weeks.</p>

<h2>When do you use it?</h2>
<p>Use transactional funding when your end buyer's lender will not allow an assignment of contract, or when you would rather not disclose your spread. The double close keeps the two deals separate and clean.</p>

<h2>What does it cost?</h2>
<p>Pricing is a flat fee rather than an annual rate, because the loan lasts a day. The fee is small relative to your assignment spread, and you keep the deal on schedule without tying up your own capital.</p>
`,
    faqs: [
      { q: "What is the difference between transactional funding and an assignment?", a: "An assignment transfers your purchase contract to the end buyer for a fee. Transactional funding instead funds an actual purchase and resale (a double close), useful when the end buyer's lender will not allow an assignment." },
      { q: "How long is transactional funding outstanding?", a: "Usually hours. The A-to-B and B-to-C closings happen back to back, often the same day, so the capital is repaid almost immediately from the end buyer's funds." },
      { q: "Do you need good credit for transactional funding?", a: "Credit matters far less than on a normal loan because the financing is repaid the same day from the resale. The deal and the end buyer drive the approval." },
    ],
  },
  {
    slug: "bank-statement-loans-for-investors",
    title: "Bank Statement and No-Doc Loans for Self-Employed Investors",
    metaTitle: "Bank Statement and No-Doc Investor Loans | USAM Fund",
    description:
      "If your tax returns understate your income, a bank statement or no-doc loan qualifies you on cash flow or the asset instead. Here's how these loans work and who they fit.",
    category: "Bank Statement / No-Doc",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["bank-statement", "rental-dscr", "conventional-investment"],
    body: `
<p>A <strong>bank statement loan</strong> qualifies a self-employed borrower on the cash flow shown in their bank deposits rather than on tax returns. A <strong>no-doc</strong> investor loan goes a step further and qualifies on the asset itself. Both exist because write-offs and a complex return can make a strong borrower look weak on paper.</p>

<h2>Why tax returns work against investors</h2>
<p>Smart investors and business owners write off everything they legally can, which lowers taxable income. A conventional lender reads that low number and says no, even when real cash flow is strong. Bank statement and no-doc programs look past the return.</p>

<h2>How does a bank statement loan qualify you?</h2>
<ul>
  <li>You provide 12 to 24 months of business or personal bank statements.</li>
  <li>The lender averages your deposits to establish real cash flow.</li>
  <li>No W-2s, no tax returns, no pay stubs.</li>
</ul>

<h2>When no-doc makes more sense</h2>
<p>For pure investment property, qualifying on the asset (its value or its rent, as with a DSCR loan) can be cleaner than documenting income at all. The right path depends on whether the strength is in your cash flow or in the deal.</p>
`,
    faqs: [
      { q: "What is a bank statement loan?", a: "A bank statement loan qualifies a self-employed borrower using 12 to 24 months of bank deposits to show real cash flow, instead of tax returns or W-2s." },
      { q: "Is a no-doc loan really no documentation?", a: "Not literally. No-doc means no income documentation; the loan qualifies on the asset (value or rent). You will still verify identity, the entity, the property, and reserves." },
      { q: "Who should consider a bank statement loan?", a: "Self-employed investors, business owners, and anyone whose tax returns understate their true income because of write-offs." },
    ],
  },
  {
    slug: "how-to-finance-a-rental-property-in-an-llc",
    title: "How to Finance a Rental Property in an LLC",
    metaTitle: "How to Finance a Rental Property in an LLC | USAM Fund",
    description:
      "Most conventional lenders won't lend to an LLC. Learn how DSCR and portfolio loans let you hold rentals in an LLC, why investors do it, and how qualifying works.",
    category: "Rental / DSCR",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["rental-dscr", "portfolio", "conventional-investment"],
    body: `
<p>You finance a rental held in an <strong>LLC</strong> with a business-purpose loan, most often a <strong>DSCR loan</strong>, because those lenders are built to close in the name of an entity. Most conventional mortgages, by contrast, must close in your personal name.</p>

<h2>Why hold a rental in an LLC?</h2>
<ul>
  <li><strong>Liability separation</strong> between your rentals and your personal assets.</li>
  <li><strong>Cleaner books</strong> for each property or each partnership.</li>
  <li><strong>Scalability</strong> without your personal debt-to-income ratio capping you.</li>
</ul>

<h2>How does qualifying work?</h2>
<p>A DSCR loan qualifies on the property's rent versus its payment, not your tax returns, so closing in an LLC is standard rather than an exception. You typically sign a personal guarantee, but the loan and title sit with the entity.</p>

<h2>What about a whole portfolio?</h2>
<p>Once you hold several rentals in LLCs, a <strong>portfolio (blanket) loan</strong> can roll them into one loan with a single payment, simplifying your financing and freeing capital to keep buying.</p>

<h2>Setting up the entity</h2>
<p>A single-purpose LLC per property (or per group) is common, quick, and inexpensive to form. If you do not have one yet, set it up before closing.</p>
`,
    faqs: [
      { q: "Can you get a mortgage in an LLC name?", a: "Yes, with business-purpose loans like DSCR or portfolio loans, which are designed to close in an entity's name. Most conventional consumer mortgages cannot." },
      { q: "Do you need a personal guarantee on an LLC loan?", a: "Usually yes. The loan and title sit with the LLC, but the lender typically asks the principal to personally guarantee it." },
      { q: "Should each rental be in its own LLC?", a: "Many investors use a single-purpose LLC per property for liability separation and clean books, though some group properties. Confirm structure with your attorney and CPA." },
    ],
  },
  {
    slug: "ltv-vs-ltc-explained",
    title: "LTV vs LTC: What's the Difference?",
    metaTitle: "LTV vs LTC: What's the Difference? | USAM Fund",
    description:
      "LTV measures a loan against a property's value; LTC measures it against total project cost. Learn when each applies and why it matters for your leverage.",
    category: "Rates & Costs",
    readMins: 4,
    datePublished: "2026-06-23",
    related: ["fix-flip", "construction", "cre-bridge"],
    body: `
<p><strong>LTV (loan-to-value)</strong> compares the loan to the property's value. <strong>LTC (loan-to-cost)</strong> compares the loan to the total cost of the project. Both express leverage, but they answer different questions, and which one a lender uses changes how much you can borrow.</p>

<h2>What is LTV?</h2>
<p>LTV = loan ÷ property value. On a stabilized or finished property, value is the anchor. A $400,000 loan on a $500,000 property is 80% LTV.</p>

<h2>What is LTC?</h2>
<p>LTC = loan ÷ total project cost (purchase plus rehab, or land plus construction). It is the right measure during a project, before the value exists. An 85% LTC loan funds 85% of what the project costs to execute; you bring the other 15%.</p>

<h2>When does each apply?</h2>
<ul>
  <li><strong>Fix and flip:</strong> often both, leverage on purchase (a form of LTV/LTP) plus rehab funding, all capped under a percentage of ARV.</li>
  <li><strong>Ground-up construction:</strong> LTC leads, because there is no finished value yet.</li>
  <li><strong>Bridge / rental:</strong> LTV, against the property's value.</li>
</ul>

<h2>Why it matters</h2>
<p>Two loans can both say "80%" and mean very different cash out of your pocket. Always ask whether a quoted percentage is against value or against cost.</p>
`,
    faqs: [
      { q: "What is the difference between LTV and LTC?", a: "LTV measures the loan against the property's value; LTC measures it against the total cost of the project. LTC is used during a build or rehab, LTV on a finished or stabilized property." },
      { q: "Which is used for a construction loan?", a: "Construction loans lead with LTC (loan-to-cost), because the finished value does not exist yet. Leverage is sized against land plus construction costs." },
      { q: "Can a loan use both LTV and LTC?", a: "Yes. Fix and flip loans often combine purchase leverage and rehab funding while also capping total exposure at a percentage of after-repair value (ARV)." },
    ],
  },
  {
    slug: "fix-and-flip-no-money-down",
    title: "Can You Fund a Fix and Flip With No Money Down?",
    metaTitle: "Fix and Flip With No Money Down: Is It Possible? | USAM Fund",
    description:
      "True zero-down flips are rare, but high-leverage financing plus the right deal can get you close. Here's what 'no money down' really means and how investors structure it.",
    category: "Fix & Flip",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["fix-flip", "transactional"],
    body: `
<p>Funding a fix and flip with <strong>truly zero dollars</strong> out of pocket is rare, but high-leverage financing can get you close. The honest answer: lenders fund up to 90% of purchase and up to 100% of rehab, so your cash is mostly the remaining down payment and closing costs, and there are ways to reduce even that.</p>

<h2>What "no money down" usually means</h2>
<p>It rarely means a lender hands you everything. It usually means stacking high leverage with other capital so your personal cash in the deal is minimal:</p>
<ul>
  <li>Up to 90% of purchase and 100% of rehab from the lender.</li>
  <li>The down payment and closing costs covered by a partner, private money, or a strong below-market purchase.</li>
  <li>An interest reserve so you make no payments during the hold.</li>
</ul>

<h2>How a great deal lowers your cash</h2>
<p>Buy far enough below value and the equity in the deal can substitute for cash. When the after-repair value comfortably supports the loan, lenders can stretch leverage, and a partner is easier to attract.</p>

<h2>The realistic path</h2>
<p>Bring a sound deal, a realistic budget, and a clear exit. Maximize lender leverage, then fill the small remaining gap with a partner or private money. That is how experienced flippers get as close to no money down as it gets.</p>
`,
    faqs: [
      { q: "Can you really flip a house with no money down?", a: "Truly zero out of pocket is uncommon. Investors get close by combining high-leverage financing (up to 90% of purchase, 100% of rehab) with a partner, private money, or a strong below-market purchase." },
      { q: "What is an interest reserve?", a: "An interest reserve is loan proceeds set aside to cover the interest payments during the project, so you make no out-of-pocket payments until the exit, when the value supports it." },
      { q: "Do you need cash for a fix and flip?", a: "Usually some, for the down payment and closing costs, but a below-market deal, high leverage, and a partner can shrink that to a minimum." },
    ],
  },
  {
    slug: "sba-7a-vs-504",
    title: "SBA 7(a) vs 504: Which Is Right for Owner-Occupied Real Estate?",
    metaTitle: "SBA 7(a) vs 504 for Real Estate | USAM Fund",
    description:
      "Both SBA programs finance owner-occupied commercial property, but they're built differently. Compare 7(a) and 504 on use, structure, and when each one wins.",
    category: "SBA",
    readMins: 5,
    datePublished: "2026-06-23",
    related: ["sba", "cre-permanent"],
    body: `
<p>For owner-occupied commercial real estate, the <strong>SBA 504</strong> loan is usually the better fit for buying or building, while the <strong>SBA 7(a)</strong> is the more flexible all-purpose loan. Both are government-backed and long-term; they are structured very differently.</p>

<h2>How is the 504 structured?</h2>
<p>A 504 loan combines a bank loan, a CDC (SBA) loan, and your down payment, typically around 10% down. It is purpose-built for fixed assets: owner-occupied real estate and heavy equipment, usually at long, fixed rates. It is the cheapest long-term money for buying or constructing the building your business occupies.</p>

<h2>What is the 7(a) better for?</h2>
<p>The 7(a) is the SBA's flagship general-purpose loan. It can fund real estate too, but it also covers working capital, business acquisition, and equipment, and it allows blending several uses into one loan. It is more flexible, often at a variable rate.</p>

<h2>Which should you choose?</h2>
<ul>
  <li><strong>Buying or building your owner-occupied property?</strong> 504 usually wins on cost and structure.</li>
  <li><strong>Need real estate plus working capital or to buy a business?</strong> 7(a) blends it into one loan.</li>
  <li><strong>Want the lowest fixed long-term rate on the building?</strong> Lean 504.</li>
</ul>

<h2>Owner-occupancy is the key</h2>
<p>Both programs require your business to occupy the majority of the property. SBA financing is for the building your business operates from, not for passive investment real estate.</p>
`,
    faqs: [
      { q: "What is the main difference between SBA 7(a) and 504?", a: "The 504 is built for fixed assets like owner-occupied real estate, combining a bank loan, a CDC loan, and roughly 10% down. The 7(a) is a flexible general-purpose loan that can also fund working capital and business acquisition." },
      { q: "Can you use an SBA loan for investment property?", a: "No. SBA 7(a) and 504 require the business to occupy the majority of the property. They finance owner-occupied real estate, not passive rentals." },
      { q: "How much is the down payment on an SBA 504?", a: "Typically around 10% for a standard owner-occupied purchase, though it can be higher for special-purpose properties or startups." },
    ],
  },
  {
    slug: "how-fast-can-a-hard-money-loan-close",
    title: "How Fast Can a Hard Money Loan Close?",
    metaTitle: "How Fast Can a Hard Money Loan Close? | USAM Fund",
    description:
      "Hard money can close far faster than a bank, often in 5 to 7 business days. Learn what drives the timeline and how to close as fast as possible.",
    category: "Rates & Costs",
    readMins: 4,
    datePublished: "2026-06-23",
    related: ["fix-flip", "cre-bridge", "transactional"],
    body: `
<p>A <strong>hard money loan</strong> can close in as few as <strong>5 to 7 business days</strong>, versus the 30 to 60+ days a bank typically takes. Because a private lender uses its own capital and decides in house, the timeline depends mostly on how fast the file comes together, not on a committee.</p>

<h2>Why is hard money faster than a bank?</h2>
<ul>
  <li>The lender decides in house, with no outside underwriting committee.</li>
  <li>Approval is asset-based, so there is no lengthy income and tax-return review.</li>
  <li>Capital is the lender's own, so funding is not waiting on a secondary market.</li>
</ul>

<h2>What actually drives the timeline?</h2>
<p>The biggest variables are outside the loan itself: <strong>title, insurance, and your documents</strong>. A clean title, a ready entity, a clear scope of work, and a responsive borrower are what turn a two-week close into a one-week close.</p>

<h2>How to close as fast as possible</h2>
<ul>
  <li>Order title early and clear any issues up front.</li>
  <li>Have your LLC and operating agreement ready.</li>
  <li>Bring the purchase contract, scope of work, and budget on day one.</li>
  <li>Respond to document requests the same day.</li>
</ul>
<p>Note that loan types differ: bridge and fix and flip close fastest, DSCR rental loans take a bit longer for the appraisal and rent verification, and SBA runs much longer because it is fully documented.</p>
`,
    faqs: [
      { q: "How long does a hard money loan take to close?", a: "Often 5 to 7 business days for bridge and fix and flip loans, compared with 30 to 60+ days for a bank. DSCR rental loans take a little longer, and SBA loans much longer." },
      { q: "What slows down a hard money closing?", a: "Usually title issues, insurance, or slow document turnaround from the borrower, not the lender's underwriting. A clean file closes fast." },
      { q: "Can a hard money loan close in 48 hours?", a: "A term sheet or approval can come within about 48 hours on a complete file, but the actual funding still depends on title and insurance, which is why a full close typically takes 5 to 7 days." },
    ],
  },
];

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g]));
