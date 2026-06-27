import { useMemo } from "react";
import { NumberField, InputCard, ResultPanel, Row, fmt, pct, monthlyPI, useNum } from "./fields.jsx";

// Cap rate + cash flow + cash-on-cash for a rental. Cap rate is unlevered
// (NOI / price); cash-on-cash factors in the financing.
export default function CapRateCalculator() {
  const [price, setPrice] = useNum(310000);
  const [rent, setRent] = useNum(2600);
  const [vacancy, setVacancy] = useNum(5);
  const [opex, setOpex] = useNum(9200);
  const [down, setDown] = useNum(20);
  const [rate, setRate] = useNum(7.75);
  const [amort, setAmort] = useNum(30);

  const r = useMemo(() => {
    const egi = rent * 12 * (1 - vacancy / 100); // effective gross income
    const noi = egi - opex;
    const capRate = price > 0 ? (noi / price) * 100 : 0;
    const loan = price * (1 - down / 100);
    const cashInvested = price - loan;
    const annualDebt = monthlyPI(loan, rate, amort) * 12;
    const annualCF = noi - annualDebt;
    const coc = cashInvested > 0 ? (annualCF / cashInvested) * 100 : 0;
    return { egi, noi, capRate, loan, cashInvested, annualCF, coc, monthlyCF: annualCF / 12 };
  }, [price, rent, vacancy, opex, down, rate, amort]);

  return (
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      <InputCard>
        <NumberField label="Purchase price" prefix="$" value={price} onChange={setPrice} step={5000} />
        <NumberField label="Monthly rent" prefix="$" value={rent} onChange={setRent} step={50} />
        <NumberField label="Vacancy" suffix="%" value={vacancy} onChange={setVacancy} step={1} />
        <NumberField label="Annual operating expenses" prefix="$" value={opex} onChange={setOpex} step={500} />
        <NumberField label="Down payment" suffix="%" value={down} onChange={setDown} step={5} />
        <NumberField label="Loan rate" suffix="%" value={rate} onChange={setRate} step={0.125} />
        <NumberField label="Amortization" suffix="yrs" value={amort} onChange={setAmort} step={5} />
      </InputCard>

      <ResultPanel
        eyebrow="Cap rate"
        figure={pct(r.capRate)}
        pill={`${pct(r.coc)} cash-on-cash`}
        note="Cap rate is the unlevered yield (NOI ÷ price). Cash-on-cash adds your financing and down payment."
        cta="Finance this rental"
      >
        <Row label="Effective gross income" value={fmt(r.egi)} />
        <Row label="Net operating income (NOI)" value={fmt(r.noi)} />
        <Row label="Cash invested (down payment)" value={fmt(r.cashInvested)} />
        <Row label="Monthly cash flow" value={fmt(r.monthlyCF)} accent={r.monthlyCF >= 0 ? "#6EE7A8" : "#FCA5A5"} />
      </ResultPanel>
    </div>
  );
}
