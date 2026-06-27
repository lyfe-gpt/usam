import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Faq from "../components/Faq.jsx";
import Icon from "../components/Icon.jsx";
import JsonLd, { breadcrumbSchema, faqPageSchema } from "../components/JsonLd.jsx";
import { cityProgramBySlug } from "../data/cityPrograms.js";
import { geoBySlug } from "../data/geo.js";
import { bySlug as programBySlug } from "../data/programs.js";
import { programFaqs } from "../data/faqs.js";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function CityProgram({ slug }) {
  const cp = cityProgramBySlug[slug];
  if (!cp) return <Navigate to="/" replace />;
  const geo = geoBySlug[cp.geoSlug];
  const program = programBySlug[cp.program];
  if (!geo || !program) return <Navigate to="/" replace />;
  const faqs = programFaqs[cp.program] || [];

  const h1 = `${cp.region} ${cp.label}`;
  // Unique opening: a city-specific lead sentence that names the metro's own
  // submarkets, then the program's description. Injecting real cities makes the
  // opening differ meaningfully on every page, not just the city name.
  const where = geo.cities.length >= 4
    ? `from ${geo.cities[0]} to ${geo.cities[3]}`
    : `across the ${cp.region} metro`;
  const lead = `Financing ${cp.noun} for real estate investors across ${cp.region}, ${where}. ${program.desc}`;

  return (
    <div>
      <Header />
      <JsonLd id={`breadcrumb-cp-${slug}`} data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: program.title, path: `/programs/${program.slug}` },
        { name: h1, path: `/${slug}` },
      ])} />
      {faqs.length > 0 && <JsonLd id={`faq-cp-${slug}`} data={faqPageSchema(faqs)} />}

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "64px 32px 28px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>Now lending in {cp.region}</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(34px,4.4vw,54px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 14px" }}>{h1}</h1>
          <p style={{ fontSize: 19, fontWeight: 600, color: "#1A56C4", margin: "0 0 16px" }}>{program.tagline}</p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#475467", maxWidth: 720, margin: "0 0 26px" }}>{lead}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link to="/apply" className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "15px 28px", borderRadius: 999, boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Get my rate</Link>
            <a href="tel:512-488-6087" className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "14px 26px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>Call us</a>
          </div>
        </div>
      </section>

      {/* Program stats (unique per program) */}
      {program.stats?.length > 0 && (
        <section className="sec" style={{ background: "#fff", padding: "8px 32px 24px" }}>
          <div className="val-grid" style={{ maxWidth: 880, margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${Math.min(program.stats.length, 3)},1fr)`, gap: 16 }}>
            {program.stats.slice(0, 3).map(([v, l]) => (
              <div key={l} style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 14, padding: "22px 20px" }}>
                <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 30, color: "#1A56C4", letterSpacing: "-0.02em" }}>{v}</div>
                <div style={{ fontSize: 14, color: "#667085", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why USAM in this city (unique per city) */}
      <section className="sec" style={{ background: "#fff", padding: "24px 32px 40px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(24px,2.8vw,32px)", color: "#0E1A2B", margin: "0 0 20px" }}>Why investors choose USAM in {cp.region}</h2>
          <div className="val-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {geo.points.map(([title, body]) => (
              <div key={title} style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 14, padding: 22 }}>
                <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 17, color: "#0E1A2B", margin: "0 0 8px" }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#667085", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities served (unique per city) + cross-links */}
      <section className="sec" style={{ background: "#F6F8FB", padding: "36px 32px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", marginBottom: 14 }}>{cp.short === "flips" ? "Flipping" : "Renting"} across {cp.region}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
            {geo.cities.map((c) => (
              <span key={c} style={{ fontSize: 14.5, fontWeight: 600, color: "#475467", background: "#fff", border: "1px solid #E6E9EF", padding: "8px 14px", borderRadius: 999 }}>{c}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 15 }}>
            <Link to={`/programs/${program.slug}`} style={{ color: "#1A56C4", fontWeight: 700 }}>Full {program.title} details</Link>
            <Link to={`/${geo.slug}`} style={{ color: "#1A56C4", fontWeight: 700 }}>All {cp.region} lending</Link>
            <Link to="/calculators" style={{ color: "#1A56C4", fontWeight: 700 }}>Run the numbers</Link>
          </div>
        </div>
      </section>

      {/* Program FAQs (unique per program) */}
      {faqs.length > 0 && (
        <section className="sec" style={{ background: "#fff", padding: "48px 32px 24px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 18px" }}>{program.title} questions</h2>
            <Faq items={faqs} />
          </div>
        </section>
      )}

      <CtaBand title={`Funding ${cp.region} ${cp.short} fast.`} text="Get a real rate in minutes. No obligation, no hard credit pull to start." />
      <Footer />
    </div>
  );
}
