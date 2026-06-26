import { useState, useRef } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Icon from "../components/Icon.jsx";
import Faq from "../components/Faq.jsx";
import JsonLd, { faqPageSchema } from "../components/JsonLd.jsx";
import { submitPartner } from "../lib/crm.js";
import { trackPartnerFormStart, trackPartnerApplication } from "../lib/analytics.js";
import { Link } from "react-router-dom";
import { guides } from "../data/guides.js";
import partnersBanner from "../assets/banners/partners.webp";

const SCH = "'Schibsted Grotesk',sans-serif";
const partnerGuides = guides.filter((g) => g.category === "For Partners");
const labelStyle = { display: "block", fontSize: 13, fontWeight: 700, color: "#344054", marginBottom: 7 };

const VALUE = [
  ["clock", "We fund your buyers fast", "Same-day term sheet, and we fund within 48 hours of clear title. Your deals don't die waiting on financing."],
  ["check", "A smooth, simple system", "Co-branded proof-of-funds letters, fast pre-quals, and one named contact who knows your pipeline."],
  ["phone", "We make you look good", "Reliable closings and real people who answer the phone, so your investors keep coming back to you."],
];

const STEPS = [
  ["01", "Apply", "Tell us about your business and the investors you work with. Two minutes."],
  ["02", "Get set up", "We give you a named contact, co-branded proof-of-funds letters, and fast pre-quals for your buyers."],
  ["03", "Send deals", "Your investors get funded fast, your deals close, and we keep you in the loop the whole way."],
];

const PARTNER_FAQS = [
  { q: "Who can partner with USAM Fund?", a: "Wholesalers and dispo teams, investor-focused real estate agents, off-market marketplaces, and anyone who regularly works with real estate investors who need financing." },
  { q: "What do I get as a partner?", a: "Speed and certainty. We fund your buyers fast (same-day term sheet, close in 5-7 days), give you co-branded proof-of-funds letters and fast pre-quals, and assign one named contact, so your deals close and you look reliable to your investors." },
  { q: "How fast can you fund my buyer?", a: "We can issue a same-day term sheet and fund most fix and flip and bridge loans in 5 to 7 business days once title and insurance are in." },
  { q: "Do my buyers need to be experienced investors?", a: "No. Experience helps with leverage and pricing, but a first-time investor with a sound deal, a realistic budget, and a clear exit can still get funded." },
  { q: "What kinds of deals do you fund?", a: "Business-purpose investment loans across the board: fix and flip, DSCR rental, ground-up construction, bridge, transactional, and more. We do not do owner-occupied consumer mortgages." },
];

export default function Partners() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", type: "", market: "", volume: "", message: "", smsConsent: false });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);

  const markStart = () => { if (!started.current) { started.current = true; trackPartnerFormStart(); } };
  const set = (k) => (e) => { markStart(); setForm((f) => ({ ...f, [k]: e.target.value })); setError(""); };
  const toggle = (k) => (e) => { markStart(); setForm((f) => ({ ...f, [k]: e.target.checked })); };
  const submit = () => {
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.email.trim() && !form.phone.trim()) { setError("Please provide an email or phone number so we can reach you."); return; }
    setSent(true);
    submitPartner({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      partnerType: form.type,
      market: form.market,
      dealsPerMonth: form.volume,
      notes: form.message,
      smsConsent: form.smsConsent,
    });
    trackPartnerApplication({ partner_type: form.type });
  };
  const reset = () => { setForm({ name: "", company: "", email: "", phone: "", type: "", market: "", volume: "", message: "", smsConsent: false }); setSent(false); };

  return (
    <div>
      <Header />
      <JsonLd id="partners-faq" data={faqPageSchema(PARTNER_FAQS)} />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 56px" }}>
        <div className="about-hero" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Partner program</div>
            <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>Send us your investors. We'll fund them fast.</h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 560, margin: 0 }}>If you wholesale deals, work with investor buyers, or move off-market property, partner with a direct lender who closes. Your buyers get funded fast, your deals close, and you look like the reliable one.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
              <a href="#apply" className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "16px 30px", borderRadius: 999, boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Become a partner</a>
              <a href="tel:512-488-6087" className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "15px 28px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>Call us</a>
            </div>
          </div>
          <div style={{ height: 320, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -20px rgba(14,26,43,0.3)" }}>
            <img src={partnersBanner} alt="A USAM Fund lender shaking hands with a real estate partner" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="sec" style={{ background: "#fff", padding: "24px 32px 12px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["Wholesalers & dispo teams", "Investor-focused agents", "Off-market marketplaces", "Solo wholesalers"].map((t) => (
            <span key={t} style={{ fontSize: 14, fontWeight: 600, color: "#1A56C4", background: "#EEF3FC", border: "1px solid #DCE6F9", padding: "8px 15px", borderRadius: 999 }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="sec" style={{ background: "#fff", padding: "32px 32px 56px" }}>
        <div className="val-grid" style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
          {VALUE.map(([icon, title, body]) => (
            <div key={title} style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 16, padding: 28 }}>
              <div style={{ width: 46, height: 46, borderRadius: 11, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={icon} size={22} color="#1A56C4" />
              </div>
              <h2 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 19, color: "#0E1A2B", margin: "0 0 8px" }}>{title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#667085", margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="sec" style={{ background: "#0E1A2B", color: "#E7ECF3", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6FA0F0", marginBottom: 14 }}>How it works</div>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 40px" }}>Three steps to closed deals.</h2>
          <div className="u-steps" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {STEPS.map(([n, title, body]) => (
              <div key={n}>
                <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 15, color: "#6FA0F0" }}>STEP {n}</div>
                <div style={{ height: 1, background: "#21324A", margin: "16px 0 20px" }} />
                <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 21, color: "#fff", margin: "0 0 10px" }}>{title}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "#AEB9C9", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="sec" style={{ background: "#fff", padding: "56px 32px", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 10px" }}>Become a partner</h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "#667085", margin: "0 0 28px" }}>Tell us about your business. A real person will reach out, usually the same day.</p>

          <div style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 20, padding: 32, boxShadow: "0 1px 2px rgba(14,26,43,0.04)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "28px 12px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Icon name="check" size={32} color="#1A56C4" width={2.6} />
                </div>
                <h3 style={{ fontFamily: SCH, fontWeight: 800, fontSize: 26, color: "#0E1A2B", margin: "0 0 10px" }}>Thanks, partner.</h3>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "#667085", margin: "0 0 22px" }}>We got it and will reach out shortly to get you set up. Need a faster answer? Call 512-488-6087.</p>
                <button onClick={reset} style={{ background: "#fff", color: "#1A56C4", border: "1.5px solid #D6DDE8", borderRadius: 999, padding: "12px 24px", fontWeight: 700, fontSize: 15, fontFamily: "inherit", cursor: "pointer" }}>Submit another</button>
              </div>
            ) : (
              <div>
                <div className="crow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div><label style={labelStyle}>Name</label><input className="ci" type="text" autoComplete="name" placeholder="Your name" value={form.name} onChange={set("name")} /></div>
                  <div><label style={labelStyle}>Company</label><input className="ci" type="text" autoComplete="organization" placeholder="Company (optional)" value={form.company} onChange={set("company")} /></div>
                </div>
                <div className="crow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div><label style={labelStyle}>Email</label><input className="ci" type="email" autoComplete="email" placeholder="you@email.com" value={form.email} onChange={set("email")} /></div>
                  <div><label style={labelStyle}>Phone</label><input className="ci" type="tel" autoComplete="tel" placeholder="(512) 555-0100" value={form.phone} onChange={set("phone")} /></div>
                </div>
                <div className="crow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>What do you do?</label>
                    <select className="ci" value={form.type} onChange={set("type")}>
                      <option value="">Select one</option>
                      <option>Wholesaler / dispo</option>
                      <option>Investor-focused agent</option>
                      <option>Off-market marketplace</option>
                      <option>Solo wholesaler</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div><label style={labelStyle}>Market</label><input className="ci" type="text" placeholder="City / state" value={form.market} onChange={set("market")} /></div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Typical deals per month</label>
                  <select className="ci" value={form.volume} onChange={set("volume")}>
                    <option value="">Select a range</option>
                    <option>1-3</option>
                    <option>4-10</option>
                    <option>11-25</option>
                    <option>25+</option>
                  </select>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={labelStyle}>Anything else?</label>
                  <textarea className="ci" rows={4} style={{ resize: "vertical" }} placeholder="Tell us about your business and the investors you work with." value={form.message} onChange={set("message")} />
                </div>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, margin: "0 0 18px", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.smsConsent} onChange={toggle("smsConsent")} style={{ marginTop: 3, flex: "none", width: 16, height: 16, accentColor: "#1A56C4", cursor: "pointer" }} />
                  <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "#667085" }}>I agree to receive text messages from USAM Fund about my inquiry. Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See our <Link to="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} style={{ color: "#1A56C4", fontWeight: 600 }}>Privacy Policy</Link>.</span>
                </label>
                {error && <p style={{ color: "#C0392B", fontSize: 14, margin: "0 0 12px" }}>{error}</p>}
                <button onClick={submit} className="btn-primary" style={{ width: "100%", background: "#1A56C4", color: "#fff", border: "none", borderRadius: 999, padding: 16, fontWeight: 700, fontSize: 17, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Apply to partner</button>
                <p style={{ fontSize: 13, color: "#98A2B3", textAlign: "center", margin: "14px 0 0" }}>We'll never share your information.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resources for partners */}
      {partnerGuides.length > 0 && (
        <section className="sec" style={{ background: "#fff", padding: "8px 32px 56px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>For partners</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 22px" }}>Resources to close more deals.</h2>
            <div className="pg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
              {partnerGuides.map((g) => (
                <Link key={g.slug} to={`/resources/${g.slug}`} className="card-link" style={{ textDecoration: "none", display: "block", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 14, padding: "22px 24px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 8 }}>{g.readMins} min read</div>
                  <div style={{ fontFamily: SCH, fontWeight: 700, fontSize: 17, lineHeight: 1.25, color: "#0E1A2B", marginBottom: 10 }}>{g.title}</div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "#1A56C4" }}>
                    Read the guide <Icon name="chevronRight" size={14} color="#1A56C4" width={2.6} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="sec" style={{ background: "#F6F8FB", padding: "56px 32px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>Partner FAQ</div>
          <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 22px" }}>Questions, answered.</h2>
          <Faq items={PARTNER_FAQS} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
