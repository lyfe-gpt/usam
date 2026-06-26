import { useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import ProgramDetail from "./pages/ProgramDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Apply from "./pages/Apply.jsx";
import FaqPage from "./pages/Faq.jsx";
import Resources from "./pages/Resources.jsx";
import Guide from "./pages/Guide.jsx";
import Partners from "./pages/Partners.jsx";
import GeoLanding from "./pages/GeoLanding.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import JsonLd, { organizationSchema, localBusinessSchema, SITE_URL } from "./components/JsonLd.jsx";
import ConsentBanner from "./components/ConsentBanner.jsx";
import {
  initAnalytics,
  trackPageView,
  trackPhoneClick,
  trackEmailClick,
  trackCtaClick,
  trackScrollDepth,
  trackContentView,
} from "./lib/analytics.js";
import { programs, bySlug } from "./data/programs.js";
import { guides, guideBySlug } from "./data/guides.js";
import { geoPages, geoBySlug } from "./data/geo.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Initializes analytics once (loads tags only if consent was previously
// granted) and fires an SPA page view on every route change.
function Analytics() {
  const { pathname, search } = useLocation();
  const scrollFired = useRef(new Set());
  useEffect(() => {
    initAnalytics();
    // One delegated listener captures clicks site-wide so we don't have to
    // instrument every phone, email, and Apply CTA link individually.
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackPhoneClick({ phone: href.replace("tel:", "") });
      } else if (href.startsWith("mailto:")) {
        trackEmailClick({ email: href.replace("mailto:", "") });
      } else if (/(^|\/)apply(\?|$)/.test(a.pathname || href)) {
        // A click on any link into the apply flow = funnel entry intent.
        trackCtaClick({ label: (a.textContent || "").trim().slice(0, 60), to: "/apply" });
      }
    };
    document.addEventListener("click", onClick);

    // Scroll-depth milestones, reset each route change via scrollFired ref.
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m && !scrollFired.current.has(m)) {
          scrollFired.current.add(m);
          trackScrollDepth(m);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    scrollFired.current = new Set();
    trackPageView(pathname + search);
    // Content-view events let us build retargeting audiences by interest.
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "programs" && parts[1]) trackContentView("program", parts[1]);
    else if (parts[0] === "resources" && parts[1]) trackContentView("guide", parts[1]);
  }, [pathname, search]);
  return null;
}

const BASE = "USAM Fund";
const DEFAULT_DESC =
  "Direct private and hard-money lending for real estate investors, operators, and developers nationwide. Fast closings, flexible structure.";

function metaFor(pathname) {
  if (pathname === "/") return [`${BASE} | Hard Money, Soft Terms`, DEFAULT_DESC];
  if (pathname === "/programs") return [`Loan Programs | ${BASE}`, "Fix and flip, DSCR rental, ground-up, bridge, SBA, and more. Business-purpose loan programs from USAM Fund."];
  if (pathname.startsWith("/programs/")) {
    const p = bySlug[pathname.split("/")[2]];
    if (p) return [`${p.title} | ${BASE}`, p.hubDesc];
    return [`Loan Programs | ${BASE}`, DEFAULT_DESC];
  }
  if (pathname.startsWith("/about")) return [`About | ${BASE}`, "A direct private lender based in Bee Cave, Texas, lending nationwide with 30 years of real estate finance experience."];
  if (pathname.startsWith("/faq")) return [`FAQ | ${BASE}`, "Answers to common questions about private and hard-money loan programs, rates, terms, and how to get funded."];
  if (pathname.startsWith("/contact")) return [`Contact | ${BASE}`, "Talk to a real person about your deal. Call 512-488-6087 or send a message to USAM Fund."];
  if (pathname.startsWith("/apply")) return [`Apply | ${BASE}`, "Get a real rate in minutes. No obligation and no hard credit pull to start your USAM Fund application."];
  if (pathname.startsWith("/partners")) return [`Partner Program | ${BASE}`, "Partner with a direct lender that closes. We fund your investor buyers fast, so your deals close. For wholesalers, investor agents, and off-market marketplaces."];
  if (pathname.startsWith("/privacy")) return [`Privacy Policy | ${BASE}`, "How USAM Fund collects, uses, and protects your information, including our SMS, email, AI voice assistant, analytics, and advertising practices."];
  if (pathname === "/resources") return [`Investor Guides | ${BASE}`, "Plain-English guides on DSCR loans, fix and flip financing, the BRRRR method, and more from USAM Fund."];
  if (pathname.startsWith("/resources/")) {
    const g = guideBySlug[pathname.split("/")[2]];
    if (g) return [g.metaTitle, g.description];
    return [`Investor Guides | ${BASE}`, DEFAULT_DESC];
  }
  const geo = geoBySlug[pathname.replace(/^\//, "")];
  if (geo) return [geo.metaTitle, geo.description];
  return [`${BASE} | Hard Money, Soft Terms`, DEFAULT_DESC];
}

// Sets or creates a <meta> by name or property attribute.
function upsertMeta(selector, attr, key, value) {
  let m = document.head.querySelector(selector);
  if (!m) {
    m = document.createElement("meta");
    m.setAttribute(attr, key);
    document.head.appendChild(m);
  }
  m.setAttribute("content", value);
}

function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, desc] = metaFor(pathname);
    const url = SITE_URL + pathname;
    const image = `${SITE_URL}/og.jpg`;
    const ogType = pathname.startsWith("/resources/") ? "article" : "website";
    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", desc);
    // Open Graph
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", desc);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:type"]', "property", "og:type", ogType);
    upsertMeta('meta[property="og:image"]', "property", "og:image", image);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", BASE);
    // Twitter
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", desc);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
    // Canonical
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageMeta />
      <Analytics />
      {/* Site-wide structured data: publisher + local business */}
      <JsonLd id="schema-organization" data={organizationSchema()} />
      <JsonLd id="schema-localbusiness" data={localBusinessSchema()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        {programs.map((p) => (
          <Route
            key={p.slug}
            path={`/programs/${p.slug}`}
            element={<ProgramDetail slug={p.slug} />}
          />
        ))}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/resources" element={<Resources />} />
        {guides.map((g) => (
          <Route key={g.slug} path={`/resources/${g.slug}`} element={<Guide slug={g.slug} />} />
        ))}
        {geoPages.map((g) => (
          <Route key={g.slug} path={`/${g.slug}`} element={<GeoLanding slug={g.slug} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ConsentBanner />
    </>
  );
}
