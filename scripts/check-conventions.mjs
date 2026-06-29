// Convention guard for the USAM site. Two jobs:
//
//  1. COPY RULES (hard fail, exit 1) — bans content that violates the brand
//     style: en dashes, the section sign, and "Fix & Flip" spellings. A line
//     may opt out with a `copy-check-ignore` comment (for legitimate code use,
//     e.g. a regex that parses en-dashed input).
//
//  2. INLINE-STYLE BLOAT (warn only, never fails) — reports the total count of
//     inline style={{…}} objects and flags unusually large ones, so the ~800
//     count does not grow unnoticed. Flip FAIL_ON_STYLE_GROWTH to true after the
//     inline-style refactor lands to make this a ratchet.
//
// Pure Node, no dependencies, so it runs fast in CI and in the pre-commit hook.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SRC = new URL("../src/", import.meta.url).pathname;
const EXIT_ON_STYLE = false;           // keep false until the inline-style refactor
const STYLE_BASELINE = 820;            // current approx count; warn if it grows past this
const BIG_STYLE_CHARS = 220;           // a single style={{…}} longer than this is "big"

const COPY_RULES = [
  { name: "en dash (–) — use a hyphen or em dash", re: /–/ },
  { name: "section sign (§) — write \"section N\"", re: /§/ },
  { name: "\"Fix & Flip\" — write \"Fix and Flip\"", re: /fix\s&(amp;)?\sflip/i },
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if ([".js", ".jsx", ".ts", ".tsx"].includes(extname(p))) files.push(p);
  }
  return files;
}

const files = walk(SRC);
const copyViolations = [];
let styleCount = 0;
const bigStyles = [];

for (const file of files) {
  const rel = file.slice(file.indexOf("/src/") + 1);
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (!line.includes("copy-check-ignore")) {
      for (const rule of COPY_RULES) {
        if (rule.re.test(line)) copyViolations.push({ rel, line: i + 1, rule: rule.name, text: line.trim().slice(0, 90) });
      }
    }
    // Inline-style accounting.
    const matches = line.match(/style=\{\{/g);
    if (matches) styleCount += matches.length;
    const big = line.match(/style=\{\{[^]*?\}\}/g);
    if (big) for (const seg of big) if (seg.length > BIG_STYLE_CHARS) bigStyles.push({ rel, line: i + 1, len: seg.length });
  });
}

// ---- Report ----
let failed = false;

if (copyViolations.length) {
  console.error(`\n✗ COPY RULE violations (${copyViolations.length}):`);
  for (const v of copyViolations) console.error(`  ${v.rel}:${v.line}  [${v.rule}]\n    ${v.text}`);
  console.error("\n  Fix the text, or add a `copy-check-ignore` comment if it is legitimate code.\n");
  failed = true;
} else {
  console.log("✓ Copy rules: clean (no en dashes, §, or \"Fix & Flip\").");
}

console.log(`\nℹ Inline style objects: ${styleCount} (baseline ${STYLE_BASELINE}).`);
if (bigStyles.length) {
  console.log(`  ${bigStyles.length} are larger than ${BIG_STYLE_CHARS} chars — consider extracting to a class:`);
  for (const b of bigStyles.slice(0, 10)) console.log(`    ${b.rel}:${b.line} (${b.len} chars)`);
  if (bigStyles.length > 10) console.log(`    …and ${bigStyles.length - 10} more`);
}
if (styleCount > STYLE_BASELINE) {
  const msg = `  Inline-style count grew past the baseline (${styleCount} > ${STYLE_BASELINE}).`;
  if (EXIT_ON_STYLE) { console.error("✗" + msg); failed = true; }
  else console.log("⚠" + msg + " (warning only)");
}

process.exit(failed ? 1 : 0);
