import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 🚨 이전에 추가했던 base: './' 대신, Nginx 루트 경로에 맞게 base: '/'로 설정하거나 제거합니다. 🚨
  base: '/',
  server: {
    host: "::",
    port: 80,
    proxy: {
      "/api": {
        target: "http://34.64.208.180:9000",
        changeOrigin: true,
        secure: false,
      },
    },

  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
/*
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
*/