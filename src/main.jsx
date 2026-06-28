import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Vite injects BASE_URL ("/" in dev, "/usam/" on GitHub Pages). Strip the
// trailing slash so React Router treats it as the app basename.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const rootEl = document.getElementById("root");
const tree = (
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// When the page was prerendered to static HTML (see scripts/prerender.mjs), the
// #root already has markup — hydrate it so the content is live immediately and
// stays visible to non-JS crawlers. Otherwise mount fresh.
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, tree, {
    // The prerendered HTML can differ from the first client render for a few
    // client-only / responsive widgets; React recovers by client-rendering that
    // subtree (content stays visible the whole time). That recovery is expected
    // here, so swallow only those errors and still surface anything genuinely new.
    onRecoverableError: (error) => {
      const msg = String((error && error.message) || error);
      if (/hydrat|#418|#423|#425|did not match|initial UI/i.test(msg)) return;
      console.error(error);
    },
  });
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}
