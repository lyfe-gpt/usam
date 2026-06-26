import DOMPurify from "dompurify";

// Sanitizes HTML before it is injected via dangerouslySetInnerHTML (FAQ answers,
// guide bodies). That content is authored in-repo today, so this is defense in
// depth (security audit #6): if any of those fields ever come from a CMS, form,
// or other untrusted source, stored XSS is neutralized here instead of shipping.
export function sanitizeHtml(html) {
  if (typeof html !== "string") return "";
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}
