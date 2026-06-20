import { useState } from "react";
import Icon from "./Icon.jsx";

const SCH = "'Schibsted Grotesk',sans-serif";

// Accessible accordion list of question/answer pairs. `a` may contain inline
// HTML (links, <strong>), rendered via dangerouslySetInnerHTML — content is
// authored in-repo, never user input. Answers stay open-on-click; multiple can
// be open at once so the page reads well when expanded for AEO.
export default function Faq({ items }) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="faq-list">
      {items.map(({ q, a }, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={i}
            className="faq-item"
            style={{
              borderBottom: "1px solid #E6E9EF",
            }}
          >
            <button
              className="faq-q"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "22px 4px",
                textAlign: "left",
                fontFamily: SCH,
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1.35,
                color: "#0E1A2B",
              }}
            >
              <span itemProp="name">{q}</span>
              <span
                className="faq-chev"
                style={{
                  flex: "none",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: isOpen ? "#1A56C4" : "#EEF3FC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .16s ease, transform .2s ease",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <Icon
                  name="chevronDown"
                  size={16}
                  color={isOpen ? "#fff" : "#1A56C4"}
                  width={2.6}
                />
              </span>
            </button>
            {isOpen && (
              <div
                className="faq-a"
                style={{
                  padding: "0 4px 24px",
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "#475467",
                  maxWidth: 760,
                }}
                dangerouslySetInnerHTML={{ __html: a }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
