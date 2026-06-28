import { useMemo } from "react";
import { NumberField, InputCard, ResultPanel, Row, fmt, pct, monthlyPI, useNum, num, applyUrl } from "./fields.jsx";

// Cap rate + cash flow + cash-on-cash for a rental. Cap rate is unlevered
// (NOI / price); cash-on-cash factors in the financing.
export default function CapRateCalculator() {
  const [price, setPrice] = useNum(310000);
  const [rent, setRent] = useNum(2750);
  const [vacancy, setVacancy] = useNum(5);
  const [opex, setOpex] = useNum(9200);
  const [down, setDown] = useNum(20);
  const [rate, setRate] = useNum(7); // editable placeholder for a 30-yr amortizing rental loan; not an advertised rate
  const [amort, setAmort] = useNum(30);

  const r = useMemo(() => {
    const PR = num(price), RN = num(rent), VA = num(vacancy), OP = num(opex), DN = num(down), RT = num(rate), AM = num(amort);
    const egi = RN * 12 * (1 - VA / 100); // effective gross income
    const noi = egi - OP;
    const capRate = PR > 0 ? (noi / PR) * 100 : 0;
    const loan = PR * (1 - DN / 100);
    const cashInvested = PR - loan;
    const annualDebt = monthlyPI(loan, RT, AM) * 12;
    const annualCF = noi - annualDebt;
    const coc = cashInvested > 0 ? (annualCF / cashInvested) * 100 : 0;
    return { egi, noi, capRate, loan, cashInvested, annualCF, coc, monthlyCF: annualCF / 12 };
  }, [price, rent, vacancy, opex, down, rate, amort]);

  return (
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      <InputCard>
        <NumberField label="Purchase price" prefix="$" value={price} onChange={setPrice} step={5000} />
        <NumberField label="Monthly rent" prefix="$" value={rent} onChange={setRent} step={50} />
        <NumberField label="Vacancy" suffix="%" value={vacancy} onChange={setVacancy} step={1} max={100} />
        <NumberField label="Annual operating expenses" prefix="$" value={opex} onChange={setOpex} step={500} />
        <NumberField label="Down payment" suffix="%" value={down} onChange={setDown} step={5} max={100} />
        <NumberField label="Loan rate" suffix="%" value={rate} onChange={setRate} step={0.125} />
        <NumberField label="Amortization" suffix="yrs" value={amort} onChange={setAmort} step={5} />
      </InputCard>

      <ResultPanel
        eyebrow="Cap rate"
        figure={pct(r.capRate)}
        pill={`${pct(r.coc)} cash-on-cash`}
        note="Cap rate is the unlevered yield (NOI ÷ price). Cash-on-cash adds your financing and down payment."
        cta="Finance this rental"
        ctaHref={applyUrl("rental-dscr", { purchase: price, monthlyRent: rent })}
      >
        <Row label="Effective gross income" value={fmt(r.egi)} />
        <Row label="Net operating income (NOI)" value={fmt(r.noi)} />
        <Row label="Cash invested (down payment)" value={fmt(r.cashInvested)} />
        <Row label="Monthly cash flow" value={fmt(r.monthlyCF)} accent={r.monthlyCF >= 0 ? "#6EE7A8" : "#FCA5A5"} />
      </ResultPanel>
    </div>
  );
}
