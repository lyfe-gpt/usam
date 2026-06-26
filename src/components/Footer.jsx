import { Link } from "react-router-dom";
import { programs } from "../data/programs.js";

const head = { fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", marginBottom: 16 };
const lnk = { color: "#AEB9C9", textDecoration: "none" };

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr" style={{ background: "#0E1A2B", color: "#AEB9C9", padding: "64px 32px 36px" }}>
      <div className="ftr-sec" style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="ftr-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid #21324A" }}>
          <div>
            <div style={{ marginBottom: 18 }}>
              <img src="https://lirp.cdn-website.com/e6bfcade/dms3rep/multi/opt/whiteLogo+copy-230w.png" alt="USAM Fund" style={{ height: 48, width: "auto", display: "block" }} />
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#8A97A8", maxWidth: 280, margin: 0 }}>
              Direct private &amp; hard-money lending for real estate investors, operators, and developers nationwide.
            </p>
          </div>

          <div>
            <div style={head}>Programs</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>
              {programs.map((p) => (
                <Link key={p.slug} to={`/programs/${p.slug}`} className="ftr-lnk" style={lnk}>{p.title}</Link>
              ))}
            </div>
          </div>

          <div>
            <div style={head}>Company</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5 }}>
              <Link to="/about" className="ftr-lnk" style={lnk}>About us</Link>
              <Link to="/programs" className="ftr-lnk" style={lnk}>Programs</Link>
              <Link to="/resources" className="ftr-lnk" style={lnk}>Resources</Link>
              <Link to="/partners" className="ftr-lnk" style={lnk}>Partners</Link>
              <Link to="/faq" className="ftr-lnk" style={lnk}>FAQ</Link>
              <Link to="/contact" className="ftr-lnk" style={lnk}>Contact</Link>
              <Link to="/texas-hard-money-lender" className="ftr-lnk" style={lnk}>Texas hard money</Link>
              <Link to="/austin-hard-money-lender" className="ftr-lnk" style={lnk}>Austin hard money</Link>
            </div>
          </div>

          <div>
            <div style={head}>Main office</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "#AEB9C9" }}>
              3821 Juniper Trace, Suite 210<br />Bee Cave, TX 78738<br />
              <a href="tel:512-488-6087" className="ftr-lnk" style={{ color: "#E7ECF3", textDecoration: "none", fontWeight: 600 }}>512-488-6087</a><br />
              <a href="mailto:jack@usam.net" className="ftr-lnk" style={lnk}>jack@usam.net</a><br />
              <span style={{ color: "#6E7E92" }}>Mon to Fri, 9 AM to 5 PM CT</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", paddingTop: 26, fontSize: 13, color: "#6E7E92" }}>
          <span>© {year} USAM Fund. All rights reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link to="/privacy" className="ftr-lnk" style={{ color: "#6E7E92", textDecoration: "none" }}>Privacy Policy</Link>
            <Link to="/terms" className="ftr-lnk" style={{ color: "#6E7E92", textDecoration: "none" }}>Terms of Service</Link>
            <span>Loans for business purpose only · Not a commitment to lend.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
