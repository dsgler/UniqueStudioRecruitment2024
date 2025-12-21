import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    host: "127.0.0.1",
    proxy: {
      "^/api": {
        target: "https://dev.back.recruitment2023.hustunique.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        cookieDomainRewrite: {
          "*": "hustunique.com"
        },
        bypass(req) {
          delete req.headers["origin"];
          delete req.headers["referer"];
        },
      }
    }
  }
});
