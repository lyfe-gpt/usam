import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import JsonLd, { breadcrumbSchema } from "../components/JsonLd.jsx";
import { calculators } from "../data/calculators.js";

const SCH = "'Schibsted Grotesk',sans-serif";

const ICONS = { dscr: "rental", fixflip: "fixFlip" };

export default function Calculators() {
  return (
    <div>
      <Header />
      <JsonLd id="breadcrumb-calculators" data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Calculators", path: "/calculators" },
      ])} />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 28px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Free investor tools</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>Run the numbers.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 620, margin: 0 }}>Quick calculators to pressure-test a deal before you make the offer or apply. No sign-up, no email required.</p>
        </div>
      </section>

      {/* Cards */}
      <section className="sec" style={{ background: "#fff", padding: "16px 32px 56px" }}>
        <div className="calc-hub" style={{ maxWidth: 880, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {calculators.map((c) => (
            <Link key={c.slug} to={`/calculators/${c.slug}`} className="card-prog" style={{ textDecoration: "none", display: "block", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, padding: 28 }}>
              <div style={{ width: 48, height: 48, borderRadius: 11, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon name={ICONS[c.kind] || "fixFlip"} size={24} color="#1A56C4" />
              </div>
              <h2 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 22, color: "#0E1A2B", margin: "0 0 8px" }}>{c.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: "#667085", margin: "0 0 16px" }}>{c.tagline}</p>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5, fontWeight: 700, color: "#1A56C4" }}>
                Open calculator <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title="Have a deal on the table?" text="Get a real rate in minutes. No obligation, no hard credit pull to start." />
      <Footer />
    </div>
  );
}
