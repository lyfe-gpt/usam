import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path is environment-driven so the same code serves from multiple hosts:
//   - AWS Amplify / custom domain (served at root) -> "/" (the default)
//   - GitHub Pages project site (subpath)          -> VITE_BASE=/usam/ (set in CI)
//   - local dev / preview                          -> "/" (no env set)
export default defineConfig(() => ({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  server: { port: process.env.PORT ? parseInt(process.env.PORT) : undefined },
}));
