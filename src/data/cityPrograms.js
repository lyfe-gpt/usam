// Programmatic city × program landing pages, e.g. /dallas-fix-and-flip-loans,
// /houston-dscr-loans. Each page COMBINES two already-unique data sources — the
// city's geo content (region, local value points, cities served) and the
// program's own terms, stats, and FAQs — so no two pages are thin or duplicate:
// same city differs by program, same program differs by city.
//
// We generate the two highest-intent programs across every geo metro. Add a
// program to COMBO_PROGRAMS (or a metro to geo.js) and the pages appear.

import { geoPages } from "./geo.js";

const COMBO_PROGRAMS = [
  { program: "fix-flip", urlPart: "fix-and-flip", label: "Fix and Flip Loans", noun: "fix-and-flip projects", short: "flips" },
  { program: "rental-dscr", urlPart: "dscr", label: "DSCR Loans", noun: "DSCR rental loans", short: "rentals" },
];

const citySlug = (geo) => geo.slug.replace(/-hard-money-lender$/, "");

export const cityPrograms = geoPages.flatMap((g) =>
  COMBO_PROGRAMS.map((cp) => ({
    slug: `${citySlug(g)}-${cp.urlPart}-loans`,
    geoSlug: g.slug,
    region: g.region,
    program: cp.program,
    label: cp.label,
    noun: cp.noun,
    short: cp.short,
  }))
);

export const cityProgramBySlug = Object.fromEntries(cityPrograms.map((c) => [c.slug, c]));

// One genuinely unique market sentence per metro, keyed by the city slug. Rendered
// on every city x program page so each carries real, non-templated local content
// (combined with the unique program content, no two pages read the same).
export const metroAngle = {
  "texas-hard-money-lender": "Texas has no state income tax and some of the strongest population inflows in the country, which keeps investor demand deep across its major metros.",
  "austin-hard-money-lender": "Austin's tech-driven growth and tight inventory reward investors who can move fast, whether in the urban core or out in the Hill Country.",
  "dallas-hard-money-lender": "Dallas-Fort Worth's corporate relocations and steady job growth feed one of the most active investor markets in the country, from infill deals to build-to-rent.",
  "houston-hard-money-lender": "Houston's size, affordability, and diverse economy give investors a broad mix of opportunities across very different submarkets.",
  "san-antonio-hard-money-lender": "San Antonio's affordability and steady military and healthcare employment make it a dependable market for investors year in and year out.",
  "fort-worth-hard-money-lender": "Fort Worth's growth on the west side of the metroplex, at lower entry prices than Dallas, suits investors of every strategy.",
  "phoenix-hard-money-lender": "Phoenix's rapid in-migration and active resale market keep investor demand high across the Valley.",
  "tampa-hard-money-lender": "Tampa Bay's population growth and strong rental demand make it one of the Southeast's most active investor markets.",
  "atlanta-hard-money-lender": "Metro Atlanta's deep rental demand and steady appreciation support both portfolios and value-add projects across its many submarkets.",
  "nashville-hard-money-lender": "Nashville's rapid growth and constrained supply reward investors who can build or renovate quickly across Middle Tennessee.",
};
