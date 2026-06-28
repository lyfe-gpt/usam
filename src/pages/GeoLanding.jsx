import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import JsonLd, { breadcrumbSchema } from "../components/JsonLd.jsx";
import { geoBySlug } from "../data/geo.js";
import { programs } from "../data/programs.js";
import { cityPrograms } from "../data/cityPrograms.js";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function GeoLanding({ slug }) {
  const g = geoBySlug[slug];
  if (!g) return <Navigate to="/" replace />;
  // City-specific program pages (e.g. dallas-fix-and-flip-loans) for this metro.
  const combos = cityPrograms.filter((c) => c.geoSlug === slug);

  return (
    <div>
      <Header />
      <JsonLd id={`breadcrumb-${slug}`} data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: g.h1, path: `/${slug}` },
      ])} />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 40px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Now lending in {g.region}</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 14px" }}>{g.h1}</h1>
          <p style={{ fontSize: 19, fontWeight: 600, color: "#1A56C4", margin: "0 0 18px" }}>{g.tagline}</p>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475467", maxWidth: 640, margin: "0 0 30px" }}>{g.intro}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link to="/apply" className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "15px 28px", borderRadius: 999, boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Get my rate</Link>
            <a href="tel:512-488-6087" className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "14px 26px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>Call us</a>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="sec" style={{ background: "#fff", padding: "16px 32px 48px" }}>
        <div className="val-grid" style={{ maxWidth: 880, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {g.points.map(([title, body]) => (
            <div key={title} style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 14, padding: 24 }}>
              <h2 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 18, color: "#0E1A2B", margin: "0 0 8px" }}>{title}</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#667085", margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="sec" style={{ background: "#fff", padding: "8px 32px 56px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(24px,2.8vw,32px)", color: "#0E1A2B", margin: "0 0 8px" }}>Loan programs for {g.region} investors</h2>
          <p style={{ fontSize: 16, color: "#667085", margin: "0 0 24px" }}>Acquisition through exit, all funded in-house.</p>
          <div className="pg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
            {programs.map((p) => (
              <Link key={p.slug} to={`/programs/${p.slug}`} className="card-link" style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #E6E9EF", borderRadius: 12, padding: "14px 16px", textDecoration: "none" }}>
                <span style={{ flex: "none", width: 36, height: 36, borderRadius: 9, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={p.icon} size={18} color="#1A56C4" />
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#0E1A2B" }}>{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular city-specific programs (internal links to the city x program pages) */}
      {combos.length > 0 && (
        <section className="sec" style={{ background: "#fff", padding: "8px 32px 40px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", marginBottom: 14 }}>Popular in {g.region}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {combos.map((c) => (
                <Link key={c.slug} to={`/${c.slug}`} className="card-link" style={{ fontSize: 14.5, fontWeight: 700, color: "#1A56C4", background: "#EEF3FC", border: "1px solid #DCE6F9", padding: "10px 16px", borderRadius: 999, textDecoration: "none" }}>
                  {c.region} {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cities served */}
      <section className="sec" style={{ background: "#F6F8FB", padding: "40px 32px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", marginBottom: 14 }}>Areas we serve</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {g.cities.map((c) => (
              <span key={c} style={{ fontSize: 14.5, fontWeight: 600, color: "#475467", background: "#fff", border: "1px solid #E6E9EF", padding: "8px 14px", borderRadius: 999 }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Funding ${g.region} deals fast.`} text="Get a real rate in minutes. No obligation, no hard credit pull to start." />
      <Footer />
    </div>
  );
}
