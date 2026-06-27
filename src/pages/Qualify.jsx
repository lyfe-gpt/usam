import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import QualifyQuiz from "../components/QualifyQuiz.jsx";
import JsonLd, { breadcrumbSchema } from "../components/JsonLd.jsx";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function Qualify() {
  return (
    <div>
      <Header />
      <JsonLd id="breadcrumb-qualify" data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Find your program", path: "/qualify" },
      ])} />

      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "64px 32px 20px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>60-second program finder</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(34px,4.2vw,50px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 12px" }}>Find your loan program.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "#475467", margin: 0 }}>Answer three quick questions and we'll point you to the program that fits, no credit pull, no obligation.</p>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff", padding: "24px 32px 56px" }}>
        <QualifyQuiz />
      </section>

      <CtaBand title="Prefer to just talk it through?" text="Call 512-488-6087 or send a message. A real person, not a portal." withSecondary />
      <Footer />
    </div>
  );
}
