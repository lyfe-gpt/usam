import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { submitLead } from "../lib/crm.js";

function AddressAutocomplete({ value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    onChange(q);
    clearTimeout(timerRef.current);
    if (q.length < 2) { setSuggestions([]); setOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&countrycodes=us&limit=5`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        setSuggestions(data.map((r) => r.display_name));
        setOpen(data.length > 0);
      } catch {
        setSuggestions([]); setOpen(false);
      }
    }, 200);
  };

  const pick = (addr) => {
    setQuery(addr);
    onChange(addr);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <input
        className="ci"
        type="text"
        placeholder="Street, city, state"
        value={query}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        autoComplete="off"
      />
      {open && (
        <ul style={{
          position: "absolute", zIndex: 999, top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#fff", border: "1px solid #D0D5DD", borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)", margin: 0, padding: 0, listStyle: "none",
        }}>
          {suggestions.map((addr, i) => (
            <li
              key={i}
              onMouseDown={() => pick(addr)}
              style={{
                padding: "10px 14px", fontSize: 14, color: "#0E1A2B", cursor: "pointer",
                borderBottom: i < suggestions.length - 1 ? "1px solid #F2F4F7" : "none",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#F9FAFB"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              {addr}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Strips "$", commas, and spaces from a currency input, returning a number
// (or undefined when empty) so Airtable's currency fields receive clean values.
function toNumber(v) {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

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

// The "numbers" step (step 2) asks different questions per program. Each entry
// is the ordered list of fields to render. Currency keys "purchase", "rehab",
// "arv" reuse the existing Airtable columns (the primary amount flexes by
// program); "monthlyRent" and "loanAmount" have their own columns; everything
// else (noi, downPayment, etc.) is folded into Notes in finish().
const DEFAULT_NUMBERS = [
  { key: "purchase", label: "Purchase price", type: "currency" },
  { key: "rehab", label: "Rehab budget", type: "currency", hint: "(if any)" },
  { key: "arv", label: "After-repair value (ARV)", type: "currency", hint: "(if known)" },
];

const NUMBERS_BY_PROGRAM = {
  "Fix & Flip": DEFAULT_NUMBERS,
  "Ground-Up Construction": [
    { key: "purchase", label: "Land / lot cost", type: "currency" },
    { key: "rehab", label: "Construction budget", type: "currency" },
    { key: "arv", label: "Completed value", type: "currency", hint: "(if known)" },
  ],
  "Rental / DSCR": [
    { key: "purchase", label: "Purchase price", type: "currency" },
    { key: "monthlyRent", label: "Expected monthly rent", type: "currency" },
    { key: "rehab", label: "Light rehab budget", type: "currency", hint: "(if any)" },
  ],
  "CRE Bridge": [
    { key: "loanAmount", label: "Loan amount needed", type: "currency" },
    { key: "purchase", label: "Property value", type: "currency" },
    { key: "noi", label: "Annual net operating income (NOI)", type: "currency", hint: "(if known)" },
  ],
  "CRE Permanent": [
    { key: "loanAmount", label: "Loan amount needed", type: "currency" },
    { key: "purchase", label: "Property value", type: "currency" },
    { key: "noi", label: "Annual net operating income (NOI)", type: "currency", hint: "(if known)" },
  ],
  "Transactional": [
    { key: "purchase", label: "Your purchase price (A to B)", type: "currency" },
    { key: "resalePrice", label: "Resale price (B to C)", type: "currency" },
  ],
  "Bank Statement / No-Doc": [
    { key: "purchase", label: "Purchase price", type: "currency" },
    { key: "downPayment", label: "Down payment", type: "select", options: ["25% or more", "20%", "15%", "10% or less"] },
    { key: "avgDeposits", label: "Avg monthly bank deposits", type: "currency", hint: "(if known)" },
  ],
  "Conventional Investment": [
    { key: "purchase", label: "Purchase price", type: "currency" },
    { key: "downPayment", label: "Down payment", type: "select", options: ["25% or more", "20%", "15%", "Less than 15%"] },
    { key: "creditBand", label: "Estimated credit score", type: "select", options: ["740+", "700-739", "660-699", "Below 660"] },
  ],
  "Portfolio Loans": [
    { key: "numProperties", label: "Number of properties", type: "number", placeholder: "e.g. 6" },
    { key: "purchase", label: "Total portfolio value", type: "currency" },
    { key: "monthlyRent", label: "Total monthly rent", type: "currency", hint: "(if known)" },
  ],
  "SBA Financing": [
    { key: "loanAmount", label: "Loan amount", type: "currency" },
    { key: "useOfFunds", label: "Use of funds", type: "select", options: ["Owner-occupied real estate", "Business acquisition", "Equipment", "Working capital"] },
    { key: "timeInBusiness", label: "Time in business", type: "select", options: ["Startup / pre-revenue", "Less than 2 years", "2-5 years", "5+ years"] },
  ],
};

export default function Apply() {
  const [s, setS] = useState({
    step: 0, loanType: "", address: "", propType: "", purchase: "", rehab: "", arv: "",
    monthlyRent: "", loanAmount: "", resalePrice: "", downPayment: "", numProperties: "",
    noi: "", creditBand: "", useOfFunds: "", timeInBusiness: "", avgDeposits: "",
    experience: "", timeline: "", name: "", email: "", phone: "", leadCaptured: false, step0Error: "",
  });

  useEffect(() => {
    document.body.classList.add("apply-page");
    return () => document.body.classList.remove("apply-page");
  }, []);

  const set = (k) => (e) => setS((st) => ({ ...st, [k]: e.target.value }));
  const choose = (k, v) => () => setS((st) => ({ ...st, [k]: v, step: st.step + 1 }));
  const next = () => setS((st) => ({ ...st, step: st.step + 1 }));
  const back = () => setS((st) => ({ ...st, step: Math.max(0, st.step - 1) }));

  const captureStep0 = () => {
    if (!s.name.trim()) {
      setS((st) => ({ ...st, step0Error: "Please enter your name." }));
      return;
    }
    if (!s.email.trim() && !s.phone.trim()) {
      setS((st) => ({ ...st, step0Error: "Please provide an email or phone number so we can reach you." }));
      return;
    }
    submitLead({ name: s.name, email: s.email, phone: s.phone, leadSource: "Website apply / quote", salesStage: "Inquiry" });
    setS((st) => ({ ...st, step: 1, leadCaptured: true, step0Error: "" }));
  };

  // Final step: push the completed lead to the CRM, then show the result.
  // Accepts an override (e.g. the just-clicked timeline) so the value is
  // included even though setS hasn't flushed yet.
  const finish = (override = {}) => {
    const st = { ...s, ...override };
    const money = (v) => {
      const n = toNumber(v);
      return n === undefined ? "" : "$" + n.toLocaleString();
    };
    // Program-specific inputs without their own CRM column are folded into
    // Notes so the sales team still sees every number the lead provided.
    const extras = [
      ["Annual NOI", money(st.noi)],
      ["Resale price (B to C)", money(st.resalePrice)],
      ["Down payment", st.downPayment],
      ["Number of properties", st.numProperties],
      ["Avg monthly deposits", money(st.avgDeposits)],
      ["Estimated credit", st.creditBand],
      ["Use of funds", st.useOfFunds],
      ["Time in business", st.timeInBusiness],
    ].filter(([, v]) => v);
    const notes = extras.length ? extras.map(([k, v]) => `${k}: ${v}`).join("\n") : undefined;

    submitLead({
      name: st.name,
      email: st.email,
      phone: st.phone,
      leadSource: "Website apply / quote",
      loanProgram: st.loanType,
      propertyAddress: st.address,
      propertyType: st.propType,
      purchasePrice: toNumber(st.purchase),
      rehabBudget: toNumber(st.rehab),
      arv: toNumber(st.arv),
      monthlyRent: toNumber(st.monthlyRent),
      loanAmount: toNumber(st.loanAmount),
      experience: st.experience,
      timeline: st.timeline,
      notes,
    });
    setS((cur) => ({ ...cur, ...override, step: cur.step + 1 }));
  };

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
          <Link to="/"><img src="https://lirp.cdn-website.com/e6bfcade/dms3rep/multi/opt/horizontal+raw+PSD+file-314w.png" alt="USAM Fund" style={{ height: 38, width: "auto", display: "block" }} /></Link>
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

        {/* STEP 0: Borrower — captured first so the lead is saved even if they drop off later */}
        {s.step === 0 && (
          <div>
            <h1 style={h1Style}>First, who are we preparing this for?</h1>
            <p style={subStyle}>We'll use this to send your terms and follow up. No hard credit pull.</p>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Full name</label>
              <input className="ci" type="text" autoComplete="name" placeholder="Your name" value={s.name} onChange={set("name")} disabled={s.leadCaptured} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Email</label>
              <input className="ci" type="email" autoComplete="email" placeholder="you@email.com" value={s.email} onChange={set("email")} disabled={s.leadCaptured} />
            </div>
            <div style={{ marginBottom: s.step0Error ? 12 : 30 }}>
              <label style={labelStyle}>Phone</label>
              <input className="ci" type="tel" autoComplete="tel" placeholder="(512) 555-0100" value={s.phone} onChange={set("phone")} disabled={s.leadCaptured} />
            </div>
            {s.step0Error && (
              <p style={{ color: "#C0392B", fontSize: 14, margin: "0 0 18px" }}>{s.step0Error}</p>
            )}
            <button onClick={captureStep0} className="btn-primary" style={continueBtn}>Continue</button>
          </div>
        )}

        {/* STEP 1: Loan type */}
        {s.step === 1 && (
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

        {/* STEP 2: Property */}
        {s.step === 2 && (
          <div>
            <h1 style={h1Style}>Tell us about the property.</h1>
            <p style={subStyle}>Where is the deal, and what type of property?</p>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Property address</label>
              <AddressAutocomplete value={s.address} onChange={(v) => setS((st) => ({ ...st, address: v }))} />
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

        {/* STEP 3: Numbers — fields adapt to the chosen program */}
        {s.step === 3 && (
          <div>
            <h1 style={h1Style}>What are the numbers?</h1>
            <p style={subStyle}>Estimates are fine. We'll firm them up together.</p>
            {(NUMBERS_BY_PROGRAM[s.loanType] || DEFAULT_NUMBERS).map((f, i, arr) => (
              <div key={f.key} style={{ marginBottom: i === arr.length - 1 ? 30 : 18 }}>
                <label style={labelStyle}>
                  {f.label}
                  {f.hint && <span style={{ fontWeight: 500, color: "#98A2B3" }}> {f.hint}</span>}
                </label>
                {f.type === "select" ? (
                  <select className="ci" value={s[f.key]} onChange={set(f.key)}>
                    <option value="">Select an option</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input className="ci" type="text" inputMode="numeric" placeholder={f.placeholder || "$ 0"} value={s[f.key]} onChange={set(f.key)} />
                )}
              </div>
            ))}
            <button onClick={next} className="btn-primary" style={continueBtn}>Continue</button>
          </div>
        )}

        {/* STEP 4: Experience */}
        {s.step === 4 && (
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

        {/* STEP 5: Timeline — final step; selecting submits the lead */}
        {s.step === 5 && (
          <div>
            <h1 style={h1Style}>How soon do you need to close?</h1>
            <p style={subStyle}>We can move in as few as 5-7 days when needed.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TIMELINE.map(([label, value]) => (
                <button key={value} className="opt" onClick={() => finish({ timeline: value })}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0E1A2B" }}>{label}</span>
                </button>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#98A2B3", textAlign: "center", margin: "18px 0 0" }}>By continuing you agree to be contacted about your inquiry.</p>
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
              <a href="tel:512-488-6087" className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 26px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>Call to fast-track</a>
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
