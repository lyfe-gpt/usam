// Shared building blocks for every calculator widget: the number input, the
// result-row, the dark result panel shell, and currency/percent formatters.
// Keeps the six calculators consistent and avoids re-defining these per file.
import { useState, useEffect, Fragment } from "react";

export const SCH = "'Schibsted Grotesk',sans-serif";

// True when the viewport is phone-width. Drives the mobile-only calculator
// layout (sticky compact result + collapsed "more details"); desktop is left
// untouched. Updates live on resize/orientation change.
export function useIsMobile(bp = 640) {
  const query = `(max-width: ${bp}px)`;
  // Start false on the first render so it matches the prerendered/desktop HTML
  // (avoids React hydration mismatches), then resolve the real viewport after
  // mount. Mobile users briefly see the desktop layout, then it switches.
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setM(e.matches);
    setM(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return m;
}

// Compact, mobile-only result bar pinned just under the header so the headline
// number and the apply CTA stay in view while the visitor edits inputs below.
// The full result panel still renders (with the breakdown) lower on the page.
export function StickyResult({ label, value, valueColor = "#fff", pill, pillColor, cta = "Apply", ctaHref = "/apply" }) {
  return (
    <div style={{ position: "sticky", top: 56, zIndex: 30, background: "linear-gradient(160deg,#0E1A2B,#15294A)", borderRadius: 14, padding: "11px 14px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, boxShadow: "0 8px 22px rgba(14,26,43,0.22)" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#6FA0F0", marginBottom: 3 }}>{label}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: SCH, fontWeight: 800, fontSize: 26, lineHeight: 1, letterSpacing: "-0.02em", color: valueColor }}>{value}</span>
          {pill && <span style={{ fontSize: 11.5, fontWeight: 700, color: pillColor || "#0E1A2B", background: "#fff", padding: "2px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{pill}</span>}
        </div>
      </div>
      <a href={ctaHref} style={{ flex: "none", background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 14, padding: "10px 16px", borderRadius: 999, whiteSpace: "nowrap" }}>{cta}</a>
    </div>
  );
}

// Mobile-only multi-step input wizard: shows one small group of fields at a time
// with Back/Next and tappable progress dots, so the calculator fits a phone
// screen while the live result (StickyResult) stays pinned above. On desktop it's
// a no-op: every field renders inline in the inputs grid, exactly as before.
// `steps` is [{ title, content }] where content is a fragment of NumberFields.
export function Wizard({ mobile, steps }) {
  const [i, setI] = useState(0);
  if (!mobile) return steps.map((s, k) => <Fragment key={k}>{s.content}</Fragment>);
  const idx = Math.min(i, steps.length - 1);
  const step = steps[idx];
  const first = idx === 0;
  const last = idx === steps.length - 1;
  const backBtn = { flex: "none", background: "#fff", color: "#0E1A2B", border: "1.5px solid #D6DDE8", borderRadius: 999, padding: "12px 20px", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" };
  const nextBtn = { flex: 1, background: "#1A56C4", color: "#fff", border: "none", borderRadius: 999, padding: "12px 20px", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" };
  return (
    <div style={{ gridColumn: "1 / -1" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontFamily: SCH, fontSize: 16, fontWeight: 700, color: "#0E1A2B" }}>{step.title}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#667085" }}>Step {idx + 1} of {steps.length}</span>
      </div>
      <div style={{ display: "grid", gap: 16 }}>{step.content}</div>
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        {!first && <button type="button" onClick={() => setI(idx - 1)} style={backBtn}>Back</button>}
        {!last && <button type="button" onClick={() => setI(idx + 1)} style={nextBtn}>Next</button>}
        {last && <div style={{ flex: 1, textAlign: "center", alignSelf: "center", fontSize: 13.5, fontWeight: 700, color: "#0E7C4A" }}>All set — your result is up top</div>}
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16 }}>
        {steps.map((_, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setI(k)}
            aria-label={`Go to step ${k + 1}`}
            style={{ width: k === idx ? 22 : 8, height: 8, borderRadius: 999, border: "none", padding: 0, cursor: "pointer", background: k === idx ? "#1A56C4" : "#D6DDE8", transition: "width .2s ease" }}
          />
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  fontFamily: "inherit",
  fontSize: 16,
  padding: "11px 13px",
  border: "1.5px solid #D6DDE8",
  borderRadius: 10,
  color: "#0E1A2B",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

// Coalesce a possibly-empty (NaN) field value to 0 for math. Use in every
// calculator's useMemo so a blank field computes cleanly instead of as NaN.
export const num = (x) => (Number.isFinite(x) ? x : 0);

// Number input with an optional $ prefix or % / unit suffix. An empty field is
// allowed (stored as NaN, shown blank) so clearing it lets you type fresh rather
// than fighting a stuck "0"; negatives are clamped to 0; an optional max clamps
// percentage fields. Pair with num() in the calculator's math.
export function NumberField({ label, prefix, suffix, value, onChange, step = 1, max }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#475467" }}>{label}</span>
      <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && <span style={{ position: "absolute", left: 13, color: "#667085", fontSize: 16 }}>{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min="0"
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return onChange(NaN); // allow a blank field while typing
            let v = parseFloat(raw);
            if (!Number.isFinite(v)) return onChange(NaN);
            v = Math.max(0, v); // never negative
            // Cap every field: explicit `max` for percentages, else a sane $10B
            // ceiling. Keeps values well under 1e21 so sums/products never overflow
            // to Infinity and labels never render in scientific notation.
            const cap = Number.isFinite(max) ? max : 1e10;
            v = Math.min(cap, v);
            onChange(v);
          }}
          style={{ ...inputStyle, paddingLeft: prefix ? 26 : 13, paddingRight: suffix ? 40 : 13 }}
        />
        {suffix && <span style={{ position: "absolute", right: 13, color: "#667085", fontSize: 15 }}>{suffix}</span>}
      </span>
    </label>
  );
}

export const fmt = (n) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const pct = (n) => `${(Number.isFinite(n) ? n : 0).toFixed(1)}%`;

// Build an /apply deep link that carries the program + the figures the visitor
// already entered, so the apply flow can prefill them. Only positive finite
// values are passed (blank/zero fields are skipped). Field keys must match the
// apply form's keys (purchase, rehab, arv, monthlyRent, loanAmount, noi).
export function applyUrl(program, fields = {}) {
  const p = new URLSearchParams();
  if (program) p.set("program", program);
  for (const [k, v] of Object.entries(fields)) {
    if (Number.isFinite(v) && v > 0) p.set(k, String(Math.round(v)));
  }
  return `/apply?${p.toString()}`;
}

// One line in the result panel's breakdown.
export function Row({ label, value, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 14.5 }}>
      <span style={{ color: "#AEB9C9" }}>{label}</span>
      <span style={{ fontWeight: 700, color: accent || "#fff" }}>{value}</span>
    </div>
  );
}

// The dark, sticky result panel shell: eyebrow, big headline figure, an optional
// pill, optional supporting note, a breakdown (children), and an apply CTA.
export function ResultPanel({ eyebrow, figure, figureColor = "#fff", pill, pillColor, note, children, cta = "Get a real rate", ctaHref = "/apply" }) {
  return (
    <div style={{ background: "linear-gradient(160deg,#0E1A2B,#15294A)", borderRadius: 16, padding: 26, color: "#fff", position: "sticky", top: 96 }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6FA0F0" }}>{eyebrow}</div>
      <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 46, lineHeight: 1, letterSpacing: "-0.02em", margin: "8px 0 4px", color: figureColor }}>{figure}</div>
      {pill && (
        <div style={{ display: "inline-block", fontSize: 13.5, fontWeight: 700, color: pillColor || "#123E96", background: "#fff", padding: "5px 12px", borderRadius: 999, marginBottom: note ? 14 : 18 }}>{pill}</div>
      )}
      {note && <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#C4D2E8", margin: "0 0 20px" }}>{note}</p>}
      <div style={{ borderTop: "1px solid #21324A", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
      <a href={ctaHref} style={{ display: "block", textAlign: "center", marginTop: 22, background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 20px", borderRadius: 999 }}>{cta}</a>
    </div>
  );
}

// The white inputs card. `children` is the grid of NumberFields.
export function InputCard({ children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, padding: 26 }}>
      <div className="calc-inputs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>
    </div>
  );
}

// Standard amortized monthly payment (principal + interest).
export function monthlyPI(loan, annualRatePct, years) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (loan <= 0 || n <= 0) return 0;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

// Small helper so each calculator can manage its own number state tersely.
export function useNum(initial) {
  return useState(initial);
}
