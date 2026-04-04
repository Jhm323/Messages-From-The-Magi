import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  publicDir: 'public',
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    // Redirect legacy pages to their merged destination
    middlewareMode: false,
  },
  plugins: [
    {
      name: 'legacy-redirects',
      configureServer(server) {
        const REDIRECTS = {
          '/cards.html':  '/explore.html',
          '/system.html': '/explore.html',
        };
        server.middlewares.use((req, res, next) => {
          const target = REDIRECTS[req.url?.split('?')[0]];
          if (target) {
            res.writeHead(301, { Location: target });
            res.end();
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html'),
    },
  },
});
