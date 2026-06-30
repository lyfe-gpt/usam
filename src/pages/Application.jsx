import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import logoHorizontal from "../assets/usam-logo-horizontal.png";

// USAM's full loan-origination application, hosted by LendingWise and embedded
// here so applicants finish on usam.net instead of bouncing to app.lendingwise.com.
// The prequal flow in Apply.jsx captures the lead to Airtable first, then hands
// off to this page.
//
// NOTE: production CSP must allow framing app.lendingwise.com. The live header is
// applied as Amplify app config (mirrored in amplify-custom-headers.yaml); without
// `https://app.lendingwise.com` in `frame-src` the iframe renders blank in prod.
const LENDINGWISE_URL =
  "https://app.lendingwise.com/HMLOWebForm.php?bRc=4e485a437c545935&fOpt=8e614f58c0d670e4&op=aa4465703ef4b17e";

export default function Application() {
  useEffect(() => {
    document.body.classList.add("apply-page");
    return () => document.body.classList.remove("apply-page");
  }, []);

  // Carry the email captured in the prequal flow (Apply.jsx) into the embedded
  // form. `borrowerEmail` is the only field LendingWise prefills from the URL;
  // it also lets LendingWise tie this session back to the lead we already saved.
  const email = new URLSearchParams(window.location.search).get("email");
  const iframeSrc = email
    ? `${LENDINGWISE_URL}&borrowerEmail=${encodeURIComponent(email)}`
    : LENDINGWISE_URL;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Minimal flow header — mirrors Apply.jsx */}
      <div style={{ flex: "none", background: "#fff", borderBottom: "1px solid #E6E9EF" }}>
        <div className="flow-pad" style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Link to="/"><img src={logoHorizontal} alt="USAM Fund" style={{ height: 38, width: "auto", display: "block" }} /></Link>
          <Link to="/" aria-label="Exit" style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid #E6E9EF", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
            <Icon name="close" size={18} color="#667085" width={2.2} />
          </Link>
        </div>
      </div>

      <iframe
        src={iframeSrc}
        title="USAM Fund loan application"
        style={{ flex: "1 1 auto", width: "100%", border: "none", minHeight: "calc(100vh - 67px)", display: "block" }}
      />
    </div>
  );
}
