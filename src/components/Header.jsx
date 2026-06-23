import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import { programs } from "../data/programs.js";

const SCH = "'Schibsted Grotesk',sans-serif";

function navColor(active, key) {
  if (active === key) return "#1A56C4";
  return key === "home" ? "#0E1A2B" : "#475467";
}

export default function Header() {
  const { pathname } = useLocation();
  const active =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/programs")
      ? "programs"
      : pathname.startsWith("/about")
      ? "about"
      : pathname.startsWith("/resources")
      ? "resources"
      : pathname.startsWith("/partners")
      ? "partners"
      : pathname.startsWith("/faq")
      ? "faq"
      : pathname.startsWith("/contact")
      ? "contact"
      : "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);

  return (
    <div className="hdr">
      {/* Utility bar */}
      <div style={{ background: "#0E1A2B", color: "#AEB9C9", fontSize: 13, letterSpacing: "0.01em" }}>
        <div
          className="hdr-sec"
          style={{ maxWidth: 1240, margin: "0 auto", padding: "9px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
            <span style={{ flex: "none", display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#C9362E" }} />
            <span className="u-tagline">Direct private lending, nationwide in all 50 states</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 22, flex: "none" }}>
            <a href="tel:512-488-6087" style={{ color: "#E7ECF3", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>512-488-6087</a>
            <a href="mailto:jack@usam.net" className="u-email" style={{ color: "#AEB9C9", textDecoration: "none" }}>jack@usam.net</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: "1px solid #E6E9EF" }}>
        <div
          className="hdr-sec"
          style={{ maxWidth: 1240, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img
              src="https://lirp.cdn-website.com/e6bfcade/dms3rep/multi/opt/horizontal+raw+PSD+file-314w.png"
              alt="USAM Fund"
              className="u-logo"
              style={{ height: 46, width: "auto", display: "block" }}
            />
          </Link>

          <nav className="u-nav" style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 15, fontWeight: 600 }}>
            <Link to="/" className="nav-lnk" style={{ color: navColor(active, "home"), textDecoration: "none" }}>Home</Link>

            <div className="nav-dd" style={{ position: "relative" }}>
              <Link to="/programs" className="nav-lnk" style={{ display: "flex", alignItems: "center", gap: 5, color: navColor(active, "programs"), textDecoration: "none" }}>
                Programs
                <Icon name="chevronDown" size={14} color="currentColor" width={2.4} className="nav-dd-chev" />
              </Link>
              <div className="nav-dd-wrap">
                <div
                  className="nav-dd-card"
                  style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 18, boxShadow: "0 28px 60px -18px rgba(14,26,43,0.32)", padding: 14, width: 900, display: "grid", gridTemplateColumns: "218px 1fr", gap: 14 }}
                >
                  <Link to="/apply" style={{ position: "relative", borderRadius: 13, overflow: "hidden", display: "block", textDecoration: "none", minHeight: 248 }}>
                    <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80" alt="Investment property financing" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,26,43,0.15) 0%, rgba(14,26,43,0.88) 100%)" }} />
                    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 18 }}>
                      <div style={{ fontFamily: SCH, fontWeight: 700, fontSize: 18, color: "#fff", lineHeight: 1.15, marginBottom: 8 }}>Not sure which loan fits?</div>
                      <div style={{ fontSize: 13, color: "#C9D6EA", lineHeight: 1.4, marginBottom: 14 }}>Answer a few questions and get a real rate in minutes.</div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1A56C4", color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 15px", borderRadius: 999 }}>
                        Get my rate
                        <Icon name="chevronRight" size={13} color="#fff" width={2.8} />
                      </span>
                    </div>
                  </Link>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                    {programs.map((p) => (
                      <Link key={p.slug} to={`/programs/${p.slug}`} className="nav-dd-item" style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: 11, borderRadius: 11, textDecoration: "none", transition: "background .14s ease" }}>
                        <span style={{ flex: "none", width: 36, height: 36, borderRadius: 9, background: "#EEF3FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name={p.icon} size={18} color="#1A56C4" />
                        </span>
                        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#0E1A2B" }}>{p.navTitle}</span>
                          <span style={{ fontSize: 12, fontWeight: 500, color: "#8A97A8", lineHeight: 1.3 }}>{p.navSub}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/about" className="nav-lnk" style={{ color: navColor(active, "about"), textDecoration: "none" }}>About</Link>
            <Link to="/resources" className="nav-lnk" style={{ color: navColor(active, "resources"), textDecoration: "none" }}>Resources</Link>
            <Link to="/partners" className="nav-lnk" style={{ color: navColor(active, "partners"), textDecoration: "none" }}>Partners</Link>
            <Link to="/faq" className="nav-lnk" style={{ color: navColor(active, "faq"), textDecoration: "none" }}>FAQ</Link>
            <Link to="/contact" className="nav-lnk" style={{ color: navColor(active, "contact"), textDecoration: "none" }}>Contact</Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div className="phone-dd u-phone" style={{ position: "relative" }}>
              <a href="tel:512-488-6087" className="phone-icon-btn" aria-label="Call us at 512-488-6087" style={{ width: 46, height: 46, borderRadius: "50%", background: "#F3F1E9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <Icon name="phone" size={23} color="#0E1A2B" filled />
              </a>
              <div className="phone-dd-wrap">
                <div className="phone-dd-card" style={{ background: "#fff", border: "1px solid #E6E9EF", borderRadius: 16, boxShadow: "0 24px 50px -16px rgba(14,26,43,0.28)", padding: "20px 24px", width: "max-content" }}>
                  <div style={{ fontSize: 16, color: "#475467", fontWeight: 500, whiteSpace: "nowrap" }}>
                    Call us anytime at{" "}
                    <a href="tel:512-488-6087" className="link-blue" style={{ color: "#0E1A2B", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>512-488-6087</a>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/apply" className="btn-primary" style={{ background: "#1A56C4", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "11px 22px", borderRadius: 999, boxShadow: "0 1px 2px rgba(26,86,196,0.4)" }}>Apply now</Link>
            <button className="u-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu" style={{ display: "none", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 11, border: "1px solid #E6E9EF", background: "#fff", cursor: "pointer", padding: 0 }}>
              <Icon name="menu" size={22} color="#0E1A2B" width={2.2} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="u-menu" style={{ borderTop: "1px solid #E6E9EF", background: "#fff" }}>
            <div className="hdr-sec" style={{ maxWidth: 1240, margin: "0 auto", padding: "12px 32px 22px", display: "flex", flexDirection: "column" }}>
              <Link to="/" onClick={() => setMenuOpen(false)} style={{ padding: "14px 6px", color: "#0E1A2B", textDecoration: "none", fontWeight: 600, fontSize: 16, borderBottom: "1px solid #F1F3F7" }}>Home</Link>
              <div style={{ borderBottom: "1px solid #F1F3F7" }}>
                <button onClick={() => setProgOpen((v) => !v)} aria-label="Programs" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 6px", background: "none", border: "none", cursor: "pointer", color: "#0E1A2B", fontWeight: 600, fontSize: 16, fontFamily: "inherit", textAlign: "left" }}>
                  Programs
                  <Icon name="chevronDown" size={16} color="#8A97A8" width={2.4} style={{ transform: progOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .18s ease" }} />
                </button>
                {progOpen && (
                  <div style={{ display: "flex", flexDirection: "column", padding: "2px 4px 12px" }}>
                    {programs.map((p) => (
                      <Link key={p.slug} to={`/programs/${p.slug}`} onClick={() => setMenuOpen(false)} className="prog-sub" style={{ padding: "10px 14px", color: "#475467", textDecoration: "none", fontWeight: 600, fontSize: 14.5 }}>{p.title}</Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/about" onClick={() => setMenuOpen(false)} style={{ padding: "14px 6px", color: "#0E1A2B", textDecoration: "none", fontWeight: 600, fontSize: 16, borderBottom: "1px solid #F1F3F7" }}>About</Link>
              <Link to="/resources" onClick={() => setMenuOpen(false)} style={{ padding: "14px 6px", color: "#0E1A2B", textDecoration: "none", fontWeight: 600, fontSize: 16, borderBottom: "1px solid #F1F3F7" }}>Resources</Link>
              <Link to="/partners" onClick={() => setMenuOpen(false)} style={{ padding: "14px 6px", color: "#0E1A2B", textDecoration: "none", fontWeight: 600, fontSize: 16, borderBottom: "1px solid #F1F3F7" }}>Partners</Link>
              <Link to="/faq" onClick={() => setMenuOpen(false)} style={{ padding: "14px 6px", color: "#0E1A2B", textDecoration: "none", fontWeight: 600, fontSize: 16, borderBottom: "1px solid #F1F3F7" }}>FAQ</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} style={{ padding: "14px 6px", color: "#0E1A2B", textDecoration: "none", fontWeight: 600, fontSize: 16, borderBottom: "1px solid #F1F3F7" }}>Contact</Link>
              <a href="tel:512-488-6087" style={{ padding: "14px 6px", color: "#475467", textDecoration: "none", fontWeight: 600, fontSize: 15 }}>Call 512-488-6087</a>
              <Link to="/apply" onClick={() => setMenuOpen(false)} style={{ marginTop: 12, background: "#1A56C4", color: "#fff", textAlign: "center", padding: 15, borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>Apply now</Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
