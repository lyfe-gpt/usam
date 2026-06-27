import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { bySlug as programBySlug } from "../data/programs.js";

const SCH = "'Schibsted Grotesk',sans-serif";

// Guided program finder. NOT a credit decision or pre-approval — it maps a few
// answers to the most likely program and hands off to the apply flow (where the
// real, consented lead capture lives). Kept fully client-side.
const STEPS = [
  {
    key: "goal",
    q: "What are you financing?",
    options: [
      { label: "Flipping a property", value: "flip" },
      { label: "A rental to buy and hold", value: "rental" },
      { label: "Ground-up construction", value: "build" },
      { label: "A short-term bridge", value: "bridge" },
      { label: "Cash-out of a property I own", value: "cashout" },
      { label: "A commercial property", value: "commercial" },
    ],
  },
  {
    key: "type",
    q: "What type of property?",
    options: [
      { label: "Single-family or 1-4 units", value: "residential" },
      { label: "Multifamily (5+ units)", value: "multi" },
      { label: "Commercial / mixed-use", value: "commercial" },
    ],
  },
  {
    key: "timeline",
    q: "How soon do you need to close?",
    options: [
      { label: "As fast as possible", value: "asap" },
      { label: "Within a few weeks", value: "weeks" },
      { label: "Just exploring", value: "exploring" },
    ],
  },
];

// Map answers to the best-fit program slug. Property type can override the goal
// for commercial/multifamily deals.
function recommend(a) {
  if (a.type === "commercial" || a.goal === "commercial") return "cre-permanent";
  if (a.type === "multi" && a.goal === "bridge") return "cre-bridge";
  switch (a.goal) {
    case "flip": return "fix-flip";
    case "rental": return "rental-dscr";
    case "build": return "construction";
    case "bridge": return "cre-bridge";
    case "cashout": return "rental-dscr";
    default: return "rental-dscr";
  }
}

export default function QualifyQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= STEPS.length;

  const rec = useMemo(() => (done ? programBySlug[recommend(answers)] : null), [done, answers]);

  function choose(key, value) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  }

  const pct = Math.round((Math.min(step, STEPS.length) / STEPS.length) * 100);

  if (done && rec) {
    const applyTo = `/apply?program=${rec.slug}`;
    return (
      <div style={{ maxWidth: 620, margin: "0 auto", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 18, padding: "34px 30px", textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 10 }}>Your likely fit</div>
        <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3.4vw,36px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 10px" }}>{rec.title}</h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "#475467", margin: "0 0 24px" }}>{rec.tagline} Based on your answers, this is the program most investors in your situation use. A quick conversation confirms the fit.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to={applyTo} className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "15px 28px", borderRadius: 999 }}>Get my rate</Link>
          <Link to={`/programs/${rec.slug}`} className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 26px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>See the program</Link>
        </div>
        <button
          onClick={() => { setStep(0); setAnswers({}); }}
          style={{ marginTop: 20, background: "none", border: "none", color: "#667085", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}
        >
          Start over
        </button>
        <p style={{ fontSize: 12.5, color: "#8A97A8", margin: "18px 0 0" }}>
          A suggestion, not an offer, a quote, or a credit decision. Actual terms depend on a full review of your deal.
        </p>
      </div>
    );
  }

  const cur = STEPS[step];
  return (
    <div style={{ maxWidth: 620, margin: "0 auto", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 18, padding: "30px 30px 34px" }}>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#667085" }}>Step {step + 1} of {STEPS.length}</span>
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} style={{ background: "none", border: "none", color: "#1A56C4", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Back</button>
        )}
      </div>
      <div style={{ height: 6, background: "#EEF1F5", borderRadius: 999, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "#1A56C4", transition: "width .2s ease" }} />
      </div>

      <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(22px,2.8vw,30px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "#0E1A2B", margin: "0 0 20px" }}>{cur.q}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {cur.options.map((o) => (
          <button
            key={o.value}
            onClick={() => choose(cur.key, o.value)}
            className="quiz-opt"
            style={{ textAlign: "left", background: "#F6F8FB", border: "1.5px solid #E6E9EF", borderRadius: 12, padding: "16px 18px", fontSize: 16, fontWeight: 600, color: "#0E1A2B", cursor: "pointer", fontFamily: "inherit", transition: "all .14s ease" }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
