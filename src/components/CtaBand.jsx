import { Link } from "react-router-dom";

const SCH = "'Schibsted Grotesk',sans-serif";

// The blue gradient call-to-action band. `withPhone` adds the secondary phone
// button; `uClass` applies the Home page's responsive padding rules.
export default function CtaBand({
  title,
  text,
  maxWidth = 1140,
  padding = "56px 48px",
  titleClamp = "clamp(28px,3.4vw,40px)",
  withPhone = true,
  uClass = false,
}) {
  return (
    <section className="sec" style={{ background: "#fff", padding: "48px 32px 48px" }}>
      <div
        className={uClass ? "u-cta" : undefined}
        style={{ maxWidth, margin: "0 auto", background: "linear-gradient(120deg,#123E96 0%,#1A56C4 100%)", borderRadius: 24, padding, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap", boxShadow: "0 24px 60px -24px rgba(26,86,196,0.55)" }}
      >
        <div style={{ maxWidth: 560 }}>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: titleClamp, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 12px" }}>{title}</h2>
          <p style={{ fontSize: 18, lineHeight: 1.5, color: "#D6E2FA", margin: 0 }}>{text}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: withPhone ? 14 : 16, flexWrap: "wrap" }}>
          <Link to="/apply" className="btn-white" style={{ background: "#fff", color: "#123E96", textDecoration: "none", fontWeight: 800, fontSize: 17, padding: "17px 32px", borderRadius: 999 }}>Get my rate</Link>
          {withPhone && (
            <a href="tel:512-488-6087" className="btn-ghost-light" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "16px 28px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.5)" }}>512-488-6087</a>
          )}
        </div>
      </div>
    </section>
  );
}
