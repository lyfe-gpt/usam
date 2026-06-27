import { useState, useMemo } from "react";

const SCH = "'Schibsted Grotesk',sans-serif";

// Monthly principal + interest via the standard amortization formula.
function monthlyPI(loan, annualRatePct, years) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (loan <= 0 || n <= 0) return 0;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

const fieldWrap = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle = { fontSize: 13.5, fontWeight: 600, color: "#475467" };
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

function NumberField({ label, prefix, suffix, value, onChange, step = 1 }) {
  return (
    <label style={fieldWrap}>
      <span style={labelStyle}>{label}</span>
      <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && <span style={{ position: "absolute", left: 13, color: "#667085", fontSize: 16 }}>{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
          style={{ ...inputStyle, paddingLeft: prefix ? 26 : 13, paddingRight: suffix ? 36 : 13 }}
        />
        {suffix && <span style={{ position: "absolute", right: 13, color: "#667085", fontSize: 15 }}>{suffix}</span>}
      </span>
    </label>
  );
}

const fmt = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function DscrCalculator() {
  const [rent, setRent] = useState(2400);
  const [loan, setLoan] = useState(225000);
  const [rate, setRate] = useState(7.75);
  const [amort, setAmort] = useState(30);
  const [taxes, setTaxes] = useState(320);
  const [insurance, setInsurance] = useState(120);
  const [hoa, setHoa] = useState(0);

  const { dscr, pi, pitia, cashFlow, verdict, color } = useMemo(() => {
    const pi = monthlyPI(loan, rate, amort);
    const pitia = pi + taxes + insurance + hoa;
    const dscr = pitia > 0 ? rent / pitia : 0;
    const cashFlow = rent - pitia;
    let verdict, color;
    if (dscr >= 1.25) {
      verdict = "Strong. This ratio typically qualifies for the best pricing.";
      color = "#0E7C4A";
    } else if (dscr >= 1.0) {
      verdict = "Qualifies. The rent covers the payment; most lenders fund here.";
      color = "#1A56C4";
    } else if (dscr > 0) {
      verdict = "Below 1.0. May still fund at lower leverage, with reserves, or under a no-ratio program.";
      color = "#B54708";
    } else {
      verdict = "Enter your numbers above to see the ratio.";
      color = "#667085";
    }
    return { dscr, pi, pitia, cashFlow, verdict, color };
  }, [rent, loan, rate, amort, taxes, insurance, hoa]);

  return (
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      {/* Inputs */}
      <div style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, padding: 26 }}>
        <div className="calc-inputs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <NumberField label="Monthly rent" prefix="$" value={rent} onChange={setRent} step={50} />
          <NumberField label="Loan amount" prefix="$" value={loan} onChange={setLoan} step={1000} />
          <NumberField label="Interest rate" suffix="%" value={rate} onChange={setRate} step={0.125} />
          <NumberField label="Amortization" suffix="yrs" value={amort} onChange={setAmort} step={5} />
          <NumberField label="Monthly taxes" prefix="$" value={taxes} onChange={setTaxes} step={10} />
          <NumberField label="Monthly insurance" prefix="$" value={insurance} onChange={setInsurance} step={10} />
          <NumberField label="Monthly HOA" prefix="$" value={hoa} onChange={setHoa} step={10} />
        </div>
      </div>

      {/* Result */}
      <div style={{ background: "linear-gradient(160deg,#0E1A2B,#15294A)", borderRadius: 16, padding: 26, color: "#fff", position: "sticky", top: 96 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6FA0F0" }}>Your DSCR</div>
        <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em", margin: "8px 0 4px" }}>
          {dscr > 0 ? dscr.toFixed(2) : "--"}
        </div>
        <div style={{ display: "inline-block", fontSize: 13.5, fontWeight: 700, color, background: "#fff", padding: "5px 12px", borderRadius: 999, marginBottom: 18 }}>
          {dscr >= 1.25 ? "Strong" : dscr >= 1.0 ? "Qualifies" : dscr > 0 ? "Below 1.0" : "—"}
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#C4D2E8", margin: "0 0 20px" }}>{verdict}</p>

        <div style={{ borderTop: "1px solid #21324A", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <Row label="Principal + interest" value={fmt(pi)} />
          <Row label="Total payment (PITIA)" value={fmt(pitia)} />
          <Row label="Monthly cash flow" value={fmt(cashFlow)} accent={cashFlow >= 0 ? "#6EE7A8" : "#FCA5A5"} />
        </div>

        <a
          href="/apply"
          style={{ display: "block", textAlign: "center", marginTop: 22, background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 20px", borderRadius: 999 }}
        >
          Get a real rate
        </a>
      </div>
    </div>
  );
}

function Row({ label, value, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 14.5 }}>
      <span style={{ color: "#AEB9C9" }}>{label}</span>
      <span style={{ fontWeight: 700, color: accent || "#fff" }}>{value}</span>
    </div>
  );
}
