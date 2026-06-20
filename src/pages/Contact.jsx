import { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Icon from "../components/Icon.jsx";

const SCH = "'Schibsted Grotesk',sans-serif";
const labelStyle = { display: "block", fontSize: 13, fontWeight: 700, color: "#344054", marginBottom: 7 };

function InfoCard({ icon, label, children }) {
  return (
    <div style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 8 }}>
        <Icon name={icon} size={20} color="#1A56C4" />
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A97A8" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = () => setSent(true);
  const reset = () => {
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    setSent(false);
  };

  return (
    <div>
      <Header />

      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "64px 32px 24px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Contact us</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,56px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>Let's talk about your deal.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 560, margin: 0 }}>Have a question or a scenario to run by us? Send a note and a real person will get back to you, usually the same day.</p>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff", padding: "32px 32px 80px" }}>
        <div className="contact-grid" style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 56, alignItems: "start" }}>

          {/* Form */}
          <div style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 20, padding: 32, boxShadow: "0 1px 2px rgba(14,26,43,0.04)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "36px 12px" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Icon name="check" size={32} color="#1A56C4" width={2.6} />
                </div>
                <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: 26, color: "#0E1A2B", margin: "0 0 10px" }}>Thanks, we got it.</h2>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "#667085", margin: "0 0 22px" }}>A member of the team will reach out shortly. Need a faster answer? Call 512-617-9400.</p>
                <button onClick={reset} style={{ background: "#fff", color: "#1A56C4", border: "1.5px solid #D6DDE8", borderRadius: 999, padding: "12px 24px", fontWeight: 700, fontSize: 15, fontFamily: "inherit", cursor: "pointer" }}>Send another message</button>
              </div>
            ) : (
              <div>
                <div className="crow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input className="ci" type="text" placeholder="Your name" value={form.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input className="ci" type="tel" placeholder="(512) 555-0100" value={form.phone} onChange={set("phone")} />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Email</label>
                  <input className="ci" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Subject</label>
                  <input className="ci" type="text" placeholder="What's this about?" value={form.subject} onChange={set("subject")} />
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={labelStyle}>Message</label>
                  <textarea className="ci" rows={5} style={{ resize: "vertical" }} placeholder="Tell us about your deal or question" value={form.message} onChange={set("message")} />
                </div>
                <button onClick={submit} className="btn-primary" style={{ width: "100%", background: "#1A56C4", color: "#fff", border: "none", borderRadius: 999, padding: 16, fontWeight: 700, fontSize: 17, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Send message</button>
                <p style={{ fontSize: 13, color: "#98A2B3", textAlign: "center", margin: "14px 0 0" }}>We'll never share your information.</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <InfoCard icon="phone" label="Call">
              <a href="tel:512-617-9400" className="link-blue" style={{ fontFamily: SCH, fontWeight: 700, fontSize: 21, color: "#0E1A2B", textDecoration: "none" }}>512-617-9400</a>
            </InfoCard>
            <InfoCard icon="mail" label="Email">
              <a href="mailto:jack@usam.net" className="link-blue" style={{ fontWeight: 700, fontSize: 17, color: "#0E1A2B", textDecoration: "none" }}>jack@usam.net</a>
            </InfoCard>
            <InfoCard icon="mapPin" label="Main office">
              <div style={{ fontSize: 16, lineHeight: 1.6, color: "#0E1A2B", fontWeight: 600 }}>3821 Juniper Trace, Suite 210<br />Bee Cave, TX 78738</div>
            </InfoCard>
            <InfoCard icon="clock" label="Hours">
              <div style={{ fontSize: 16, lineHeight: 1.6, color: "#0E1A2B", fontWeight: 600 }}>Monday to Friday, 9 AM to 5 PM CT</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#667085", marginTop: 4 }}>After hours, leave a message and we'll call you back the next business day.</div>
            </InfoCard>
            <a href="https://www.openstreetmap.org/?mlat=30.3078075&mlon=-97.93361#map=17/30.3078/-97.93361" target="_blank" rel="noopener noreferrer" style={{ display: "block", borderRadius: 16, overflow: "hidden", border: "1px solid #E6E9EF" }}>
              <iframe
                title="USAM I Fund office, Bee Cave, TX"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-97.9396%2C30.3048%2C-97.9276%2C30.3108&layer=mapnik&marker=30.3078075%2C-97.93361"
                style={{ width: "100%", height: 160, border: 0, display: "block", pointerEvents: "none" }}
                loading="lazy"
              />
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
