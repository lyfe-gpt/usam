import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from GitHub Pages at /usam/ in production; root in local dev so the
// dev server and preview keep working at "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/usam/" : "/",
  plugins: [react()],
  server: { port: process.env.PORT ? parseInt(process.env.PORT) : undefined },
}));
