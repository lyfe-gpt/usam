import { useMemo } from "react";
import { NumberField, InputCard, ResultPanel, Row, fmt, monthlyPI, useNum, num, applyUrl } from "./fields.jsx";

// How much cash you can pull out of a property: new loan at max LTV, minus the
// existing balance and closing costs, plus what the new payment looks like.
export default function CashOutRefiCalculator() {
  const [value, setValue] = useNum(450000);
  const [balance, setBalance] = useNum(210000);
  const [ltv, setLtv] = useNum(75);
  const [rate, setRate] = useNum(7.5);
  const [amort, setAmort] = useNum(30);
  const [costs, setCosts] = useNum(6000);

  const r = useMemo(() => {
    const V = num(value), B = num(balance), LT = num(ltv), RT = num(rate), AM = num(amort), CO = num(costs);
    const newLoan = V * (LT / 100);
    const grossCashOut = newLoan - B;
    const netCashOut = grossCashOut - CO;
    const pi = monthlyPI(newLoan, RT, AM);
    return { newLoan, grossCashOut, netCashOut, pi };
  }, [value, balance, ltv, rate, amort, costs]);

  const negative = r.netCashOut <= 0;
  return (
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      <InputCard>
        <NumberField label="Current property value" prefix="$" value={value} onChange={setValue} step={5000} />
        <NumberField label="Current loan balance" prefix="$" value={balance} onChange={setBalance} step={5000} />
        <NumberField label="Max LTV" suffix="%" value={ltv} onChange={setLtv} step={1} max={100} />
        <NumberField label="New loan rate" suffix="%" value={rate} onChange={setRate} step={0.125} />
        <NumberField label="Amortization" suffix="yrs" value={amort} onChange={setAmort} step={5} />
        <NumberField label="Closing costs" prefix="$" value={costs} onChange={setCosts} step={500} />
      </InputCard>

      <ResultPanel
        eyebrow="Cash you can pull out"
        figure={negative ? fmt(0) : fmt(r.netCashOut)}
        figureColor={negative ? "#FCA5A5" : "#6EE7A8"}
        pill={negative ? "No tappable equity at this LTV" : "Net, after closing costs"}
        pillColor={negative ? "#B42318" : "#067647"}
        note={negative
          ? "At this LTV the new loan does not clear your existing balance plus costs. Raise the LTV or pay down the balance."
          : "Tax-free at closing (it's a loan, not income). Common BRRRR and portfolio-growth move."}
        cta="Start my cash-out"
        ctaHref={applyUrl("rental-dscr", { purchase: value, loanAmount: r.newLoan })}
      >
        <Row label={`New loan (value × ${num(ltv)}%)`} value={fmt(r.newLoan)} />
        <Row label="Pays off current balance" value={fmt(balance)} />
        <Row label="Closing costs" value={fmt(costs)} />
        <Row label="New monthly payment" value={fmt(r.pi)} accent="#6FA0F0" />
      </ResultPanel>
    </div>
  );
}
