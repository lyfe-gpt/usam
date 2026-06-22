import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import { programs } from "../data/programs.js";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function Programs() {
  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 48px" }}>
        <div className="phero" style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 48, alignItems: "end" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Our programs</div>
            <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,60px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 18px" }}>Financing for the whole deal lifecycle.</h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 560, margin: 0 }}>Programs covering acquisition, rehab, construction, hold, and exit. Pick the one that fits, or get a real rate in minutes.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link to="/apply" className="btn-primary" style={{ textAlign: "center", background: "#1A56C4", color: "#fff", borderRadius: 999, padding: 15, textDecoration: "none", fontWeight: 700, fontSize: 16, boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Get my rate</Link>
            <Link to="/contact" className="btn-outline" style={{ textAlign: "center", background: "#fff", color: "#0E1A2B", border: "1.5px solid #D6DDE8", borderRadius: 999, padding: 14, textDecoration: "none", fontWeight: 700, fontSize: 16 }}>Talk to us</Link>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="sec" style={{ background: "#fff", padding: "24px 32px 64px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="pg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {programs.map((p) => (
              <Link key={p.slug} to={`/programs/${p.slug}`} className="card-prog" style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, padding: 28 }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon name={p.icon} size={25} color="#1A56C4" />
                </div>
                <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 21, color: "#0E1A2B", margin: "0 0 8px" }}>{p.hubTitle}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: "#667085", margin: "0 0 18px", flex: 1 }}>{p.hubDesc}</p>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5, fontWeight: 700, color: "#1A56C4" }}>
                  View program <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which program fits?"
        text="Tell us about the deal and we'll point you to the right loan with a real rate."
        withSecondary={false}
      />

      <Footer />
    </div>
  );
}
