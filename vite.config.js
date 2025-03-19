import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  base: '/',  // ✅ Vercel 배포 시 '/' 유지
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      "@src": "/src",
    },
  },
  server: {
    strictPort: true,
    historyApiFallback: true,  // ✅ 추가! React Router가 정상 작동하도록 설정
  },
});
