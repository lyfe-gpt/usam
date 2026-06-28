import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const SCH = "'Schibsted Grotesk',sans-serif";
const EFFECTIVE = "June 23, 2026";

// Plain, readable legal layout. Content is authored in-repo. The SMS section
// carries the carrier/A2P 10DLC disclosures (including the required statement
// that mobile opt-in data is never shared with third parties for marketing);
// the email section covers CAN-SPAM; the calls section covers the AI voice
// assistant and call recording.
const H2 = (props) => (
  <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(22px,2.4vw,28px)", lineHeight: 1.2, letterSpacing: "-0.01em", color: "#0E1A2B", margin: "38px 0 12px" }} {...props} />
);
const P = (props) => (
  <p style={{ fontSize: 16, lineHeight: 1.7, color: "#3A4654", margin: "0 0 14px" }} {...props} />
);
const LI = (props) => (
  <li style={{ fontSize: 16, lineHeight: 1.7, color: "#3A4654", margin: "0 0 8px" }} {...props} />
);

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />

      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "64px 32px 20px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(34px,4.2vw,52px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 12px" }}>Privacy Policy</h1>
          <P><strong>Effective date:</strong> {EFFECTIVE}</P>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff", padding: "8px 32px 64px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <P>USAM Fund ("USAM Fund," "we," "us," or "our") respects your privacy. This Privacy Policy explains what information we collect, how we use it, how we share it, and the choices you have. It applies to our website, our forms, and the email, text message, and phone communications we have with you. Our loans are made for business purposes only.</P>

          <H2>Information we collect</H2>
          <P><strong>Information you give us.</strong> When you submit a form, apply, partner with us, or contact us, we collect details such as your name, email address, phone number, company, and information about your deal or property (for example, address, purchase price, rehab budget, loan amount, and timeline). If you check the SMS consent box, we record that consent, the date, and the version of the consent language.</P>
          <P><strong>Information collected automatically.</strong> When you use our site we may collect device and usage data such as IP address, browser type, pages viewed, and referring URLs, through cookies and similar technologies and through analytics providers.</P>
          <P><strong>Communications.</strong> We keep records of our emails, text messages, and phone calls with you, including call recordings and transcripts where applicable (see "Phone calls and our AI voice assistant").</P>

          <H2>How we use your information</H2>
          <ul style={{ paddingLeft: 22, margin: "0 0 14px" }}>
            <LI>To respond to your inquiry, prepare quotes and term sheets, and process and service loans.</LI>
            <LI>To send you transactional messages about your request and, if you opted in, marketing messages by email or text.</LI>
            <LI>To operate, improve, and secure our website and services.</LI>
            <LI>To comply with law and to detect and prevent fraud or abuse.</LI>
          </ul>

          <H2>Text messaging (SMS) program</H2>
          <P>If you provide your mobile number and opt in, we may send you text messages about your inquiry and, where you consented, marketing messages. By opting in you agree to receive recurring automated text messages from USAM Fund at the number you provided.</P>
          <ul style={{ paddingLeft: 22, margin: "0 0 14px" }}>
            <LI><strong>Message frequency varies.</strong></LI>
            <LI><strong>Message and data rates may apply.</strong></LI>
            <LI>Reply <strong>STOP</strong> to any message to opt out at any time. You will receive a confirmation and we will stop sending messages.</LI>
            <LI>Reply <strong>HELP</strong> for help, or contact us at 512-488-6087 or jack@usam.net.</LI>
            <LI>Carriers are not liable for delayed or undelivered messages.</LI>
          </ul>
          <P style={{ background: "#F6F8FB", border: "1px solid #E6E9EF", borderRadius: 12, padding: "16px 18px" }}><strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong> We do not sell or rent your mobile number or SMS opt-in data. We share this information only with the service providers (such as Twilio) needed to deliver the messages you requested, and as required by law. Text messaging originator opt-in data and consent are not shared with any third parties for their own use.</P>

          <H2>Email communications</H2>
          <P>We send transactional emails (for example, confirming we received your request) and, if you opted in, marketing emails. We use a third-party email provider (SendGrid, a Twilio company) to deliver and measure these messages. Every marketing email includes an unsubscribe link; you can opt out of marketing email at any time using that link or by contacting us. We will still send necessary transactional or service messages related to your loan or request.</P>

          <H2>Phone calls and our AI voice assistant</H2>
          <P>When you call us or we call you, your call may be <strong>recorded and transcribed</strong> for quality, training, servicing, and record-keeping. Some calls may be handled by an <strong>AI voice assistant</strong> that can answer questions and route your request. To provide this, your call audio, transcript, and related information may be processed by third-party providers, including ElevenLabs (voice AI) and Twilio (telephony). If you do not want to be recorded or to interact with the AI assistant, tell us and you can speak with a person or contact us another way.</P>

          <H2>Cookies and analytics</H2>
          <P>We use cookies and similar technologies to run the site, remember preferences, and understand usage. We use third-party analytics and product-experience tools that set their own cookies and collect usage data, including:</P>
          <ul style={{ paddingLeft: 22, margin: "0 0 14px" }}>
            <LI><strong>Google Analytics</strong> (Google LLC) to measure site traffic and how visitors use our pages.</LI>
            <LI><strong>Microsoft Clarity</strong> (Microsoft Corporation) for heatmaps and session replay, which records interactions such as mouse movement, clicks, and scrolling to help us improve the site. Sensitive input fields are masked.</LI>
          </ul>
          <P>These providers may process the data they collect on their own servers (including in the United States). You can opt out of Google Analytics with the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" style={{ color: "#1A56C4", fontWeight: 600 }}>Google Analytics Opt-out Browser Add-on</a>. You can control cookies through your browser settings; disabling them may affect how the site works.</P>

          <H2>Advertising and retargeting</H2>
          <P>We use advertising and conversion-tracking technologies to measure our marketing and to show you relevant ads on other sites and apps (interest-based or "retargeting" advertising), including:</P>
          <ul style={{ paddingLeft: 22, margin: "0 0 14px" }}>
            <LI><strong>Google Ads</strong> (Google LLC) for conversion tracking and remarketing.</LI>
            <LI><strong>Meta Pixel</strong> (Meta Platforms, Inc.) for conversion tracking, retargeting, and building custom or lookalike audiences.</LI>
            <LI><strong>LinkedIn Insight Tag</strong> (LinkedIn Corporation) for conversion tracking and retargeting to professional audiences.</LI>
          </ul>
          <P>These tools may set cookies and share certain identifiers (such as a hashed email or device data) with the advertising platform to match you to an ad audience. You can manage interest-based advertising here:</P>
          <ul style={{ paddingLeft: 22, margin: "0 0 14px" }}>
            <LI>Google ad personalization: <a href="https://myadcenter.google.com" target="_blank" rel="noopener" style={{ color: "#1A56C4", fontWeight: 600 }}>myadcenter.google.com</a></LI>
            <LI>Meta ad preferences: in your Facebook or Instagram settings under Ads.</LI>
            <LI>Industry opt-outs: <a href="https://optout.aboutads.info" target="_blank" rel="noopener" style={{ color: "#1A56C4", fontWeight: 600 }}>optout.aboutads.info</a> and <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener" style={{ color: "#1A56C4", fontWeight: 600 }}>optout.networkadvertising.org</a></LI>
          </ul>
          <P>Some of this activity may be considered "sharing" for cross-context behavioral advertising or "targeted advertising" under certain state laws. We honor opt-out preference signals, including the Global Privacy Control (GPC), where required.</P>

          <H2>How we share information</H2>
          <P>We do not sell your personal information. We share it only as described here:</P>
          <ul style={{ paddingLeft: 22, margin: "0 0 14px" }}>
            <LI><strong>Service providers (processors)</strong> that help us operate, such as Twilio and SendGrid (messaging and email), ElevenLabs (voice AI), our CRM and form-intake tools (Airtable), and our website hosting. They may use your information only to provide services to us.</LI>
            <LI><strong>Analytics and advertising partners</strong>, such as Google (Google Analytics and Google Ads), Meta (Meta Pixel), Microsoft (Clarity), and LinkedIn (Insight Tag), as described in "Cookies and analytics" and "Advertising and retargeting." This does not include your SMS opt-in data.</LI>
            <LI><strong>Address lookup</strong>: when you type a property address into our application form, the text you enter is sent to OpenStreetMap's Nominatim service so it can suggest matching addresses. Only the address text is sent.</LI>
            <LI><strong>Lending and closing partners</strong> as needed to evaluate, structure, fund, or service your loan, with your involvement. Opting out of advertising "sharing" does not limit these disclosures, which are necessary to provide the financing you requested.</LI>
            <LI><strong>Legal and safety</strong> reasons, to comply with law, enforce our terms, or protect rights, property, and safety.</LI>
            <LI><strong>Business transfers</strong>, in connection with a merger, acquisition, or sale of assets.</LI>
          </ul>
          <P>As stated above, mobile opt-in and SMS consent data are never shared with third parties or affiliates for marketing purposes.</P>

          <H2>Data retention</H2>
          <P>We keep personal information for as long as needed to provide our services, maintain business and transaction records, comply with legal obligations, resolve disputes, and enforce agreements.</P>

          <H2>Security</H2>
          <P>We use reasonable administrative, technical, and physical safeguards to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</P>

          <div id="choices" style={{ scrollMarginTop: 90 }} />
          <H2>Your choices and rights</H2>
          <ul style={{ paddingLeft: 22, margin: "0 0 14px" }}>
            <LI>Opt out of marketing texts by replying STOP; opt out of marketing email using the unsubscribe link.</LI>
            <LI>Request access to, correction of, or deletion of your personal information, subject to legal limits.</LI>
            <LI>Opt out of interest-based advertising using the tools listed under "Advertising and retargeting," and through the Global Privacy Control (GPC) browser signal.</LI>
            <LI>Depending on where you live (for example, under the Texas Data Privacy and Security Act or the California Consumer Privacy Act), you may have additional rights, including the right to opt out of targeted advertising or the "sharing" of your information. We do not sell personal information.</LI>
          </ul>
          <P>To exercise any right, contact us using the details below. We will not discriminate against you for exercising your rights.</P>

          <H2>Third-party links</H2>
          <P>Our site may link to third-party websites. We are not responsible for their privacy practices, and we encourage you to read their policies.</P>

          <H2>Children's privacy</H2>
          <P>Our services are for adults and are not directed to children under 18. We do not knowingly collect information from children.</P>

          <H2>Changes to this policy</H2>
          <P>We may update this Privacy Policy from time to time. We will post the updated version here and change the effective date above.</P>

          <H2>Contact us</H2>
          <P>
            USAM Fund<br />
            3821 Juniper Trace, Suite 210<br />
            Bee Cave, TX 78738<br />
            Phone: <a href="tel:512-488-6087" style={{ color: "#1A56C4", fontWeight: 600 }}>512-488-6087</a><br />
            Email: <a href="mailto:jack@usam.net" style={{ color: "#1A56C4", fontWeight: 600 }}>jack@usam.net</a>
          </P>
        </div>
      </section>

      <Footer />
    </div>
  );
}
