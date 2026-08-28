// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// TEMP DEBUG — remove once the Vercel env var issue is confirmed fixed.
console.log(
  "[debug] process.env.VITE_SUPABASE_URL present:",
  Boolean(process.env["VITE_SUPABASE_URL"]),
  "| length:",
  process.env["VITE_SUPABASE_URL"]?.length ?? 0,
);
console.log(
  "[debug] process.env.VITE_SUPABASE_ANON_KEY present:",
  Boolean(process.env["VITE_SUPABASE_ANON_KEY"]),
  "| length:",
  process.env["VITE_SUPABASE_ANON_KEY"]?.length ?? 0,
);
console.log(
  "[debug] VITE_* keys in process.env:",
  Object.keys(process.env).filter((k) => k.startsWith("VITE_")),
);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // The built-in VITE_* env injection isn't picking up dashboard-configured
  // env vars on Vercel's build (works locally, empty in the deployed bundle
  // — process.env itself has the values, so define them explicitly here as
  // a safety net that doesn't depend on whatever that mechanism does.
  vite: {
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(process.env["VITE_SUPABASE_URL"] ?? ""),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(
        process.env["VITE_SUPABASE_ANON_KEY"] ?? "",
      ),
    },
  },
});
