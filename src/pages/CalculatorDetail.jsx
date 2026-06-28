import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Faq from "../components/Faq.jsx";
import JsonLd, { breadcrumbSchema, faqPageSchema } from "../components/JsonLd.jsx";
import DscrCalculator from "../components/calculators/DscrCalculator.jsx";
import FixFlipCalculator from "../components/calculators/FixFlipCalculator.jsx";
import BrrrrCalculator from "../components/calculators/BrrrrCalculator.jsx";
import HardMoneyCostCalculator from "../components/calculators/HardMoneyCostCalculator.jsx";
import CapRateCalculator from "../components/calculators/CapRateCalculator.jsx";
import CashOutRefiCalculator from "../components/calculators/CashOutRefiCalculator.jsx";
import { calcBySlug } from "../data/calculators.js";
import { bySlug as programBySlug } from "../data/programs.js";
import { guideBySlug } from "../data/guides.js";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function CalculatorDetail({ slug }) {
  const c = calcBySlug[slug];
  if (!c) return <Navigate to="/calculators" replace />;

  const program = c.relatedProgram ? programBySlug[c.relatedProgram] : null;
  const guide = c.relatedGuide ? guideBySlug[c.relatedGuide] : null;

  return (
    <div>
      <Header />
      <JsonLd id={`breadcrumb-calc-${slug}`} data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Calculators", path: "/calculators" },
        { name: c.h1, path: `/calculators/${slug}` },
      ])} />
      <JsonLd id={`faq-calc-${slug}`} data={faqPageSchema(c.faqs)} />

      {/* Hero — compact so the calculator itself is in the first mobile viewport.
          The longer explainer moves below the tool. */}
      <section className="sec calc-hero" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "48px 32px 12px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 10 }}>Free investor tool</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(30px,4.4vw,52px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 8px" }}>{c.h1}</h1>
          <p style={{ fontSize: 18, fontWeight: 600, color: "#1A56C4", margin: 0 }}>{c.tagline}</p>
        </div>
      </section>

      {/* Calculator — sits right under the compact hero so it's usable immediately */}
      <section className="sec calc-section" style={{ background: "#fff", padding: "16px 32px 36px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {c.kind === "dscr" && <DscrCalculator />}
          {c.kind === "fixflip" && <FixFlipCalculator />}
          {c.kind === "brrrr" && <BrrrrCalculator />}
          {c.kind === "hardmoneycost" && <HardMoneyCostCalculator />}
          {c.kind === "caprate" && <CapRateCalculator />}
          {c.kind === "cashout" && <CashOutRefiCalculator />}
          <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#667085", margin: "20px 0 0", maxWidth: 720 }}>
            Inputs are pre-filled with example figures, edit them to match your deal. Estimates only, for planning purposes, and not a rate quote, an offer, or a commitment to lend. Your actual rate and terms depend on a full review of your deal.
          </p>
        </div>
      </section>

      {/* Explainer — moved below the tool so the calculator leads on mobile */}
      <section className="sec" style={{ background: "#fff", padding: "8px 32px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#475467", margin: 0 }}>{c.intro}</p>
        </div>
      </section>

      {/* Related links */}
      {(program || guide) && (
        <section className="sec" style={{ background: "#F6F8FB", padding: "36px 32px" }}>
          <div className="calc-related" style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: program && guide ? "1fr 1fr" : "1fr", gap: 16 }}>
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

      <CtaBand title="Numbers work? Let's fund it." text="Get a real rate in minutes. No obligation, no hard credit pull to start." />
      <Footer />
    </div>
  );
}
