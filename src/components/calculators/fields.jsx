// Shared building blocks for every calculator widget: the number input, the
// result-row, the dark result panel shell, and currency/percent formatters.
// Keeps the six calculators consistent and avoids re-defining these per file.
import { useState } from "react";

export const SCH = "'Schibsted Grotesk',sans-serif";

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
export function ResultPanel({ eyebrow, figure, figureColor = "#fff", pill, pillColor, note, children, cta = "Get a real rate" }) {
  return (
    <div style={{ background: "linear-gradient(160deg,#0E1A2B,#15294A)", borderRadius: 16, padding: 26, color: "#fff", position: "sticky", top: 96 }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6FA0F0" }}>{eyebrow}</div>
      <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 46, lineHeight: 1, letterSpacing: "-0.02em", margin: "8px 0 4px", color: figureColor }}>{figure}</div>
      {pill && (
        <div style={{ display: "inline-block", fontSize: 13.5, fontWeight: 700, color: pillColor || "#123E96", background: "#fff", padding: "5px 12px", borderRadius: 999, marginBottom: note ? 14 : 18 }}>{pill}</div>
      )}
      {note && <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#C4D2E8", margin: "0 0 20px" }}>{note}</p>}
      <div style={{ borderTop: "1px solid #21324A", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
      <a href="/apply" style={{ display: "block", textAlign: "center", marginTop: 22, background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 20px", borderRadius: 999 }}>{cta}</a>
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
