// Central, env-gated, consent-aware analytics + advertising layer.
//
// Every vendor is OFF until BOTH are true:
//   1. Its measurement ID is provided via an env var (see .env.example), and
//   2. The visitor has granted consent (or, for ad platforms, GPC is not set).
//
// This means the file is safe to ship with no IDs: nothing loads, nothing
// fires. Paste IDs into .env.local / GitHub Actions secrets to activate.
//
// Supported platforms:
//   - Google Analytics 4   VITE_GA4_ID            (G-XXXXXXXXXX)
//   - Google Ads           VITE_GOOGLE_ADS_ID     (AW-XXXXXXXXX)
//   - Meta (Facebook) Pixel VITE_META_PIXEL_ID    (numeric pixel id)
//   - Microsoft Clarity    VITE_CLARITY_ID        (xxxxxxxxxx)
//   - LinkedIn Insight Tag VITE_LINKEDIN_PARTNER_ID (numeric partner id)
//
// Optional conversion labels for Google Ads (format "AW-XXX/label"):
//   VITE_GOOGLE_ADS_LEAD_LABEL, VITE_GOOGLE_ADS_APPLY_LABEL, VITE_GOOGLE_ADS_CALL_LABEL

const env = import.meta.env;

const IDS = {
  ga4: env.VITE_GA4_ID,
  googleAds: env.VITE_GOOGLE_ADS_ID,
  metaPixel: env.VITE_META_PIXEL_ID,
  clarity: env.VITE_CLARITY_ID,
  linkedin: env.VITE_LINKEDIN_PARTNER_ID,
};

const ADS_LABELS = {
  lead: env.VITE_GOOGLE_ADS_LEAD_LABEL,
  apply: env.VITE_GOOGLE_ADS_APPLY_LABEL,
  call: env.VITE_GOOGLE_ADS_CALL_LABEL,
  partner: env.VITE_GOOGLE_ADS_PARTNER_LABEL,
};

// Debug log: every track* call records here regardless of consent/vendor
// state, so the wiring can be verified in dev and in automated tests via
// `window.__usamAnalytics`. Enabled in dev or with VITE_ANALYTICS_DEBUG=true.
const DEBUG = env.DEV || env.VITE_ANALYTICS_DEBUG === "true";
function record(event, params) {
  if (!DEBUG || typeof window === "undefined") return;
  window.__usamAnalytics = window.__usamAnalytics || [];
  window.__usamAnalytics.push({ event, params: params || {}, t: Date.now() });
}

const CONSENT_KEY = "usam_consent_v1"; // "granted" | "denied"

// ---------------------------------------------------------------------------
// Consent state
// ---------------------------------------------------------------------------

// Global Privacy Control: if the browser signals it, treat as a hard opt-out
// of advertising/sharing regardless of any banner choice (we honor GPC, as
// stated in the Privacy Policy).
export function gpcEnabled() {
  return typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
}

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function hasDecided() {
  return getConsent() === "granted" || getConsent() === "denied";
}

let loaded = false;

// Grant consent, persist it, and load every configured tag.
export function grantConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, "granted");
  } catch {
    /* storage blocked; load for this session anyway */
  }
  loadAll();
}

// Decline: persist the choice and load nothing. (Tags never fire.)
export function denyConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, "denied");
  } catch {
    /* ignore */
  }
}

// Call once on app start. If the visitor already granted consent on a prior
// visit, re-load the tags. Otherwise do nothing until they choose.
export function initAnalytics() {
  if (getConsent() === "granted") loadAll();
}

// ---------------------------------------------------------------------------
// Tag loaders (idempotent)
// ---------------------------------------------------------------------------

function injectScript(src, attrs = {}) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
  return s;
}

function loadAll() {
  if (loaded) return;
  loaded = true;
  loadGoogle();
  loadMeta();
  loadClarity();
  loadLinkedIn();
  // Record the first page view now that tags exist.
  trackPageView(window.location.pathname + window.location.search);
}

// Google Analytics 4 + Google Ads share one gtag.js runtime.
function loadGoogle() {
  if (!IDS.ga4 && !IDS.googleAds) return;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());

  // Consent Mode v2: this loader only runs after explicit grant, so set all
  // signals to granted. (Ad signals stay denied if GPC is present.)
  const adState = gpcEnabled() ? "denied" : "granted";
  gtag("consent", "default", {
    ad_storage: adState,
    ad_user_data: adState,
    ad_personalization: adState,
    analytics_storage: "granted",
  });

  const primary = IDS.ga4 || IDS.googleAds;
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${primary}`);
  if (IDS.ga4) gtag("config", IDS.ga4, { send_page_view: false });
  if (IDS.googleAds) gtag("config", IDS.googleAds);
}

function loadMeta() {
  if (!IDS.metaPixel || gpcEnabled()) return;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", IDS.metaPixel);
}

function loadClarity() {
  if (!IDS.clarity) return;
  /* eslint-disable */
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", IDS.clarity);
  /* eslint-enable */
}

function loadLinkedIn() {
  if (!IDS.linkedin || gpcEnabled()) return;
  window._linkedin_partner_id = IDS.linkedin;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(IDS.linkedin);
  /* eslint-disable */
  (function (l) {
    if (!l) {
      window.lintrk = function (a, b) {
        window.lintrk.q.push([a, b]);
      };
      window.lintrk.q = [];
    }
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
  })(window.lintrk);
  /* eslint-enable */
}

// ---------------------------------------------------------------------------
// Event helpers
//
// MACRO conversions fan out to the ad platforms (GA4 + Meta + Google Ads +
// LinkedIn) — these are what you bid toward. MICRO/funnel events go to GA4
// ONLY, so the ad platforms aren't polluted and a single user isn't counted
// at every step. Both tiers always write to the debug log.
// ---------------------------------------------------------------------------

// Fire a Google Ads conversion if a label is configured for this action.
function googleAdsConversion(label, params = {}) {
  if (!IDS.googleAds || !label || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: label, ...params });
}

// Enhanced conversions: hand Google the lead's email/phone so it can match the
// conversion to an ad click even when cookies fail (big lift to match rate and
// attribution). Google hashes client-side. OFF unless VITE_ENHANCED_CONVERSIONS
// is "true", and PII only leaves the browser after consent (loaded === true).
const ENHANCED = env.VITE_ENHANCED_CONVERSIONS === "true";
function setEnhancedUserData(email, phone) {
  if (!ENHANCED || !window.gtag || (!email && !phone)) return;
  const ud = {};
  if (email) ud.email = String(email).trim().toLowerCase();
  if (phone) ud.phone_number = String(phone).replace(/[^\d+]/g, "");
  window.gtag("set", "user_data", ud);
}

// Build a value-bearing params object for value-based bidding. A lead worth a
// $2M loan should outweigh a $100K one; Smart Bidding uses this.
function withValue(value, currency, params) {
  const v = Number(value);
  return v > 0 ? { value: v, currency: currency || "USD", ...params } : { ...params };
}

// GA4-only micro/funnel event.
function ga4Event(name, params = {}) {
  record(name, params);
  if (!loaded || !IDS.ga4 || !window.gtag) return;
  window.gtag("event", name, params);
}

export function trackPageView(path) {
  record("page_view", { page_path: path });
  if (!loaded) return;
  if (IDS.ga4 && window.gtag) {
    window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
  }
  if (IDS.metaPixel && window.fbq) window.fbq("track", "PageView");
}

// ---- MACRO conversions ----------------------------------------------------

// Lead captured (apply step 1). Optional: value, currency, email, phone.
export function trackLead({ value, currency, email, phone, ...params } = {}) {
  const p = withValue(value, currency, params);
  record("lead", p);
  if (!loaded) return;
  setEnhancedUserData(email, phone);
  if (window.gtag) window.gtag("event", "generate_lead", p);
  googleAdsConversion(ADS_LABELS.lead, p);
  if (window.fbq) window.fbq("track", "Lead", p.value ? { value: p.value, currency: p.currency } : {});
  if (window.lintrk) window.lintrk("track", { conversion_id: ADS_LABELS.lead });
}

// Contact form submitted — also a lead, tagged with its source method.
export function trackContactLead({ value, currency, email, phone, ...params } = {}) {
  const p = withValue(value, currency, { method: "contact_form", ...params });
  record("contact_form_submit", p);
  if (!loaded) return;
  setEnhancedUserData(email, phone);
  if (window.gtag) window.gtag("event", "generate_lead", p);
  googleAdsConversion(ADS_LABELS.lead, p);
  if (window.fbq) window.fbq("track", "Lead", p.value ? { value: p.value, currency: p.currency } : {});
  if (window.lintrk) window.lintrk("track", { conversion_id: ADS_LABELS.lead });
}

// Full application submitted (final apply step). Carries loan value.
export function trackApplicationComplete({ value, currency, email, phone, ...params } = {}) {
  const p = withValue(value, currency, params);
  record("application_complete", p);
  if (!loaded) return;
  setEnhancedUserData(email, phone);
  if (window.gtag) window.gtag("event", "submit_application", p);
  googleAdsConversion(ADS_LABELS.apply, p);
  if (window.fbq) window.fbq("track", "SubmitApplication", p.value ? { value: p.value, currency: p.currency } : {});
}

// SMS opt-in rate — measures list growth (GA4 only; never shared with ad platforms).
export const trackSmsOptIn = (params = {}) => ga4Event("sms_opt_in", params);

// Partner application submitted — a distinct audience, kept separate from
// loan leads so lead-gen ad optimization isn't muddied.
export function trackPartnerApplication(params = {}) {
  record("partner_application", params);
  if (!loaded) return;
  if (window.gtag) window.gtag("event", "partner_application", params);
  googleAdsConversion(ADS_LABELS.partner, params);
  if (window.fbq) window.fbq("trackCustom", "PartnerApplication", params);
}

// Click-to-call — the highest-intent action for a lender.
export function trackPhoneClick(params = {}) {
  record("phone_call_click", params);
  if (!loaded) return;
  if (window.gtag) window.gtag("event", "phone_call_click", params);
  googleAdsConversion(ADS_LABELS.call, params);
  if (window.fbq) window.fbq("track", "Contact");
}

// ---- MICRO / funnel events (GA4 only) -------------------------------------

export const trackApplyStart = (params = {}) => ga4Event("apply_start", params);
export const trackApplyStep = (stepNumber, stepName, params = {}) =>
  ga4Event("apply_step", { step_number: stepNumber, step_name: stepName, ...params });
export const trackApplyQualified = (params = {}) => ga4Event("apply_qualified", params);
export const trackPartnerFormStart = (params = {}) => ga4Event("partner_form_start", params);
export const trackContactFormStart = (params = {}) => ga4Event("contact_form_start", params);
export const trackEmailClick = (params = {}) => ga4Event("email_click", params);
export const trackCtaClick = (params = {}) => ga4Event("cta_click", params);
export const trackScrollDepth = (percent) => ga4Event("scroll_depth", { percent });
export const trackContentView = (contentType, slug) =>
  ga4Event("content_view", { content_type: contentType, slug });
