import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import Faq from "../components/Faq.jsx";
import JsonLd, { faqPageSchema, breadcrumbSchema, loanSchema } from "../components/JsonLd.jsx";
import { programs, bySlug } from "../data/programs.js";
import { programFaqs } from "../data/faqs.js";
import { guides } from "../data/guides.js";
import { cityPrograms } from "../data/cityPrograms.js";
import CalculatorCta from "../components/CalculatorCta.jsx";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function ProgramDetail({ slug }) {
  const p = bySlug[slug];
  const others = programs.filter((x) => x.slug !== slug);
  const faqs = programFaqs[slug] || [];
  const relatedGuides = guides.filter((g) => (g.related || []).includes(slug)).slice(0, 4);
  // City-specific pages for this program (e.g. all the fix-and-flip metros).
  const cityLinks = cityPrograms.filter((c) => c.program === slug);

  return (
    <div>
      <Header />
      {faqs.length > 0 && (
        <JsonLd id={`faq-${slug}-schema`} data={faqPageSchema(faqs)} />
      )}
      <JsonLd id={`breadcrumb-${slug}`} data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Programs", path: "/programs" },
        { name: p.title, path: `/programs/${slug}` },
      ])} />
      <JsonLd id={`loan-${slug}-schema`} data={loanSchema(p)} />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 48px" }}>
        <div className="ph-hero" style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ flex: "none", width: 54, height: 54, borderRadius: 14, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={p.icon} size={27} color="#1A56C4" />
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A97A8" }}>Program {p.num}</span>
            </div>
            <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(36px,4.6vw,56px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 14px" }}>{p.title}</h1>
            <p style={{ fontSize: 19, fontWeight: 600, color: "#1A56C4", margin: "0 0 18px" }}>{p.tagline}</p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#475467", maxWidth: 560, margin: "0 0 30px" }}>{p.desc}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <Link to="/apply" className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "15px 28px", borderRadius: 999, boxShadow: "0 6px 20px rgba(26,86,196,0.28)" }}>{p.applyLabel}</Link>
              <Link to="/contact" className="btn-outline" style={{ background: "#fff", color: "#0E1A2B", textDecoration: "none", fontWeight: 700, fontSize: 17, padding: "14px 26px", borderRadius: 999, border: "1.5px solid #D6DDE8" }}>Talk to us</Link>
            </div>
          </div>
          <div className="ph-heroimg" style={{ height: 380, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -20px rgba(14,26,43,0.3)" }}>
            <img src={p.heroImg} alt={`${p.title} loan — ${p.tagline}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="sec" style={{ background: "#fff", padding: "0 32px 8px" }}>
        <div className="ph-stats" style={{ maxWidth: 1140, margin: "0 auto", border: "1px solid #E6E9EF", borderRadius: 18, background: "#fff", boxShadow: "0 1px 2px rgba(14,26,43,0.04)", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {p.stats.map(([value, label], i) => (
            <div key={i} style={{ padding: "26px 24px", borderRight: i < 3 ? "1px solid #EEF1F5" : "none" }}>
              <div style={{ fontFamily: SCH, fontWeight: 800, fontSize: 30, color: "#0E1A2B", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: 14, color: "#667085", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works + terms */}
      <section className="sec" style={{ background: "#fff", padding: "48px 32px 64px" }}>
        <div className="ph-main" style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 48, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>How it works</h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "#475467", margin: "0 0 30px", maxWidth: 580 }}>{p.how}</p>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A97A8", marginBottom: 18 }}>Who it's for</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 560 }}>
              {p.who.map((w, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name="check" size={18} color="#1A56C4" width={2.6} />
                  <span style={{ fontSize: 16, color: "#0E1A2B", fontWeight: 600 }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ph-termcard" style={{ position: "sticky", top: 96, background: "#F6F8FB", border: "1px solid #E6E9EF", borderRadius: 18, padding: 26 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A97A8", marginBottom: 18 }}>Typical terms</div>
            <div>
              {p.terms.map(([label, value], i) => {
                const last = i === p.terms.length - 1;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingBottom: last ? 0 : 13, borderBottom: last ? "none" : "1px solid #EEF1F5", marginBottom: last ? 0 : 13 }}>
                    <span style={{ fontSize: 14.5, color: "#667085" }}>{label}</span>
                    <span style={{ fontFamily: SCH, fontWeight: 700, fontSize: 15.5, color: "#0E1A2B", textAlign: "right" }}>{value}</span>
                  </div>
                );
              })}
            </div>
            <Link to="/apply" className="btn-primary" style={{ display: "block", textAlign: "center", marginTop: 22, background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: 14, borderRadius: 999 }}>Get my rate</Link>
            <p style={{ fontSize: 12, color: "#98A2B3", textAlign: "center", margin: "12px 0 0", lineHeight: 1.4 }}>*Typical terms, subject to underwriting and market conditions.</p>
          </div>
        </div>
      </section>

      {/* Calculator CTA — only for programs that have a related calculator */}
      <CalculatorCta programSlug={slug} programTitle={p.title} />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="sec" style={{ background: "#fff", padding: "8px 32px 64px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>FAQ</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 18px" }}>{p.title} questions, answered.</h2>
            <Faq items={faqs} />
            <div style={{ marginTop: 26 }}>
              <Link to="/faq" className="link-blue" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 700, color: "#1A56C4", textDecoration: "none" }}>
                See all frequently asked questions
                <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <section className="sec" style={{ background: "#fff", padding: "8px 32px 64px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>Resources</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 22px" }}>Guides for {p.title}</h2>
            <div className="ph-other" style={{ display: "grid", gridTemplateColumns: relatedGuides.length >= 2 ? "repeat(2,1fr)" : "1fr", gap: 14 }}>
              {relatedGuides.map((g) => (
                <Link key={g.slug} to={`/resources/${g.slug}`} className="card-link" style={{ textDecoration: "none", display: "block", background: "#fff", border: "1px solid #E6E9EF", borderRadius: 14, padding: "20px 22px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 8 }}>{g.category} · {g.readMins} min read</div>
                  <div style={{ fontFamily: SCH, fontWeight: 700, fontSize: 17, lineHeight: 1.25, color: "#0E1A2B", marginBottom: 10 }}>{g.title}</div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "#1A56C4" }}>
                    Read the guide <Icon name="chevronRight" size={14} color="#1A56C4" width={2.6} />
                  </span>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 22 }}>
              <Link to="/resources" className="link-blue" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 700, color: "#1A56C4", textDecoration: "none" }}>
                Browse all guides
                <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Other programs */}
      <section className="sec" style={{ background: "#F6F8FB", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ marginBottom: 30 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>Explore more</div>
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#0E1A2B", margin: 0 }}>Other programs</h2>
          </div>
          <div className="ph-other" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {others.map((o) => (
              <Link key={o.slug} to={`/programs/${o.slug}`} className="card-link" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid #E6E9EF", borderRadius: 14, padding: "18px 20px" }}>
                <span style={{ flex: "none", width: 42, height: 42, borderRadius: 11, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={o.icon} size={21} color="#1A56C4" />
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: SCH, fontWeight: 700, fontSize: 16, color: "#0E1A2B" }}>{o.title}</span>
                  <span style={{ display: "block", fontSize: 13, color: "#8A97A8", marginTop: 2 }}>{o.short}</span>
                </span>
                <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {cityLinks.length > 0 && (
        <section className="sec" style={{ background: "#F6F8FB", padding: "40px 32px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", marginBottom: 14 }}>{p.title} by market</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {cityLinks.map((c) => (
                <Link key={c.slug} to={`/${c.slug}`} className="card-link" style={{ fontSize: 14.5, fontWeight: 700, color: "#1A56C4", background: "#fff", border: "1px solid #DCE6F9", padding: "10px 16px", borderRadius: 999, textDecoration: "none" }}>
                  {c.region} {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={p.ctaTitle}
        text="Get a real rate in minutes. No obligation, no hard credit pull to start."
      />

      <Footer />
    </div>
  );
}
