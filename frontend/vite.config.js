import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const APP_API_URL = env.VITE_APP_URL;

  return {
    server: {
      proxy: {
        "/api": APP_API_URL,
      },
    },
    plugins: [react(), tailwindcss()],
  };
});
