import { useMemo } from "react";
import { NumberField, Row, fmt, useNum, num, SCH, applyUrl, useIsMobile, StickyResult, Wizard } from "./fields.jsx";

export default function FixFlipCalculator() {
  const mobile = useIsMobile();
  const [purchase, setPurchase] = useNum(210000);
  const [rehab, setRehab] = useNum(55000);
  const [arv, setArv] = useNum(385000);
  const [holding, setHolding] = useNum(13000);
  const [sellingPct, setSellingPct] = useNum(8);

  const r = useMemo(() => {
    const P = num(purchase), R = num(rehab), A = num(arv), H = num(holding), S = num(sellingPct);
    const sellingCosts = A * (S / 100);
    const totalInvested = P + R + H;
    const allIn = totalInvested + sellingCosts;
    const profit = A - allIn;
    const fin = (x) => (Number.isFinite(x) ? x : 0); // guard the raw .toFixed() displays
    const roi = fin(totalInvested > 0 ? (profit / totalInvested) * 100 : 0);
    const profitPctArv = fin(A > 0 ? (profit / A) * 100 : 0);
    const mao = A * 0.7 - R; // 70% rule
    const withinMao = P <= mao;
    return { sellingCosts, totalInvested, allIn, profit, roi, profitPctArv, mao, withinMao };
  }, [purchase, rehab, arv, holding, sellingPct]);

  const profitColor = r.profit >= 0 ? "#0E7C4A" : "#B42318";

  return (
    <>
    {mobile && (
      <StickyResult
        label="Projected net profit"
        value={fmt(r.profit)}
        valueColor={r.profit >= 0 ? "#fff" : "#FCA5A5"}
        pill={`${r.roi.toFixed(0)}% ROI`}
        pillColor={profitColor}
        cta="Fund this flip"
        ctaHref={applyUrl("fix-flip", { purchase, rehab, arv })}
      />
    )}
    <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "start" }}>
      <div style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, padding: 26 }}>
        <div className="calc-inputs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Wizard mobile={mobile} steps={[
            { title: "The deal", content: <>
              <NumberField label="Purchase price" prefix="$" value={purchase} onChange={setPurchase} step={5000} />
              <NumberField label="Rehab budget" prefix="$" value={rehab} onChange={setRehab} step={2500} />
              <NumberField label="After-repair value (ARV)" prefix="$" value={arv} onChange={setArv} step={5000} />
            </> },
            { title: "Costs", content: <>
              <NumberField label="Holding / carry costs" prefix="$" value={holding} onChange={setHolding} step={1000} />
              <NumberField label="Selling costs" suffix="%" value={sellingPct} onChange={setSellingPct} step={0.5} max={100} />
            </> },
          ]} />
        </div>

        {/* 70% rule callout */}
        <div style={{ marginTop: 20, background: r.withinMao ? "#ECFDF3" : "#FFF4ED", border: `1px solid ${r.withinMao ? "#ABEFC6" : "#FED4BC"}`, borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: r.withinMao ? "#067647" : "#B54708", marginBottom: 4 }}>
            70% rule max offer: {fmt(r.mao)}
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.45, color: "#475467" }}>
            {r.withinMao
              ? "Your purchase price is at or below the 70% rule ceiling. Good margin of safety."
              : `Your purchase price is ${fmt(num(purchase) - r.mao)} above the 70% rule ceiling. Tighten the price or rehab, or confirm the ARV.`}
          </div>
        </div>
      </div>

      {/* Result */}
      <div style={{ background: "linear-gradient(160deg,#0E1A2B,#15294A)", borderRadius: 16, padding: 26, color: "#fff", position: "sticky", top: 96 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6FA0F0" }}>Projected net profit</div>
        <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 46, lineHeight: 1, letterSpacing: "-0.02em", margin: "8px 0 4px", color: r.profit >= 0 ? "#fff" : "#FCA5A5" }}>
          {fmt(r.profit)}
        </div>
        <div style={{ display: "inline-block", fontSize: 13.5, fontWeight: 700, color: profitColor, background: "#fff", padding: "5px 12px", borderRadius: 999, marginBottom: 18 }}>
          {r.roi.toFixed(0)}% ROI · {r.profitPctArv.toFixed(0)}% of ARV
        </div>

        <div style={{ borderTop: "1px solid #21324A", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <Row label="Purchase + rehab" value={fmt(num(purchase) + num(rehab))} />
          <Row label="Holding costs" value={fmt(holding)} />
          <Row label={`Selling costs (${num(sellingPct)}%)`} value={fmt(r.sellingCosts)} />
          <Row label="All-in cost" value={fmt(r.allIn)} />
        </div>

        <a href={applyUrl("fix-flip", { purchase, rehab, arv })} style={{ display: "block", textAlign: "center", marginTop: 22, background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 20px", borderRadius: 999 }}>
          Fund this flip
        </a>
      </div>
    </div>
    </>
  );
}
