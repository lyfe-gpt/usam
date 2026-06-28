import { useEffect } from "react";

// Injects a JSON-LD <script> into <head> for the life of the component.
// Answer engines (Google AI Overviews, Perplexity, etc.) and rich-result
// crawlers read these blocks, so each FAQ surface ships matching structured
// data. `data` is any schema.org object; `id` dedupes on remount.
export default function JsonLd({ data, id }) {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    if (id) el.id = id;
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, [data, id]);

  return null;
}

// Production origin used in absolute schema/OG URLs. Update if the final
// domain differs from usam.net (see Launch Readiness Checklist, task #18).
export const SITE_URL = "https://usam.net";

// Canonical name, address, phone (NAP) + geo for the Bee Cave, TX office.
export const NAP = {
  name: "USAM Fund",
  phone: "+1-512-488-6087",
  email: "jack@usam.net",
  street: "3821 Juniper Trace, Suite 210",
  city: "Bee Cave",
  region: "TX",
  postal: "78738",
  country: "US",
  lat: 30.3078075,
  lng: -97.93361,
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: NAP.street,
  addressLocality: NAP.city,
  addressRegion: NAP.region,
  postalCode: NAP.postal,
  addressCountry: NAP.country,
};

// Add real profile URLs (Google Business, LinkedIn, Facebook) when available.
const SAME_AS = [];

// schema.org Organization — the publisher entity, referenced site-wide.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: NAP.name,
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    telephone: NAP.phone,
    email: NAP.email,
    address: postalAddress,
    sameAs: SAME_AS,
  };
}

// schema.org FinancialService (LocalBusiness subtype) — NAP, geo, hours.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: NAP.name,
    image: `${SITE_URL}/og.jpg`,
    url: SITE_URL,
    telephone: NAP.phone,
    email: NAP.email,
    priceRange: "$$",
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: NAP.lat, longitude: NAP.lng },
    areaServed: { "@type": "Country", name: "United States" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: SAME_AS,
  };
}

// schema.org BreadcrumbList from [{ name, path }] (path is absolute on the site).
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

// schema.org Article for guide/resource pages.
export function articleSchema({ title, description, path, datePublished, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: { "@type": "Organization", name: NAP.name },
    publisher: {
      "@type": "Organization",
      name: NAP.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
    },
    datePublished,
    dateModified: dateModified || datePublished,
  };
}

// Parse "$100K" / "$5M" / "1,250" into a number; null if unparseable.
function parseMoney(s) {
  const m = String(s).match(/\$?\s*([\d,.]+)\s*([KMB]?)/i);
  if (!m) return null;
  let n = parseFloat(m[1].replace(/,/g, ""));
  if (!Number.isFinite(n)) return null;
  const u = (m[2] || "").toUpperCase();
  if (u === "K") n *= 1e3;
  else if (u === "M") n *= 1e6;
  else if (u === "B") n *= 1e9;
  return Math.round(n);
}

// schema.org LoanOrCredit for a loan program, so answer engines can extract
// concrete terms (type, rate, amount range, loan term, area served). Parses the
// program's own `terms` rows defensively and omits anything it can't read.
export function loanSchema(program) {
  const terms = Object.fromEntries((program.terms || []).map(([k, v]) => [String(k).toLowerCase(), v]));
  const out = {
    "@context": "https://schema.org",
    "@type": "LoanOrCredit",
    "@id": `${SITE_URL}/programs/${program.slug}#loan`,
    name: `${program.title} loan`,
    description: String(program.desc || program.tagline || "").replace(/<[^>]+>/g, "").trim(),
    url: `${SITE_URL}/programs/${program.slug}`,
    loanType: program.title,
    currency: "USD",
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: NAP.name },
    areaServed: { "@type": "Country", name: "United States" },
  };
  const amt = terms["loan amount"] || terms["loan size"];
  if (amt) {
    const parts = String(amt).split(/\s*(?:to|-|–|—)\s*/);
    const lo = parseMoney(parts[0]);
    const hi = parseMoney(parts[1] || parts[0]);
    if (lo != null) out.amount = { "@type": "MonetaryAmount", currency: "USD", minValue: lo, ...(hi != null && hi !== lo ? { maxValue: hi } : {}) };
  }
  const rate = terms["rate"];
  if (rate) {
    const r = parseFloat((String(rate).match(/([\d.]+)\s*%/) || [])[1]);
    if (Number.isFinite(r)) out.annualPercentageRate = { "@type": "QuantitativeValue", minValue: r, unitText: "PERCENT" };
  }
  const term = terms["term"];
  if (term) {
    const range = String(term).match(/(\d+)\D+(\d+)\s*month/i);
    const single = String(term).match(/(\d+)\s*month/i);
    if (range) out.loanTerm = { "@type": "QuantitativeValue", minValue: +range[1], maxValue: +range[2], unitCode: "MON" };
    else if (single) out.loanTerm = { "@type": "QuantitativeValue", value: +single[1], unitCode: "MON" };
  }
  return out;
}

// Builds a schema.org FAQPage object from a list of { q, a } items.
// `a` may contain light HTML; we strip tags for the structured-data answer
// so engines get clean text.
export function faqPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a.replace(/<[^>]+>/g, "").trim(),
      },
    })),
  };
}
