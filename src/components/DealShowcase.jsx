import { Link } from "react-router-dom";
import { SHOW_DEALS, deals } from "../data/deals.js";

const SCH = "'Schibsted Grotesk',sans-serif";

// Renders the closed-deal proof grid. Returns null until SHOW_DEALS is flipped
// on (i.e. once real, publishable deals replace the placeholder data), so the
// site never advertises fabricated transactions.
export default function DealShowcase() {
  if (!SHOW_DEALS || !deals.length) return null;

  return (
    <section className="sec" style={{ background: "#fff", padding: "8px 32px 64px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Recently funded</div>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(32px,3.8vw,46px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>Deals we've closed.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "#475467", margin: 0 }}>A sample of real investor financing across our programs. Your deal could be next.</p>
        </div>

        <div className="deal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {deals.map((d, i) => (
            <div key={i} style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "#0E1A2B" }}>{d.location}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#067647", background: "#ECFDF3", border: "1px solid #ABEFC6", padding: "3px 10px", borderRadius: 999 }}>{d.days}</span>
              </div>
              <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 30, color: "#1A56C4", letterSpacing: "-0.02em", marginBottom: 4 }}>{d.metric}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0E1A2B", marginBottom: 4 }}>{d.program}</div>
              <div style={{ fontSize: 13.5, color: "#667085" }}>{d.detail}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12.5, color: "#667085", margin: "18px 0 0" }}>
          Representative closed transactions. Loan amounts and timelines vary by deal.{" "}
          <Link to="/apply" style={{ color: "#1A56C4", fontWeight: 700 }}>Get your rate.</Link>
        </p>
      </div>
    </section>
  );
}
