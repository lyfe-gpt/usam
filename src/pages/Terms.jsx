import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const SCH = "'Schibsted Grotesk',sans-serif";
const EFFECTIVE = "June 25, 2026";

// Plain, readable website Terms of Service. Content is authored in-repo and
// should get a final pass from counsel before launch. Key lender-specific
// points: loans are business-purpose only, nothing here is a commitment to
// lend, and all terms are subject to underwriting.
const H2 = (props) => (
  <h2 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(22px,2.4vw,28px)", lineHeight: 1.2, letterSpacing: "-0.01em", color: "#0E1A2B", margin: "38px 0 12px" }} {...props} />
);
const P = (props) => (
  <p style={{ fontSize: 16, lineHeight: 1.7, color: "#3A4654", margin: "0 0 14px" }} {...props} />
);
const LI = (props) => (
  <li style={{ fontSize: 16, lineHeight: 1.7, color: "#3A4654", margin: "0 0 8px" }} {...props} />
);

export default function Terms() {
  return (
    <div>
      <Header />

      <section className="sec" style={{ background: "linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)", padding: "64px 32px 20px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A56C4", marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontFamily: SCH, fontWeight: 800, fontSize: "clamp(34px,4.2vw,52px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#0E1A2B", margin: "0 0 12px" }}>Terms of Service</h1>
          <P><strong>Effective date:</strong> {EFFECTIVE}</P>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff", padding: "8px 32px 64px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <P>These Terms of Service ("Terms") govern your use of the USAM Fund website and any forms, tools, or communications you access through it (together, the "Site"). By using the Site you agree to these Terms. If you do not agree, please do not use the Site. Please also review our <a href="/privacy" style={{ color: "#1A56C4", fontWeight: 600 }}>Privacy Policy</a>, which is incorporated into these Terms.</P>

          <H2>Business-purpose lending only</H2>
          <P>USAM Fund makes and arranges loans for <strong>business and investment purposes only</strong>. We do not make owner-occupied consumer mortgages or other consumer-purpose loans. By applying, you represent that any financing you request is for a business or investment purpose and that the subject property is not and will not be your primary residence.</P>

          <H2>No offer or commitment to lend</H2>
          <P>Nothing on the Site is an offer or commitment to lend, a guarantee of approval, or a quote of final terms. Rates, leverage, fees, and program details shown on the Site are illustrative, are subject to change without notice, and depend on the deal, the property, your experience and financials, and market conditions. <strong>All financing is subject to underwriting, credit and property review, and a signed term sheet and loan documents.</strong> Any term sheet we issue states the actual proposed terms and supersedes anything shown on the Site.</P>

          <H2>Eligibility</H2>
          <P>You must be at least 18 years old and able to enter into a binding contract to use the Site. If you use the Site on behalf of a company, you represent that you are authorized to act for that company.</P>

          <H2>Information you submit</H2>
          <P>When you submit a form or application, you agree to provide accurate, current, and complete information, and to keep it updated. You are responsible for the accuracy of what you submit. Submitting information does not create a lender-borrower relationship; that relationship begins only when we both sign loan documents.</P>

          <H2>Communications consent</H2>
          <P>By providing your contact information, you agree that we may contact you about your inquiry by email, phone, and, where you have opted in, text message. Message and data rates may apply, and message frequency varies. You can opt out of marketing texts by replying STOP and out of marketing email using the unsubscribe link. Some calls may be handled by an AI voice assistant and may be recorded. See our <a href="/privacy" style={{ color: "#1A56C4", fontWeight: 600 }}>Privacy Policy</a> for details, including how we handle SMS opt-in data.</P>

          <H2>Acceptable use</H2>
          <P>You agree not to misuse the Site. You will not attempt to gain unauthorized access to the Site or its systems, interfere with its operation, scrape or harvest data, submit false or fraudulent information, or use the Site for any unlawful purpose.</P>

          <H2>Intellectual property</H2>
          <P>The Site and its content, including text, graphics, logos, and the USAM Fund name and marks, are owned by USAM Fund or its licensors and are protected by law. You may view and use the Site for your own evaluation of our services, but you may not copy, reproduce, or distribute its content without our permission.</P>

          <H2>Third-party links</H2>
          <P>The Site may link to third-party websites or services we do not control. We are not responsible for their content, products, or practices, and a link does not imply our endorsement. Your use of any third-party site is governed by that site's own terms and privacy policy.</P>

          <H2>Disclaimers</H2>
          <P>The Site and its content are provided "as is" and "as available," without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or secure. Nothing on the Site is legal, tax, financial, or investment advice; consult your own advisors before making decisions.</P>

          <H2>Limitation of liability</H2>
          <P>To the fullest extent permitted by law, USAM Fund and its owners, officers, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or goodwill, arising out of or related to your use of the Site, even if we have been advised of the possibility of such damages.</P>

          <H2>Indemnification</H2>
          <P>You agree to indemnify and hold harmless USAM Fund and its owners, officers, employees, and agents from any claims, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of your use of the Site, your submissions, or your violation of these Terms.</P>

          <H2>Governing law</H2>
          <P>These Terms are governed by the laws of the State of Texas, without regard to its conflict-of-laws rules. Any dispute relating to the Site or these Terms will be brought in the state or federal courts located in Travis County, Texas, and you consent to their jurisdiction.</P>

          <H2>Changes to these Terms</H2>
          <P>We may update these Terms from time to time. We will post the updated version here and change the effective date above. Your continued use of the Site after changes take effect means you accept the updated Terms.</P>

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
