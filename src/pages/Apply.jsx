import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

const SCH = "'Schibsted Grotesk',sans-serif";

// USAM's live loan-origination application (LendingWise). The prequal flow
// captures the lead, then hands off here to complete the full application.
const LENDINGWISE_URL =
  "https://app.lendingwise.com/HMLOWebForm.php?bRc=4e485a437c545935&fOpt=8e614f58c0d670e4&op=aa4465703ef4b17e";

const h1Style = { fontFamily: SCH, fontWeight: 800, fontSize: "clamp(28px,4vw,38px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 10px" };
const subStyle = { fontSize: 17, color: "#667085", margin: "0 0 30px" };
const labelStyle = { display: "block", fontSize: 13, fontWeight: 700, color: "#344054", marginBottom: 8 };
const continueBtn = { width: "100%", background: "#1A56C4", color: "#fff", border: "none", borderRadius: 999, padding: 16, fontWeight: 700, fontSize: 17, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 6px 20px rgba(26,86,196,0.28)" };

const LOAN_TYPES = [
  { value: "Fix & Flip", label: "Fix & Flip", sub: "Buy, renovate, sell", icon: "fixFlip" },
  { value: "Rental / DSCR", label: "Rental / DSCR", sub: "Long-term hold", icon: "rental" },
  { value: "Ground-Up Construction", label: "Ground-Up", sub: "New construction", icon: "construction" },
  { value: "CRE Bridge", label: "CRE Bridge", sub: "Commercial bridge", icon: "bridge" },
  { value: "Transactional", label: "Transactional", sub: "Double closing", icon: "transactional" },
  { value: "Bank Statement / No-Doc", label: "Bank Statement", sub: "No tax returns", icon: "bankStatement" },
  { value: "Conventional Investment", label: "Conventional", sub: "Investment property", icon: "conventional" },
  { value: "Portfolio Loans", label: "Portfolio", sub: "Multiple properties", icon: "portfolio" },
  { value: "CRE Permanent", label: "CRE Permanent", sub: "Long-term commercial", icon: "commercial" },
  { value: "SBA Financing", label: "SBA", sub: "7(a) & 504", icon: "sba" },
];

const EXPERIENCE = [
  ["This is my first", "First deal"],
  ["1-2 deals", "1-2 deals"],
  ["3-5 deals", "3-5 deals"],
  ["6 or more", "6+ deals"],
];

const TIMELINE = [
  ["As soon as possible", "ASAP"],
  ["Within 30 days", "Within 30 days"],
  ["60+ days out", "60+ days"],
  ["Just exploring", "Just exploring"],
];

export default function Apply() {
  const [s, setS] = useState({
    step: 0, loanType: "", address: "", propType: "", purchase: "", rehab: "",
    arv: "", experience: "", timeline: "", name: "", email: "", phone: "",
  });

  useEffect(() => {
    document.body.classList.add("apply-page");
    return () => document.body.classList.remove("apply-page");
  }, []);

  const set = (k) => (e) => setS((st) => ({ ...st, [k]: e.target.value }));
  const choose = (k, v) => () => setS((st) => ({ ...st, [k]: v, step: st.step + 1 }));
  const next = () => setS((st) => ({ ...st, step: st.step + 1 }));
  const back = () => setS((st) => ({ ...st, step: Math.max(0, st.step - 1) }));

  const stepNum = s.step + 1;
  const showProgress = s.step < 6;
  const progressPct = Math.round(((s.step + 1) / 6) * 100) + "%";
  const canBack = s.step > 0 && s.step < 6;
  const propSummary = s.propType || s.address ? [s.propType, s.address].filter(Boolean).join(" · ") || "Provided" : "Provided";
  const loanTypeLabel = s.loanType || "Not specified";
  const timelineLabel = s.timeline || "Flexible";
  const nameComma = s.name ? ", " + s.name.split(" ")[0] + "." : ".";

  return (
    <div>
      {/* Minimal flow header */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "#fff", borderBottom: "1px solid #E6E9EF" }}>
        <div className="flow-pad" style={{ maxWidth: 680, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Link to="/"><img src="https://lirp.cdn-website.com/e6bfcade/dms3rep/multi/opt/horizontal+raw+PSD+file-314w.png" alt="USAM I Fund" style={{ height: 38, width: "auto", display: "block" }} /></Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {showProgress && <span style={{ fontSize: 13, fontWeight: 700, color: "#8A97A8" }}>Step {stepNum} of 6</span>}
            <Link to="/" aria-label="Exit" style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid #E6E9EF", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
              <Icon name="close" size={18} color="#667085" width={2.2} />
            </Link>
          </div>
        </div>
        {showProgress && (
          <div style={{ height: 4, background: "#EAEEF4" }}>
            <div style={{ height: "100%", width: progressPct, background: "linear-gradient(90deg,#1A56C4,#3B82F6)", transition: "width .3s ease" }} />
          </div>
        )}
      </div>

      <div className="flow-pad" style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}>

        {canBack && (
          <button onClick={back} className="link-blue" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 700, color: "#667085", padding: 0, marginBottom: 24 }}>
            <Icon name="back" size={16} color="currentColor" width={2.6} />Back
          </button>
        )}

        {/* STEP 0: Loan type */}
        {s.step === 0 && (
          <div>
            <h1 style={h1Style}>What kind of financing do you need?</h1>
            <p style={subStyle}>Pick the closest fit. We'll tailor the rest around it.</p>
            <div className="opt-grid">
              {LOAN_TYPES.map((t) => (
                <button key={t.value} className="opt" onClick={choose("loanType", t.value)}>
                  <span style={{ flex: "none", width: 44, height: 44, borderRadius: 11, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={t.icon} size={22} color="#1A56C4" />
                  </span>
                  <span>
                    <span style={{ display: "block", fontSize: 16, fontWeight: 700, color: "#0E1A2B" }}>{t.label}</span>
                    <span style={{ display: "block", fontSize: 13, color: "#8A97A8" }}>{t.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Property */}
        {s.step === 1 && (
          <div>
            <h1 style={h1Style}>Tell us about the property.</h1>
            <p style={subStyle}>Where is the deal, and what type of property?</p>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Property address</label>
              <input className="ci" type="text" placeholder="Street, city, state" value={s.address} onChange={set("address")} />
            </div>
            <div style={{ marginBottom: 30 }}>
              <label style={labelStyle}>Property type</label>
              <select className="ci" value={s.propType} onChange={set("propType")}>
                <option value="">Select a type</option>
                <option value="Single-family">Single-family</option>
                <option value="2-4 units">2-4 units</option>
                <option value="Multifamily (5+)">Multifamily (5+)</option>
                <option value="Mixed-use">Mixed-use</option>
                <option value="Commercial">Commercial</option>
                <option value="Land / lot">Land / lot</option>
              </select>
            </div>
            <button onClick={next} className="btn-primary" style={continueBtn}>Continue</button>
          </div>
        )}

        {/* STEP 2: Numbers */}
        {s.step === 2 && (
          <div>
            <h1 style={h1Style}>What are the numbers?</h1>
            <p style={subStyle}>Estimates are fine. We'll firm them up together.</p>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Purchase price</label>
              <input className="ci" type="text" inputMode="numeric" placeholder="$ 0" value={s.purchase} onChange={set("purchase")} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Rehab budget <span style={{ fontWeight: 500, color: "#98A2B3" }}>(if any)</span></label>
              <input className="ci" type="text" inputMode="numeric" placeholder="$ 0" value={s.rehab} onChange={set("rehab")} />
            </div>
            <div style={{ marginBottom: 30 }}>
              <label style={labelStyle}>After-repair value (ARV) <span style={{ fontWeight: 500, color: "#98A2B3" }}>(if known)</span></label>
              <input className="ci" type="text" inputMode="numeric" placeholder="$ 0" value={s.arv} onChange={set("arv")} />
            </div>
            <button onClick={next} className="btn-primary" style={continueBtn}>Continue</button>
          </div>
        )}

        {/* STEP 3: Experience */}
        {s.step === 3 && (
          <div>
            <h1 style={h1Style}>How many deals have you done?</h1>
            <p style={subStyle}>Completed in the last 36 months. It helps us tailor leverage.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {EXPERIENCE.map(([label, value]) => (
                <button key={value} className="opt" onClick={choose("experience", value)}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0E1A2B" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Timeline */}
        {s.step === 4 && (
          <div>
            <h1 style={h1Style}>How soon do you need to close?</h1>
            <p style={subStyle}>We can move in as few as 5-7 days when needed.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TIMELINE.map(([label, value]) => (
                <button key={value} className="opt" onClick={choose("timeline", value)}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0E1A2B" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Contact */}
        {s.step === 5 && (
          <div>
            <h1 style={h1Style}>Where should we send your terms?</h1>
            <p style={subStyle}>No hard credit pull. We'll only reach out about this deal.</p>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Full name</label>
              <input className="ci" type="text" placeholder="Your name" value={s.name} onChange={set("name")} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Email</label>
              <input className="ci" type="email" placeholder="you@email.com" value={s.email} onChange={set("email")} />
            </div>
            <div style={{ marginBottom: 30 }}>
              <label style={labelStyle}>Phone</label>
              <input className="ci" type="tel" placeholder="(512) 555-0100" value={s.phone} onChange={set("phone")} />
            </div>
            <button onClick={next} className="btn-primary" style={continueBtn}>See my estimate</button>
            <p style={{ fontSize: 13, color: "#98A2B3", textAlign: "center", margin: "14px 0 0" }}>By continuing you agree to be contacted about your inquiry.</p>
          </div>
        )}

        {/* STEP 6: Result */}
        {s.step === 6 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
              <Icon name="check" size={36} color="#1A56C4" width={2.6} />
            </div>
            <h1 style={h1Style}>You're pre-qualified to talk terms.</h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "#667085", margin: "0 auto 30px", maxWidth: 520 }}>Thanks{nameComma} Based on what you shared, your deal looks like a strong fit. Finish the full application now to fast-track your file, or a USAM underwriter will reach out within one business day.</p>

            <div style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 18, padding: 24, textAlign: "left", maxWidth: 460, margin: "0 auto 28px", boxShadow: "0 1px 2px rgba(14,26,43,0.04)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A97A8", marginBottom: 16 }}>Your request</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 14.5, color: "#667085" }}>Program</span><span style={{ fontSize: 15, fontWeight: 700, color: "#0E1A2B" }}>{loanTypeLabel}</span></div>
                <div style={{ height: 1, background: "#EEF1F5" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}><span style={{ fontSize: 14.5, color: "#667085" }}>Property</span><span style={{ fontSize: 15, fontWeight: 700, color: "#0E1A2B", textAlign: "right" }}>{propSummary}</span></div>
                <div style={{ height: 1, background: "#EEF1F5" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 14.5, color: "#667085" }}>Timeline</span><span style={{ fontSize: 15, fontWeight: 700, color: "#0E1A2B" }}>{timelineLabel}</span></div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              <a href={LENDINGWISE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "15px 28px", borderRadius: 999, boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Complete your application</a>
              <a href="tel:512-566-1803" className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 26px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>Call to fast-track</a>
            </div>
            <div style={{ marginTop: 18 }}>
              <Link to="/" className="link-blue" style={{ fontSize: 14.5, fontWeight: 700, color: "#667085", textDecoration: "none" }}>Back to home</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
