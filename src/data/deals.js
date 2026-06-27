// Closed-deal showcase. Turns the "$1B+ funded / 25K+ loans" stat line into
// concrete proof at the moment a visitor is deciding whether to apply.
//
// ⚠️ PLACEHOLDER DATA — these are illustrative scenarios, NOT real transactions.
// Advertising specific deals as real without them being real is the same FTC /
// false-advertising exposure as a fake testimonial. So the showcase is gated
// OFF (see SHOW_DEALS below) until Jack supplies real, anonymized closed deals
// and confirms they can be published. Then flip SHOW_DEALS to true.
//
// To go live: replace `deals` with real closings (city/state + program + a
// metric or two + close time, no borrower PII), set SHOW_DEALS = true.

export const SHOW_DEALS = false;

export const deals = [
  { location: "Austin, TX", program: "Fix and Flip", metric: "$312K loan", detail: "90% purchase, 100% rehab", days: "9-day close" },
  { location: "San Antonio, TX", program: "DSCR Rental", metric: "$248K loan", detail: "1.31 DSCR, 30-yr fixed", days: "12-day close" },
  { location: "Houston, TX", program: "Ground-Up Construction", metric: "$640K loan", detail: "Spec build, 12-mo term", days: "Funded on schedule" },
  { location: "Dallas, TX", program: "Bridge", metric: "$1.2M loan", detail: "Cash-out to reposition", days: "8-day close" },
  { location: "Tampa, FL", program: "Fix and Flip", metric: "$285K loan", detail: "Repeat borrower", days: "7-day close" },
  { location: "Phoenix, AZ", program: "DSCR Rental", metric: "$330K loan", detail: "Portfolio add, 1.42 DSCR", days: "11-day close" },
];
