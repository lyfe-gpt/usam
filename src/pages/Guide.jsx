import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import Faq from "../components/Faq.jsx";
import JsonLd, { articleSchema, breadcrumbSchema, faqPageSchema } from "../components/JsonLd.jsx";
import { guideBySlug } from "../data/guides.js";
import { bySlug as programBySlug } from "../data/programs.js";
import { sanitizeHtml } from "../lib/sanitize.js";

const SCH = "'Schibsted Grotesk',sans-serif";

export default function Guide({ slug }) {
  const g = guideBySlug[slug];
  if (!g) return <Navigate to="/resources" replace />;

  const related = (g.related || []).map((s) => programBySlug[s]).filter(Boolean);

  return (
    <div>
      <Header />
      <JsonLd id={`article-${slug}`} data={articleSchema({ title: g.title, description: g.description, path: `/resources/${slug}`, datePublished: g.datePublished })} />
      <JsonLd id={`breadcrumb-${slug}`} data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
        { name: g.title, path: `/resources/${slug}` },
      ])} />

      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "40px 32px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "#8A97A8", marginBottom: 22 }}>
            <Link to="/" className="link-blue" style={{ color: "#667085", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link to="/resources" className="link-blue" style={{ color: "#667085", textDecoration: "none" }}>Resources</Link>
          </nav>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>{g.category} · {g.readMins} min read</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(30px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 8px" }}>{g.title}</h1>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff", padding: "8px 32px 56px" }}>
        <div className="guide-body" style={{ maxWidth: 760, margin: "0 auto" }} dangerouslySetInnerHTML={{ __html: sanitizeHtml(g.body) }} />

        {g.faqs && g.faqs.length > 0 && (
          <div style={{ maxWidth: 760, margin: "44px auto 0" }}>
            <JsonLd id={`faq-${slug}`} data={faqPageSchema(g.faqs)} />
            <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(22px,2.6vw,28px)", color: "#0E1A2B", margin: "0 0 18px" }}>Frequently asked</h2>
            <Faq items={g.faqs} />
          </div>
        )}

        {related.length > 0 && (
          <div style={{ maxWidth: 760, margin: "40px auto 0" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A97A8", marginBottom: 16 }}>Related programs</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {related.map((p) => (
                <Link key={p.slug} to={`/programs/${p.slug}`} className="card-link" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #E6E9EF", borderRadius: 12, padding: "12px 16px", textDecoration: "none" }}>
                  <span style={{ flex: "none", width: 34, height: 34, borderRadius: 9, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={p.icon} size={18} color="#1A56C4" />
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#0E1A2B" }}>{p.title}</span>
                  <Icon name="chevronRight" size={15} color="#1A56C4" width={2.6} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <CtaBand title="Ready to put this to work?" text="Get a real rate in minutes. No obligation, no hard credit pull to start." />
      <Footer />
    </div>
  );
}
