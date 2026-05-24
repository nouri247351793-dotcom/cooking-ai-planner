import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages project site base path: https://<user>.github.io/<repo>/
  // Keep dev server and Vercel at `/`, but build local production assets for Pages under `/<repo>/`.
  base: mode === 'production' && !process.env.VERCEL && !process.env.NOMNOM_LOCAL ? '/cooking-ai-planner/' : '/',
  plugins: [react()],
  server: process.env.NOMNOM_API_TARGET
    ? {
        proxy: {
          '/api': {
            target: process.env.NOMNOM_API_TARGET,
            changeOrigin: true,
          },
        },
      }
    : undefined,
  // Avoid writing Vite deps cache into `node_modules/.vite` (may be blocked in some Windows envs).
  cacheDir: process.env.NOMNOM_VITE_CACHE_DIR || '.vite-cache',
  // Dev-only: disable deps pre-bundling to avoid EPERM unlink issues in some Windows/sandbox file systems.
  optimizeDeps: {
    // `optimizeDeps.disabled` was removed; keep "no prebundle" behavior via `noDiscovery`.
    noDiscovery: true,
    include: [],
  },
  build: {
    // Windows sandbox / 权限环境下，清空 dist 可能触发 EPERM；关闭自动清空以保证 build 可跑通
    emptyOutDir: false,
  },
}))
