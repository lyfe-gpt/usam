import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import { guides } from "../data/guides.js";

const SCH = "'Schibsted Grotesk',sans-serif";

// The hub is for investor education; partner-program guides live on /partners.
const investorGuides = guides.filter((g) => g.category !== "For Partners");

// Tabs: "All" plus each category in first-seen order, so the row mirrors content.
const categories = investorGuides.reduce((acc, g) => {
  if (!acc.includes(g.category)) acc.push(g.category);
  return acc;
}, []);
const tabs = ["All", ...categories];

export default function Resources() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? investorGuides : investorGuides.filter((g) => g.category === active);

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 28px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Resources</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>Guides for real estate investors.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 620, margin: 0 }}>Plain-English explainers on how investor financing actually works, from DSCR loans to the BRRRR method, written by the people who underwrite the deals.</p>

          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
            {tabs.map((t) => {
              const on = t === active;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActive(t)}
                  className="faq-pill"
                  aria-pressed={on}
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    color: on ? "#fff" : "#1A56C4",
                    background: on ? "#1A56C4" : "#EEF3FC",
                    border: `1px solid ${on ? "#1A56C4" : "#DCE6F9"}`,
                    padding: "9px 16px",
                    borderRadius: 999,
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guide grid */}
      <section className="sec" style={{ background: "#fff", padding: "32px 32px 64px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div className="pg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 22 }}>
            {shown.map((g) => (
              <Link key={g.slug} to={`/resources/${g.slug}`} className="card-link" style={{ textDecoration: "none", display: "block", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>{g.category} · {g.readMins} min read</div>
                <h2 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 22, lineHeight: 1.2, color: "#0E1A2B", margin: "0 0 10px" }}>{g.title}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "#667085", margin: "0 0 16px" }}>{g.description}</p>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5, fontWeight: 700, color: "#1A56C4" }}>
                  Read the guide <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Have a deal to run by us?" text="Get a real rate in minutes. No obligation, no hard credit pull to start." />
      <Footer />
    </div>
  );
}
