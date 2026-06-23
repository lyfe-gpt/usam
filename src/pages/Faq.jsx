import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Icon from "../components/Icon.jsx";
import Faq from "../components/Faq.jsx";
import JsonLd, { faqPageSchema } from "../components/JsonLd.jsx";
import { programs } from "../data/programs.js";
import { generalFaqs, programFaqs } from "../data/faqs.js";
import { guides } from "../data/guides.js";

const SCH = "'Schibsted Grotesk',sans-serif";

// Resource (guide) FAQs are grouped under the program they relate to, so the
// main FAQ page is the comprehensive hub: program answers first, then the
// deeper question set from our guides, each linking back to the full guide.
const PROGRAM_SLUGS = programs.map((p) => p.slug);
const guidesByProgram = {};
guides
  .filter((g) => g.category !== "For Partners")
  .forEach((g) => {
    const prog = (g.related || []).find((r) => PROGRAM_SLUGS.includes(r));
    if (prog) (guidesByProgram[prog] = guidesByProgram[prog] || []).push(g);
  });

// Display items for a program's guide FAQs: append a subtle link to the source
// guide so a reader can jump to the full article. The link text is excluded
// from structured data (schema is built from the raw q/a below).
function guideDisplayItems(slug) {
  return (guidesByProgram[slug] || []).flatMap((g) =>
    (g.faqs || []).map((f) => ({
      q: f.q,
      a: `${f.a} <a href="/resources/${g.slug}" class="faq-src">Full guide: ${g.title}</a>`,
    }))
  );
}

// Every Q/A on the page, flattened for a single FAQPage structured-data block
// so answer engines can index the whole set from one document. Raw answers
// (no appended links) keep the schema text clean.
const allFaqs = [
  ...generalFaqs,
  ...programs.flatMap((p) => programFaqs[p.slug] || []),
  ...guides
    .filter((g) => g.category !== "For Partners")
    .flatMap((g) => g.faqs || []),
];

const sections = [
  { id: "general", label: "General", title: "General questions", items: generalFaqs, guideItems: [] },
  ...programs.map((p) => ({
    id: p.slug,
    label: p.navTitle,
    title: p.title,
    items: programFaqs[p.slug] || [],
    guideItems: guideDisplayItems(p.slug),
  })),
];

function Section({ id, title, eyebrow, items, guideItems }) {
  return (
    <section
      id={id}
      className="sec"
      style={{ background: "#fff", padding: "16px 32px 24px", scrollMarginTop: 96 }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 10 }}>{eyebrow}</div>
        <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 18px" }}>{title}</h2>
        <Faq items={items} />
        {guideItems.length > 0 && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", margin: "26px 0 4px" }}>From our guides</div>
            <Faq items={guideItems} />
          </>
        )}
      </div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <div>
      <Header />
      <JsonLd id="faq-page-schema" data={faqPageSchema(allFaqs)} />

      {/* Hero */}
      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "72px 32px 28px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 14 }}>Help center</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(38px,4.6vw,58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 16px" }}>Questions, answered.</h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475467", maxWidth: 620, margin: 0 }}>How private lending works, what each program offers, and what it takes to get funded.</p>

          {/* Jump nav */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="faq-pill" style={{ fontSize: 14, fontWeight: 700, color: "#1A56C4", background: "#EEF3FC", border: "1px solid #DCE6F9", padding: "9px 16px", borderRadius: 999, textDecoration: "none" }}>{s.label}</a>
            ))}
          </div>
        </div>
      </section>

      {sections.map((s) => (
        <Section
          key={s.id}
          id={s.id}
          title={s.title}
          eyebrow={s.id === "general" ? "Start here" : "Program FAQ"}
          items={s.items}
          guideItems={s.guideItems}
        />
      ))}

      {/* Still have questions */}
      <section className="sec" style={{ background: "#fff", padding: "56px 32px 56px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(150deg,#123E96,#1A56C4)", borderRadius: 20, padding: "36px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 520 }}>
              <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(22px,2.6vw,30px)", color: "#fff", margin: "0 0 8px", letterSpacing: "-0.01em" }}>Still have a question?</h2>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "#D6E2FA", margin: 0 }}>Run your scenario by us. No obligation, and no hard credit pull to get a real answer.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn-white" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#123E96", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "14px 24px", borderRadius: 999 }}>Contact us</Link>
              <a href="tel:512-488-6087" className="btn-ghost-light" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "13px 22px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.5)" }}>
                <Icon name="phone" size={18} color="#fff" filled />
                Call us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
