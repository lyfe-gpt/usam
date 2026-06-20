import { useEffect } from "react";

// Injects a JSON-LD <script> into <head> for the life of the component.
// Answer engines (Google AI Overviews, Perplexity, etc.) and rich-result
// crawlers read these blocks, so each FAQ surface ships matching structured
// data. `data` is any schema.org object; `id` dedupes on remount.
export default function JsonLd({ data, id }) {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    if (id) el.id = id;
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, [data, id]);

  return null;
}

// Builds a schema.org FAQPage object from a list of { q, a } items.
// `a` may contain light HTML; we strip tags for the structured-data answer
// so engines get clean text.
export function faqPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a.replace(/<[^>]+>/g, "").trim(),
      },
    })),
  };
}
