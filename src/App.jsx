import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import ProgramDetail from "./pages/ProgramDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Apply from "./pages/Apply.jsx";
import FaqPage from "./pages/Faq.jsx";
import { programs, bySlug } from "./data/programs.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const BASE = "USAM I Fund";
const DEFAULT_DESC =
  "Direct private and hard-money lending for real estate investors, operators, and developers nationwide. Fast closings, flexible structure.";

function metaFor(pathname) {
  if (pathname === "/") return [`${BASE} | Hard Money, Soft Terms`, DEFAULT_DESC];
  if (pathname === "/programs") return [`Loan Programs | ${BASE}`, "Fix and flip, DSCR rental, ground-up, bridge, SBA, and more. Business-purpose loan programs from USAM I Fund."];
  if (pathname.startsWith("/programs/")) {
    const p = bySlug[pathname.split("/")[2]];
    if (p) return [`${p.title} | ${BASE}`, p.hubDesc];
    return [`Loan Programs | ${BASE}`, DEFAULT_DESC];
  }
  if (pathname.startsWith("/about")) return [`About | ${BASE}`, "A direct private lender based in Bee Cave, Texas, lending nationwide with 30 years of real estate finance experience."];
  if (pathname.startsWith("/faq")) return [`FAQ | ${BASE}`, "Answers to common questions about private and hard-money loan programs, rates, terms, and how to get funded."];
  if (pathname.startsWith("/contact")) return [`Contact | ${BASE}`, "Talk to a real person about your deal. Call 512-617-9400 or send a message to USAM I Fund."];
  if (pathname.startsWith("/apply")) return [`Apply | ${BASE}`, "Get a real rate in minutes. No obligation and no hard credit pull to start your USAM I Fund application."];
  return [`${BASE} | Hard Money, Soft Terms`, DEFAULT_DESC];
}

function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, desc] = metaFor(pathname);
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageMeta />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
