import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import JsonLd, { breadcrumbSchema, SITE_URL } from "../components/JsonLd.jsx";
import { glossaryTerms } from "../data/glossary.js";

const SCH = "'Schibsted Grotesk',sans-serif";

// DefinedTermSet structured data so answer engines can surface the definitions.
function definedTermSetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Real Estate Investor Financing Glossary",
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
      url: `${SITE_URL}/glossary#${t.slug}`,
    })),
  };
}

export default function Glossary() {
  return (
    <div>
      <Header />
      <JsonLd id="breadcrumb-glossary" data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Glossary", path: "/glossary" },
      ])} />
      <JsonLd id="glossary-schema" data={definedTermSetSchema()} />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 24px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Investor glossary</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>The terms, plainly defined.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 620, margin: 0 }}>Every term we use across our programs, guides, and calculators, in plain English.</p>

          {/* Jump index */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
            {glossaryTerms.map((t) => (
              <a key={t.slug} href={`#${t.slug}`} style={{ fontSize: 13.5, fontWeight: 600, color: "#1A56C4", background: "#EEF3FC", border: "1px solid #DCE6F9", padding: "7px 13px", borderRadius: 999, textDecoration: "none" }}>{t.term}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="sec" style={{ background: "#fff", padding: "24px 32px 48px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          {glossaryTerms.map((t) => (
            <div key={t.slug} id={t.slug} style={{ padding: "22px 0", borderBottom: "1px solid #EEF1F5", scrollMarginTop: 96 }}>
              <h2 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 20, color: "#0E1A2B", margin: "0 0 6px" }}>{t.term}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "#475467", margin: 0 }}>{t.def}</p>
            </div>
          ))}
          <p style={{ fontSize: 15, color: "#667085", marginTop: 24 }}>
            Want the deeper version? Read the <Link to="/resources" style={{ color: "#1A56C4", fontWeight: 700 }}>investor guides</Link> or run the numbers with our <Link to="/calculators" style={{ color: "#1A56C4", fontWeight: 700 }}>calculators</Link>.
          </p>
        </div>
      </section>

      <CtaBand title="Ready to put it to work?" text="Get a real rate in minutes. No obligation, no hard credit pull to start." />
      <Footer />
    </div>
  );
}
