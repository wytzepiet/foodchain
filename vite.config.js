import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    port: 3000, // specify the port to run the dev server
    open: true, // automatically open the app in the browser on startup
    watch: {
      ignored: ["**/node_modules/**", "**/.git/**"], // ignore changes in specified directories
    },
  },
});
