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
