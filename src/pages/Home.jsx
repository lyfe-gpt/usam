import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import { programs } from "../data/programs.js";
import heroVideoWebm from "../assets/home-hero.webm";
import heroVideoMp4 from "../assets/home-hero.mp4";
import heroPoster from "../assets/home-hero-poster.jpg";

const SCH = "'Schibsted Grotesk',sans-serif";

const STEPS = [
  ["STEP 01", "Tell us about your deal", "Answer a few quick questions about the property and the numbers. About two minutes, no credit pull to start."],
  ["STEP 02", "Get a same-day term sheet", "A real underwriter reviews your scenario and sends clear terms: rate, leverage, and structure, in plain English."],
  ["STEP 03", "Close in 5-7 days", "We handle docs and funding fast so you hit your contract date, and we're here for the next deal too."],
];

const WHY = [
  ["Direct capital", "We fund our own loans, with no middleman slowing down your close."],
  ["Creative structure", "Deals that don't fit a box are where we do our best work."],
  ["30 years in", "Three decades financing real estate through every market."],
  ["Real people", "A named team that answers the phone and knows your deal."],
];

const STATS = [
  ["$500M+", "funded to date"],
  ["2,000+", "loans closed"],
  ["50", "states served"],
  ["30 yrs", "lending experience"],
];

export default function Home() {
  const videoRef = useRef(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let timer;
    const setRate = () => {
      v.playbackRate = 0.75;
    };
    const onEnded = () => {
      timer = setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
      }, 2000);
    };
    setRate();
    v.addEventListener("loadedmetadata", setRate);
    v.addEventListener("play", setRate);
    v.addEventListener("ended", onEnded);
    return () => {
      clearTimeout(timer);
      v.removeEventListener("loadedmetadata", setRate);
      v.removeEventListener("play", setRate);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div>
      <Header />

      {/* Hero */}
      <section id="top" className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 70%)", padding: "72px 32px 64px" }}>
        <div className="u-hero" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#EEF3FC", border: "1px solid #DCE6F9", color: "#1A56C4", fontWeight: 700, fontSize: 12.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: "7px 14px", borderRadius: 999, marginBottom: 26 }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#1A56C4" }} />
              Private &amp; hard-money lending
            </div>
            <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(44px,5.4vw,76px)", lineHeight: 0.98, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 22px" }}>
              Hard money.<br /><span style={{ color: "#1A56C4" }}>Soft terms.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 540, margin: "0 0 34px" }}>A direct private lending partner financing real estate investors, operators, and developers across the country. Fast closings, flexible structure, and real people who answer the phone.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 26 }}>
              <Link to="/apply" className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "16px 30px", borderRadius: 999, boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>Get my rate</Link>
              <Link to="/programs" className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "15px 28px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>See loan programs</Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", fontSize: 14.5, fontWeight: 600, color: "#667085" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="check" size={17} color="#1A56C4" width={2.4} /> Close in as few as 5-7 days</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="check" size={17} color="#1A56C4" width={2.4} /> Loans up to $10M</span>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div className="u-heroimg" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -20px rgba(14,26,43,0.34)", background: "#0E1A2B" }}>
              <video
                ref={videoRef}
                poster={heroPoster}
                autoPlay
                muted
                playsInline
                aria-label="Renovated residential property"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={heroVideoWebm} type="video/webm" />
                <source src={heroVideoMp4} type="video/mp4" />
              </video>
            </div>
            <div className="u-termcard" style={{ position: "absolute", left: -26, bottom: -26, width: 280, background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, boxShadow: "0 18px 44px -14px rgba(14,26,43,0.28)", padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A97A8" }}>Sample term sheet</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1A56C4", background: "#EEF3FC", padding: "3px 9px", borderRadius: 999 }}>Fix &amp; Flip</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><span style={{ fontSize: 14, color: "#667085" }}>Purchase</span><span style={{ fontFamily: SCH, fontWeight: 700, fontSize: 17, color: "#0E1A2B" }}>up to 90%</span></div>
                <div style={{ height: 1, background: "#EEF1F5" }} />
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><span style={{ fontSize: 14, color: "#667085" }}>Rehab</span><span style={{ fontFamily: SCH, fontWeight: 700, fontSize: 17, color: "#0E1A2B" }}>up to 100%</span></div>
                <div style={{ height: 1, background: "#EEF1F5" }} />
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><span style={{ fontSize: 14, color: "#667085" }}>Funds in</span><span style={{ fontFamily: SCH, fontWeight: 800, fontSize: 17, color: "#1A56C4" }}>48 hrs</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="sec" style={{ background: "#fff", padding: "8px 32px 48px" }}>
        <div className="u-stats" style={{ maxWidth: 1240, margin: "0 auto", border: "1px solid #E6E9EF", borderRadius: 18, background: "#fff", boxShadow: "0 1px 2px rgba(14,26,43,0.04)", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {STATS.map(([v, l], i) => (
            <div key={i} style={{ padding: "30px 28px", borderRight: i < 3 ? "1px solid #EEF1F5" : "none" }}>
              <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 38, color: "#0E1A2B", letterSpacing: "-0.02em" }}>{v}</div>
              <div style={{ fontSize: 14.5, color: "#667085", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs preview */}
      <section id="programs" className="sec" style={{ background: "#fff", padding: "72px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 46 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Our programs</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(32px,3.8vw,46px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>Financing for every play.</h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "#475467", margin: 0 }}>A full lineup of programs covering acquisition through exit. If your deal doesn't fit a box, we'll structure something that does.</p>
          </div>

          <div className="u-prog" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {programs.map((p) => (
              <Link key={p.slug} to={`/programs/${p.slug}`} className="card-prog" style={{ textDecoration: "none", display: "block", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, padding: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 11, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon name={p.icon} size={24} color="#1A56C4" />
                </div>
                <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 21, color: "#0E1A2B", margin: "0 0 8px" }}>{p.homeTitle}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: "#667085", margin: "0 0 16px" }}>{p.homeDesc}</p>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5, fontWeight: 700, color: "#1A56C4" }}>
                  Learn more <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="sec" style={{ background: "#0E1A2B", color: "#E7ECF3", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 52 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6FA0F0", marginBottom: 14 }}>How it works</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(32px,3.8vw,46px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 16px" }}>Funding in three simple steps.</h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "#AEB9C9", margin: 0 }}>No portals to fight, no week of silence. Just a quick conversation and a clear answer.</p>
          </div>

          <div className="u-steps" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {STEPS.map(([step, title, body]) => (
              <div key={step}>
                <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 15, color: "#6FA0F0", letterSpacing: "0.04em" }}>{step}</div>
                <div style={{ height: 1, background: "#21324A", margin: "16px 0 20px" }} />
                <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 23, color: "#fff", margin: "0 0 10px" }}>{title}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "#AEB9C9", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 44 }}>
            <Link to="/apply" className="btn-primary-bright" style={{ display: "inline-block", background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "16px 30px", borderRadius: 999, boxShadow: "0 6px 20px rgba(26,86,196,0.4)" }}>Get my rate</Link>
          </div>
        </div>
      </section>

      {/* Why USAM */}
      <section id="about" className="sec" style={{ background: "#fff", padding: "80px 32px" }}>
        <div className="u-why" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Why USAM</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(32px,3.8vw,46px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 18px" }}>A lender that thinks like an investor.</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#475467", margin: "0 0 28px" }}>We're a direct private lender, not a broker. That means we make the decisions, we move on our own timeline, and we treat every project with the respect it deserves, until you're satisfied.</p>
            <Link to="/about" className="btn-primary" style={{ display: "inline-block", background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "15px 28px", borderRadius: 999 }}>More about us</Link>
          </div>
          <div className="u-why2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {WHY.map(([title, body]) => (
              <div key={title} style={{ background: "#F6F8FB", border: "1px solid #EEF1F5", borderRadius: 14, padding: 24 }}>
                <h3 style={{ fontFamily: SCH, fontWeight: 700, fontSize: 18, color: "#0E1A2B", margin: "0 0 8px" }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#667085", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="sec" style={{ background: "#F6F8FB", padding: "72px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 56, lineHeight: 0.5, color: "#1A56C4", marginBottom: 6 }}>“</div>
          <p style={{ fontFamily: SCH, fontWeight: 600, fontSize: "clamp(24px,3vw,32px)", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#0E1A2B", margin: "0 0 26px" }}>They funded our flip in six days when two banks had already passed. USAM is the first call on every deal now.</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(150deg,#1A56C4,#123E96)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <span style={{ fontFamily: SCH, fontWeight: 800, fontSize: 18, color: "#fff" }}>M</span>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 15.5, color: "#0E1A2B" }}>Marcus R.</div>
              <div style={{ fontSize: 14, color: "#667085" }}>Fix &amp; flip investor · Austin, TX</div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a deal on the table?"
        text="Get a real rate in minutes. No obligation, no hard credit pull to start."
        maxWidth={1240}
        padding="60px 56px"
        titleClamp="clamp(30px,3.6vw,44px)"
        uClass
      />

      <Footer />
    </div>
  );
}
