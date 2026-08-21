// Standalone static build for GitHub Pages, separate from the Lovable-managed
// TanStack Start / Nitro pipeline (defined via vite.config.ts), which targets
// server hosting and can't run on GitHub Pages' static-only hosting.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "pages-src",
  base: "/cuddle-script-zone/",
  plugins: [react(), tailwindcss()],
  publicDir: "../public",
  build: {
    outDir: "../dist-pages",
    emptyOutDir: true,
  },
});
