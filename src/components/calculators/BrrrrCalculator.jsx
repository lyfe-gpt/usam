import { useMemo } from "react";
import { NumberField, InputCard, ResultPanel, Row, fmt, pct, monthlyPI, useNum, num, applyUrl } from "./fields.jsx";

// BRRRR = Buy, Rehab, Rent, Refinance, Repeat. The number that matters is how
// much cash you pull back out at the refi vs. how much stays trapped in the deal.
export default function BrrrrCalculator() {
  const [purchase, setPurchase] = useNum(180000);
  const [rehab, setRehab] = useNum(55000);
  const [holding, setHolding] = useNum(12000);
  const [arv, setArv] = useNum(320000);
  const [refiLtv, setRefiLtv] = useNum(75);
  const [rate, setRate] = useNum(7); // editable placeholder for a 30-yr amortizing refi; not an advertised rate
  const [amort, setAmort] = useNum(30);
  const [rent, setRent] = useNum(2350);
  const [opex, setOpex] = useNum(520);

  const r = useMemo(() => {
    const P = num(purchase), R = num(rehab), H = num(holding), A = num(arv);
    const L = num(refiLtv), RT = num(rate), AM = num(amort), RN = num(rent), OP = num(opex);
    const invested = P + R + H;
    const refiLoan = A * (L / 100);
    const pulledOut = Math.min(refiLoan, invested);
    const leftIn = Math.max(0, invested - refiLoan);
    const pi = monthlyPI(refiLoan, RT, AM);
    const cashFlow = RN - pi - OP;
    const annualCF = cashFlow * 12;
    const coc = leftIn > 0 ? (annualCF / leftIn) * 100 : (invested > 0 ? Infinity : 0);
    return { invested, refiLoan, pulledOut, leftIn, pi, cashFlow, coc };
  }, [purchase, rehab, holding, arv, refiLtv, rate, amort, rent, opex]);

  const full = r.leftIn <= 0;
  const href = applyUrl("fix-flip", { purchase, rehab, arv, monthlyRent: rent });
  return (
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      <InputCard>
        <NumberField label="Purchase price" prefix="$" value={purchase} onChange={setPurchase} step={5000} />
        <NumberField label="Rehab budget" prefix="$" value={rehab} onChange={setRehab} step={2500} />
        <NumberField label="Holding costs" prefix="$" value={holding} onChange={setHolding} step={1000} />
        <NumberField label="After-repair value" prefix="$" value={arv} onChange={setArv} step={5000} />
        <NumberField label="Refinance LTV" suffix="%" value={refiLtv} onChange={setRefiLtv} step={1} max={100} />
        <NumberField label="New loan rate" suffix="%" value={rate} onChange={setRate} step={0.125} />
        <NumberField label="Amortization" suffix="yrs" value={amort} onChange={setAmort} step={5} />
        <NumberField label="Monthly rent" prefix="$" value={rent} onChange={setRent} step={50} />
        <NumberField label="Monthly expenses" prefix="$" value={opex} onChange={setOpex} step={25} />
      </InputCard>

      <ResultPanel
        eyebrow="Cash left in the deal"
        figure={full ? "$0" : fmt(r.leftIn)}
        figureColor={full ? "#6EE7A8" : "#fff"}
        pill={full ? "Full BRRRR — all capital recovered" : `${fmt(r.pulledOut)} pulled back out`}
        pillColor={full ? "#067647" : "#123E96"}
        note={full
          ? "The refinance returns all the cash you put in. Infinite cash-on-cash — repeat the process."
          : `You recover ${fmt(r.pulledOut)} at refinance and leave ${fmt(r.leftIn)} in the deal.`}
        cta="Fund my BRRRR"
        ctaHref={href}
      >
        <Row label="Total invested" value={fmt(r.invested)} />
        <Row label="Refinance loan (ARV × LTV)" value={fmt(r.refiLoan)} />
        <Row label="New monthly payment" value={fmt(r.pi)} />
        <Row label="Monthly cash flow" value={fmt(r.cashFlow)} accent={r.cashFlow >= 0 ? "#6EE7A8" : "#FCA5A5"} />
        <Row label="Cash-on-cash return" value={full ? "Infinite" : pct(r.coc)} accent="#6FA0F0" />
      </ResultPanel>
    </div>
  );
}
