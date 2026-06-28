// Post-build prerender: serve the built dist, drive a headless browser over every
// route in the sitemap, and write the fully-rendered HTML (content + injected
// JSON-LD + per-route meta) back to disk. This makes the SPA's content visible to
// crawlers and AI agents that do not execute JavaScript. The client hydrates this
// markup (see src/main.jsx), so users still get the full SPA.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PORT = 4180;
const ORIGIN = "https://usam.net";

// Routes = every <loc> in the sitemap, made relative to the site origin.
const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(ORIGIN, "").trim())
  .filter((p) => p && !p.endsWith(".xml"));
if (!routes.includes("/")) routes.unshift("/");

console.log(`[prerender] ${routes.length} routes`);

// Minimal static file server for dist with SPA fallback to index.html.
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".webm": "video/webm", ".txt": "text/plain", ".xml": "application/xml", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let file = join(DIST, p);
  if (!existsSync(file) || p === "/") {
    const ext = p.slice(p.lastIndexOf("."));
    if (!TYPES[ext] || p === "/") file = join(DIST, "index.html");
  }
  try {
    const ext = file.slice(file.lastIndexOf("."));
    res.setHeader("Content-Type", TYPES[ext] || "application/octet-stream");
    res.end(readFileSync(file));
  } catch {
    res.statusCode = 404;
    res.end(readFileSync(join(DIST, "index.html")));
  }
});

await new Promise((r) => server.listen(PORT, r));

let browser;
try {
  browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
} catch (e) {
  // Never block the deploy on a browser failure — ship the working SPA instead.
  console.warn(`[prerender] browser launch failed, skipping prerender: ${e.message}`);
  server.close();
  process.exit(0);
}
let ok = 0, fail = 0;
try {
  const page = await browser.newPage();
  // Desktop viewport so prerendered markup is deterministic and matches the
  // client's first (hydration-safe) render; responsive components switch after mount.
  await page.setViewport({ width: 1280, height: 900 });
  // Signal prerender so client-only widgets (consent banner) stay out of the
  // captured HTML and don't cause hydration mismatches.
  await page.evaluateOnNewDocument(() => { window.__PRERENDER__ = true; });
  for (const route of routes) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      // Wait until React has rendered real content into #root.
      await page.waitForFunction(() => {
        const r = document.getElementById("root");
        return r && r.children.length > 0 && r.innerText.trim().length > 50;
      }, { timeout: 15000 });
      // Let effects flush so injected JSON-LD <script> tags land in <head>.
      await new Promise((r) => setTimeout(r, 250));
      const html = "<!DOCTYPE html>\n" + await page.evaluate(() => document.documentElement.outerHTML);
      const outPath = route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
      ok++;
    } catch (e) {
      fail++;
      console.warn(`[prerender] FAILED ${route}: ${e.message}`);
    }
  }
} finally {
  await browser.close();
  server.close();
}
console.log(`[prerender] done: ${ok} ok, ${fail} failed`);
