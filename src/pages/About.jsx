import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import aboutBanner from "../assets/banners/about.webp";
import jackLiebermanImg from "../assets/team/jack-lieberman.webp";
import jackBrewerImg from "../assets/team/jack-brewer.webp";
import dustinImg from "../assets/team/dustin.webp";

const SCH = "'Schibsted Grotesk',sans-serif";

const VALUES = [
  ["Direct", "We are the lender", "No broker layer between you and a yes. We underwrite and fund, so decisions are fast and final."],
  ["Creative", "Deals that fit no box", "Complex scenarios are where we do our best work. We structure around the deal, not a rate sheet."],
  ["Personal", "Real people, every call", "A named team that picks up the phone and knows your deal from intro to payoff."],
];

const TEAM = [
  ["Jack Lieberman", "Founder", "jack@usam.net", jackLiebermanImg],
  ["Jack Brewer", "Loan Officer", "jackbrewer@usam.net", jackBrewerImg],
  ["Dustin Kinney", "Funder & Closer", "dustin@usam.net", dustinImg],
  ["Harrison String", "Loan Officer Assistant", "harrison@usam.net"],
  ["Krystle Garza", "Funder & Closer", "krystle@usam.net"],
  ["Roselea Payne", "Administrator", "roselea@usam.net"],
];

const STATS = [
  ["30 yrs", "lending experience"],
  ["5-7 days", "typical close"],
  ["$10M", "max loan size"],
  ["Most", "states served"],
];

const AVATAR_BG = [
  "linear-gradient(150deg,#1A56C4,#123E96)",
  "linear-gradient(150deg,#2C68D6,#1A56C4)",
];

function initials(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Branded monogram avatar. Stands in cleanly for a real headshot and swaps out
// for a photo when one is provided.
function Avatar({ name, i, img }) {
  if (img) {
    return (
      <div style={{ height: 220, background: AVATAR_BG[i % AVATAR_BG.length], overflow: "hidden" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>
    );
  }
  return (
    <div style={{ height: 220, background: AVATAR_BG[i % AVATAR_BG.length], display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: SCH, fontWeight: 800, fontSize: 60, color: "#fff", letterSpacing: "0.02em" }}>{initials(name)}</span>
    </div>
  );
}

export default function About() {
  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 56px" }}>
        <div className="about-hero" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>About USAM Fund</div>
            <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 18px" }}>A dedicated team with 30 years of experience.</h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "#475467", maxWidth: 560, margin: 0 }}>Based in Bee Cave, Texas and lending nationwide, we're a direct private lender built by people who've spent careers in real estate finance. We make our own decisions, fund our own loans, and treat every project with the respect it deserves, until you're satisfied.</p>
          </div>
          <div style={{ height: 320, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -20px rgba(14,26,43,0.3)" }}>
            <img src={aboutBanner} alt="The USAM Fund private lending team reviewing a real estate deal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="sec" style={{ background: "#fff", padding: "8px 32px 16px" }}>
        <div className="val-grid" style={{ maxWidth: 1100, margin: "0 auto", border: "1px solid #E6E9EF", borderRadius: 18, background: "#fff", boxShadow: "0 1px 2px rgba(14,26,43,0.04)", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {STATS.map(([v, l], i) => (
            <div key={i} style={{ padding: "26px 26px", borderRight: i < 3 ? "1px solid #EEF1F5" : "none" }}>
              <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 34, color: "#0E1A2B", letterSpacing: "-0.02em" }}>{v}</div>
              <div style={{ fontSize: 14.5, color: "#667085", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="sec" style={{ background: "#fff", padding: "24px 32px 56px" }}>
        <div className="val-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
          {VALUES.map(([word, title, body]) => (
            <div key={word} style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 34, color: "#1A56C4", letterSpacing: "-0.02em", marginBottom: 8 }}>{word}</div>
              <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 19, color: "#0E1A2B", margin: "0 0 8px" }}>{title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "#667085", margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="sec" style={{ background: "#fff", padding: "24px 32px 72px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 38 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>The team</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(30px,3.4vw,42px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#0E1A2B", margin: 0 }}>The people behind your loan.</h2>
          </div>

          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TEAM.map(([name, role, email, img], i) => (
              <div key={name} style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, overflow: "hidden" }}>
                <Avatar name={name} i={i} img={img} />
                <div style={{ padding: 22 }}>
                  <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 19, color: "#0E1A2B", margin: "0 0 3px" }}>{name}</h3>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1A56C4", marginBottom: 10 }}>{role}</div>
                  <a href={`mailto:${email}`} className="link-blue" style={{ fontSize: 14, color: "#667085", textDecoration: "none" }}>{email}</a>
                </div>
              </div>
            ))}

            <div style={{ background: "linear-gradient(150deg,#123E96,#1A56C4)", borderRadius: 16, padding: 26, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 21, color: "#fff", margin: "0 0 8px" }}>Want to talk to a person?</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#D6E2FA", margin: "0 0 18px" }}>Reach the team directly. We answer the phone.</p>
              <Link to="/contact" className="btn-white" style={{ display: "inline-block", alignSelf: "flex-start", background: "#fff", color: "#123E96", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "12px 22px", borderRadius: 999 }}>Contact us</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Ready to fund your next deal?" text="Get a real rate in minutes, with no obligation and no hard credit pull to start." />

      <Footer />
    </div>
  );
}
