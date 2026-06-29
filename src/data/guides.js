// Guides are now split into per-guide files under ./guides/ (one file per
// article). This shim re-exports them so existing imports
// (`from "../data/guides.js"`) keep working unchanged.
//
// To edit a guide, open src/data/guides/<slug>.js.
// To add, remove, or reorder guides, edit src/data/guides/index.js.
export { guides, guideBySlug } from "./guides/index.js";
