import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { calculators } from "../data/calculators.js";

const SCH = "'Schibsted Grotesk',sans-serif";

// Blue CTA band that points a program page at its own calculator(s). Renders
// nothing for programs without a related calculator. Placed above the FAQ.
export default function CalculatorCta({ programSlug, programTitle }) {
  const calcs = calculators.filter((c) => c.relatedProgram === programSlug);
  if (calcs.length === 0) return null;
  const primary = calcs[0];
  const extras = calcs.slice(1);

  return (
    <section className="sec" style={{ background: "#fff", padding: "8px 32px 24px" }}>
      <div
        style={{ maxWidth: 1080, margin: "0 auto", background: "linear-gradient(120deg,#123E96 0%,#1A56C4 100%)", borderRadius: 24, padding: "40px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", boxShadow: "0 24px 60px -24px rgba(26,86,196,0.55)" }}
      >
        <div style={{ maxWidth: 560 }}>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 10px" }}>
            Run your {programTitle} numbers.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: "#D6E2FA", margin: 0 }}>
            Pressure-test the deal in seconds with our free {primary.title.toLowerCase()}, no sign-up required.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Link to={`/calculators/${primary.slug}`} className="btn-white" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#123E96", textDecoration: "none", fontWeight: 800, fontSize: 16, padding: "15px 28px", borderRadius: 999 }}>
            Open the {primary.title.replace(" Calculator", "")} calculator
            <Icon name="chevronRight" size={16} color="#123E96" width={2.6} />
          </Link>
        </div>
      </div>

      {extras.length > 0 && (
        <div style={{ maxWidth: 1080, margin: "12px auto 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#667085", alignSelf: "center" }}>More tools:</span>
          {extras.map((c) => (
            <Link key={c.slug} to={`/calculators/${c.slug}`} className="card-link" style={{ fontSize: 14, fontWeight: 700, color: "#1A56C4", background: "#EEF3FC", border: "1px solid #DCE6F9", padding: "8px 14px", borderRadius: 999, textDecoration: "none" }}>
              {c.title.replace(" Calculator", "")}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
