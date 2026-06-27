import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Faq from "../components/Faq.jsx";
import JsonLd, { breadcrumbSchema, faqPageSchema } from "../components/JsonLd.jsx";
import { comparisonBySlug } from "../data/comparisons.js";
import { bySlug as programBySlug } from "../data/programs.js";
import { guideBySlug } from "../data/guides.js";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function Comparison({ slug }) {
  const c = comparisonBySlug[slug];
  if (!c) return <Navigate to="/compare" replace />;

  const program = c.relatedProgram ? programBySlug[c.relatedProgram] : null;
  const guide = c.relatedGuide ? guideBySlug[c.relatedGuide] : null;

  return (
    <div>
      <Header />
      <JsonLd id={`breadcrumb-cmp-${slug}`} data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare" },
        { name: c.h1, path: `/compare/${slug}` },
      ])} />
      <JsonLd id={`faq-cmp-${slug}`} data={faqPageSchema(c.faqs)} />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "64px 32px 24px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>Compare</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(34px,4.2vw,52px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 12px" }}>{c.h1}</h1>
          <p style={{ fontSize: 19, fontWeight: 600, color: "#1A56C4", margin: "0 0 14px" }}>{c.tagline}</p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#475467", maxWidth: 720, margin: 0 }}>{c.intro}</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="sec" style={{ background: "#fff", padding: "16px 32px 40px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div className="cmp-table" style={{ border: "1px solid #E6E9EF", borderRadius: 16, overflow: "hidden" }}>
            {/* Header row */}
            <div className="cmp-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", background: "#0E1A2B" }}>
              <div style={{ padding: "16px 18px" }} />
              <div style={{ padding: "16px 18px", borderLeft: "1px solid #21324A" }}>
                <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 17, color: "#fff" }}>{c.a.name}</div>
                <div style={{ fontSize: 13, color: "#AEB9C9" }}>{c.a.blurb}</div>
              </div>
              <div style={{ padding: "16px 18px", borderLeft: "1px solid #21324A" }}>
                <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 17, color: "#fff" }}>{c.b.name}</div>
                <div style={{ fontSize: 13, color: "#AEB9C9" }}>{c.b.blurb}</div>
              </div>
            </div>
            {/* Data rows */}
            {c.rows.map(([attr, av, bv], i) => (
              <div key={attr} className="cmp-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", background: i % 2 ? "#F6F8FB" : "#fff", borderTop: "1px solid #EEF1F5" }}>
                <div style={{ padding: "14px 18px", fontSize: 14, fontWeight: 700, color: "#0E1A2B" }}>{attr}</div>
                <div style={{ padding: "14px 18px", fontSize: 14.5, color: "#475467", borderLeft: "1px solid #EEF1F5" }}>{av}</div>
                <div style={{ padding: "14px 18px", fontSize: 14.5, color: "#475467", borderLeft: "1px solid #EEF1F5" }}>{bv}</div>
              </div>
            ))}
          </div>

          {/* Bottom line */}
          <div style={{ marginTop: 24, background: "#EEF3FC", border: "1px solid #DCE6F9", borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 16, color: "#123E96", marginBottom: 6 }}>Bottom line</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#475467", margin: 0 }}>{c.bottomLine}</p>
          </div>
        </div>
      </section>

      {/* Related links */}
      {(program || guide) && (
        <section className="sec" style={{ background: "#F6F8FB", padding: "32px 32px" }}>
          <div className="calc-related" style={{ maxWidth: 880, margin: "0 auto", display: "grid", gridTemplateColumns: program && guide ? "1fr 1fr" : "1fr", gap: 16 }}>
            {program && (
              <Link to={`/programs/${program.slug}`} className="card-link" style={{ display: "block", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 14, padding: "20px 22px", textDecoration: "none" }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", marginBottom: 6 }}>Related program</div>
                <div style={{ fontFamily: SCH, fontWeight: 700, fontSize: 19, color: "#0E1A2B", marginBottom: 4 }}>{program.title}</div>
                <div style={{ fontSize: 14.5, color: "#667085" }}>{program.tagline}</div>
              </Link>
            )}
            {guide && (
              <Link to={`/resources/${guide.slug}`} className="card-link" style={{ display: "block", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 14, padding: "20px 22px", textDecoration: "none" }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", marginBottom: 6 }}>Read the guide</div>
                <div style={{ fontFamily: SCH, fontWeight: 700, fontSize: 19, color: "#0E1A2B", marginBottom: 4 }}>{guide.title}</div>
                <div style={{ fontSize: 14.5, color: "#667085" }}>{guide.description}</div>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="sec" style={{ background: "#fff", padding: "48px 32px 24px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 18px" }}>Common questions</h2>
          <Faq items={c.faqs} />
        </div>
      </section>

      <CtaBand title="Still not sure which fits?" text="Tell us about your deal and we'll point you to the right structure. No obligation." />
      <Footer />
    </div>
  );
}
