import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import removeConsole from "vite-plugin-remove-console";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), removeConsole()],
  server: {
    host: true,
  },
  build: {
    // 청크 크기 경고 임계값(kB). 기본 500 → 1500으로 상향
    chunkSizeWarningLimit: 1500,
    // 큰 의존성을 분리하여 경고 가능성을 낮춥니다.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          query: ["@tanstack/react-query"],
          axios: ["axios"],
          lottie: ["@lottiefiles/dotlottie-react"],
        },
      },
    },
  },
});
