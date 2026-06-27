import { useMemo } from "react";
import { NumberField, InputCard, ResultPanel, Row, fmt, pct, useNum } from "./fields.jsx";

// What a hard-money loan actually costs: origination points + interest over the
// hold + flat fees, plus a rough annualized cost rate so it's comparable.
export default function HardMoneyCostCalculator() {
  const [loan, setLoan] = useNum(300000);
  const [rate, setRate] = useNum(10.5);
  const [points, setPoints] = useNum(2);
  const [months, setMonths] = useNum(9);
  const [fees, setFees] = useNum(1500);

  const r = useMemo(() => {
    const origination = loan * (points / 100);
    const monthlyInterest = (loan * (rate / 100)) / 12; // interest-only, typical for HML
    const totalInterest = monthlyInterest * months;
    const allIn = origination + totalInterest + fees;
    // Rough annualized cost of capital: total cost as a share of loan, per year.
    const effAnnual = loan > 0 && months > 0 ? (allIn / loan) / (months / 12) * 100 : 0;
    return { origination, monthlyInterest, totalInterest, allIn, effAnnual };
  }, [loan, rate, points, months, fees]);

  return (
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      <InputCard>
        <NumberField label="Loan amount" prefix="$" value={loan} onChange={setLoan} step={5000} />
        <NumberField label="Interest rate" suffix="%" value={rate} onChange={setRate} step={0.25} />
        <NumberField label="Points (origination)" suffix="%" value={points} onChange={setPoints} step={0.25} />
        <NumberField label="Loan term" suffix="mo" value={months} onChange={setMonths} step={1} />
        <NumberField label="Other fees" prefix="$" value={fees} onChange={setFees} step={250} />
      </InputCard>

      <ResultPanel
        eyebrow="Total cost of the loan"
        figure={fmt(r.allIn)}
        pill={`${pct(r.effAnnual)} effective annual cost`}
        note={`Over a ${months}-month hold, interest-only. The shorter you hold, the less interest you pay — points and fees are fixed.`}
        cta="Get my rate"
      >
        <Row label={`Origination (${points}%)`} value={fmt(r.origination)} />
        <Row label="Monthly interest (interest-only)" value={fmt(r.monthlyInterest)} />
        <Row label={`Total interest (${months} mo)`} value={fmt(r.totalInterest)} />
        <Row label="Other fees" value={fmt(fees)} />
        <Row label="All-in cost" value={fmt(r.allIn)} accent="#6FA0F0" />
      </ResultPanel>
    </div>
  );
}
