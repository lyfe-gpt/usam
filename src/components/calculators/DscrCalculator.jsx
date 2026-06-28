import { useMemo } from "react";
import { NumberField, InputCard, Row, fmt, monthlyPI, useNum, num, SCH } from "./fields.jsx";

export default function DscrCalculator() {
  const [rent, setRent] = useNum(2400);
  const [loan, setLoan] = useNum(225000);
  const [rate, setRate] = useNum(7.75);
  const [amort, setAmort] = useNum(30);
  const [taxes, setTaxes] = useNum(320);
  const [insurance, setInsurance] = useNum(120);
  const [hoa, setHoa] = useNum(0);

  const { dscr, pi, pitia, cashFlow, verdict, color } = useMemo(() => {
    const RN = num(rent), LN = num(loan), RT = num(rate), AM = num(amort), TX = num(taxes), IN = num(insurance), HO = num(hoa);
    const pi = monthlyPI(LN, RT, AM);
    const pitia = pi + TX + IN + HO;
    const dscr = pitia > 0 ? RN / pitia : 0;
    const cashFlow = RN - pitia;
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
      <InputCard>
        <NumberField label="Monthly rent" prefix="$" value={rent} onChange={setRent} step={50} />
        <NumberField label="Loan amount" prefix="$" value={loan} onChange={setLoan} step={1000} />
        <NumberField label="Interest rate" suffix="%" value={rate} onChange={setRate} step={0.125} />
        <NumberField label="Amortization" suffix="yrs" value={amort} onChange={setAmort} step={5} />
        <NumberField label="Monthly taxes" prefix="$" value={taxes} onChange={setTaxes} step={10} />
        <NumberField label="Monthly insurance" prefix="$" value={insurance} onChange={setInsurance} step={10} />
        <NumberField label="Monthly HOA" prefix="$" value={hoa} onChange={setHoa} step={10} />
      </InputCard>

      {/* Result (custom: oversized DSCR figure) */}
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

        <a href="/apply" style={{ display: "block", textAlign: "center", marginTop: 22, background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 20px", borderRadius: 999 }}>
          Get a real rate
        </a>
      </div>
    </div>
  );
}
