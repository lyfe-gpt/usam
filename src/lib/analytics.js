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
};

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
// Event helpers — safe no-ops until tags are loaded
// ---------------------------------------------------------------------------

export function trackPageView(path) {
  if (!loaded) return;
  if (IDS.ga4 && window.gtag) {
    window.gtag("event", "page_view", { page_path: path, page_location: window.location.href });
  }
  if (IDS.metaPixel && window.fbq) window.fbq("track", "PageView");
}

// Fire a Google Ads conversion if a label is configured for this action.
function googleAdsConversion(label, params = {}) {
  if (!IDS.googleAds || !label || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: label, ...params });
}

// Lead captured (step 0 of the apply flow / any contact form submit).
export function trackLead(params = {}) {
  if (!loaded) return;
  if (window.gtag) window.gtag("event", "generate_lead", params);
  googleAdsConversion(ADS_LABELS.lead, params);
  if (window.fbq) window.fbq("track", "Lead");
  if (window.lintrk) window.lintrk("track", { conversion_id: ADS_LABELS.lead });
}

// Full application submitted (final step of the apply flow).
export function trackApplicationComplete(params = {}) {
  if (!loaded) return;
  if (window.gtag) window.gtag("event", "submit_application", params);
  googleAdsConversion(ADS_LABELS.apply, params);
  if (window.fbq) window.fbq("track", "SubmitApplication");
}

// Click-to-call — the highest-intent action for a lender.
export function trackPhoneClick(params = {}) {
  if (!loaded) return;
  if (window.gtag) window.gtag("event", "phone_call_click", params);
  googleAdsConversion(ADS_LABELS.call, params);
  if (window.fbq) window.fbq("track", "Contact");
}
