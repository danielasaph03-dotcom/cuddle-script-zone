// Standalone Node.js server build for cPanel hosting (via cPanel's "Setup Node.js
// App" / Passenger), separate from the Vercel-targeted build in vite.config.ts.
// Produces a plain Node HTTP server in .output-cpanel/server, which is what
// cPanel's Node.js App manager expects as the application startup file.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server",
    output: {
      dir: ".output-cpanel",
    },
  },
});
