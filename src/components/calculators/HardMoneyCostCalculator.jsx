import { useMemo } from "react";
import { NumberField, InputCard, ResultPanel, Row, fmt, pct, useNum, num, applyUrl, useIsMobile, StickyResult, Wizard } from "./fields.jsx";

// What a hard-money loan actually costs: origination points + interest over the
// hold + flat fees, plus a rough annualized cost rate so it's comparable.
export default function HardMoneyCostCalculator() {
  const mobile = useIsMobile();
  const [loan, setLoan] = useNum(300000);
  const [rate, setRate] = useNum(7.99); // USAM fix/flip hard-money rates from 7.99%
  const [points, setPoints] = useNum(2);
  const [months, setMonths] = useNum(9);
  const [fees, setFees] = useNum(1500);

  const r = useMemo(() => {
    const LN = num(loan), RT = num(rate), PT = num(points), MO = num(months), FE = num(fees);
    const origination = LN * (PT / 100);
    const monthlyInterest = (LN * (RT / 100)) / 12; // interest-only, typical for HML
    const totalInterest = monthlyInterest * MO;
    const allIn = origination + totalInterest + FE;
    // Rough annualized cost of capital: total cost as a share of loan, per year.
    const effAnnual = LN > 0 && MO > 0 ? (allIn / LN) / (MO / 12) * 100 : 0;
    return { origination, monthlyInterest, totalInterest, allIn, effAnnual };
  }, [loan, rate, points, months, fees]);

  return (
    <>
    {mobile && (
      <StickyResult
        label="Total cost of the loan"
        value={fmt(r.allIn)}
        pill={`${pct(r.effAnnual)} eff.`}
        cta="Get my rate"
        ctaHref={applyUrl("fix-flip", { loanAmount: loan })}
      />
    )}
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      <InputCard>
        <Wizard mobile={mobile} steps={[
          { title: "Loan", content: <>
            <NumberField label="Loan amount" prefix="$" value={loan} onChange={setLoan} step={5000} />
            <NumberField label="Interest rate" suffix="%" value={rate} onChange={setRate} step={0.25} />
          </> },
          { title: "Terms & fees", content: <>
            <NumberField label="Points (origination)" suffix="%" value={points} onChange={setPoints} step={0.25} />
            <NumberField label="Loan term" suffix="mo" value={months} onChange={setMonths} step={1} />
            <NumberField label="Other fees" prefix="$" value={fees} onChange={setFees} step={250} />
          </> },
        ]} />
      </InputCard>

      <ResultPanel
        eyebrow="Total cost of the loan"
        figure={fmt(r.allIn)}
        pill={`${pct(r.effAnnual)} effective annual cost`}
        note={`Over a ${num(months)}-month hold, interest-only. The shorter you hold, the less interest you pay, points and fees are fixed.`}
        cta="Get my rate"
        ctaHref={applyUrl("fix-flip", { loanAmount: loan })}
      >
        <Row label={`Origination (${num(points)}%)`} value={fmt(r.origination)} />
        <Row label="Monthly interest (interest-only)" value={fmt(r.monthlyInterest)} />
        <Row label={`Total interest (${num(months)} mo)`} value={fmt(r.totalInterest)} />
        <Row label="Other fees" value={fmt(fees)} />
        <Row label="All-in cost" value={fmt(r.allIn)} accent="#6FA0F0" />
      </ResultPanel>
    </div>
    </>
  );
}
