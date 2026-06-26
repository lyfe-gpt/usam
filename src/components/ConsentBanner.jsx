import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hasDecided, grantConsent, denyConsent, gpcEnabled } from "../lib/analytics.js";

// Privacy-first cookie banner. Nothing analytics/advertising-related loads
// until the visitor clicks Accept. If the browser sends a Global Privacy
// Control signal, we treat that as a decline and never show the banner.
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (gpcEnabled()) {
      denyConsent();
      return;
    }
    if (!hasDecided()) setShow(true);
  }, []);

  if (!show) return null;

  const accept = () => {
    grantConsent();
    setShow(false);
  };
  const decline = () => {
    denyConsent();
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie and privacy preferences"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        maxWidth: 720,
        margin: "0 auto",
        background: "#0E1A2B",
        color: "#E8EDF4",
        border: "1px solid #1F3252",
        borderRadius: 14,
        boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
        padding: "18px 20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 14,
      }}
    >
      <p style={{ margin: 0, flex: "1 1 280px", fontSize: 14, lineHeight: 1.5 }}>
        We use cookies for analytics and advertising to understand traffic and measure our marketing. You can
        accept or decline. See our{" "}
        <Link to="/privacy" style={{ color: "#7FB0FF", fontWeight: 600 }}>
          Privacy Policy
        </Link>
        .
      </p>
      <div style={{ display: "flex", gap: 10, flex: "0 0 auto" }}>
        <button
          onClick={decline}
          style={{
            background: "transparent",
            color: "#C7D2E2",
            border: "1px solid #33496B",
            borderRadius: 8,
            padding: "10px 18px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            background: "#1A56C4",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
