// Geo landing pages targeting local hard-money search intent. USAM is based in
// Bee Cave, TX (Austin metro) and lends nationwide, so the Texas/Austin angle is
// a genuine local-authority play. Each entry renders /<slug>.

export const geoPages = [
  {
    slug: "texas-hard-money-lender",
    region: "Texas",
    metaTitle: "Texas Hard Money Lender | Fix & Flip, DSCR | USAM Fund",
    description:
      "Direct Texas hard money and private lender for real estate investors. Fix & flip, DSCR rental, ground-up, and bridge loans across Texas. Based in Bee Cave, funding fast.",
    h1: "Texas Hard Money Lender",
    tagline: "Direct private capital for Texas real estate investors.",
    intro:
      "USAM Fund is a direct private and hard-money lender headquartered in Bee Cave, Texas. We fund fix & flip, DSCR rental, ground-up construction, and bridge loans for investors across the state, with our own capital and our own decisions, so you close on your timeline.",
    cities: ["Austin", "San Antonio", "Houston", "Dallas", "Fort Worth", "Bee Cave", "Round Rock", "Georgetown"],
    points: [
      ["Texas-based, Texas-savvy", "We know the markets, the title companies, and the speed Texas deals move at, because we operate here."],
      ["Direct lender, no broker", "We underwrite and fund in-house. No middle layer slowing down your close."],
      ["Every investor strategy", "Flips, rentals, new construction, bridge, and portfolio loans, all under one roof."],
    ],
  },
  {
    slug: "austin-hard-money-lender",
    region: "Austin",
    metaTitle: "Austin Hard Money Lender | Fix & Flip & DSCR | USAM Fund",
    description:
      "Local Austin hard money lender for fix & flip, DSCR rental, and bridge loans. Based in Bee Cave, minutes from Austin. Fast closings and real people who answer the phone.",
    h1: "Austin Hard Money Lender",
    tagline: "Local capital for Austin-area real estate investors.",
    intro:
      "Based in Bee Cave, minutes from downtown Austin, USAM Fund is a direct private lender for investors working the Austin metro. From East Austin flips to Hill Country builds, we fund up to 90% of purchase and 100% of rehab, and we pick up the phone.",
    cities: ["Austin", "Bee Cave", "Lakeway", "Cedar Park", "Round Rock", "Pflugerville", "Dripping Springs", "Buda"],
    points: [
      ["In your backyard", "We are a local lender, not an out-of-state call center. Meet the team and tour the deal."],
      ["Built for Austin velocity", "A hot market rewards speed. We can fund in as few as 5-7 days on a complete file."],
      ["Creative structure", "Austin deals rarely fit a box. Complex scenarios are where we do our best work."],
    ],
  },
];

export const geoBySlug = Object.fromEntries(geoPages.map((g) => [g.slug, g]));
