import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Avoid writing Vite deps cache into `node_modules/.vite` (may be blocked in some Windows envs).
  cacheDir: '.vite-cache',
  // Dev-only: disable deps pre-bundling to avoid EPERM unlink issues in some Windows/sandbox file systems.
  optimizeDeps: {
    disabled: true,
  },
  build: {
    // Windows sandbox /权限环境下，清空 dist 可能触发 EPERM；关闭自动清空以保证 build 可跑通
    emptyOutDir: false,
  },
})
