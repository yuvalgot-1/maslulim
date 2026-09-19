import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages can't send response headers, so the policy ships as a <meta> tag.
// Production only: the dev server needs inline scripts and a websocket for HMR.
function contentSecurityPolicy(supabaseUrl) {
  const supabase = supabaseUrl ? new URL(supabaseUrl).origin : '';
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'", // React inline style={{}} attributes
    `img-src 'self' data: blob: ${supabase}`,
    `connect-src 'self' ${supabase}`,
    "font-src 'self'",
    "manifest-src 'self'",
    "worker-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [
      react(),
      {
        name: 'inject-csp',
        apply: 'build',
        transformIndexHtml: () => [{
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: contentSecurityPolicy(env.VITE_SUPABASE_URL) },
          injectTo: 'head-prepend',
        }],
      },
    ],
    build: {
      rollupOptions: {
        output: {
          // vendor code changes rarely, so it stays cached across app deploys
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('@supabase')) return 'supabase';
            return 'react';
          },
        },
      },
    },
  };
});
