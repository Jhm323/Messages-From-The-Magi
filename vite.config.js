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
    fs: {
      allow: ['..'],
    },
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
      input: {
        index:    resolve(__dirname, 'public/index.html'),
        readings: resolve(__dirname, 'public/readings.html'),
        oracle:   resolve(__dirname, 'public/oracle.html'),
        explore:  resolve(__dirname, 'public/explore.html'),
        videos:   resolve(__dirname, 'public/videos.html'),
        account:  resolve(__dirname, 'public/account.html'),
        join:     resolve(__dirname, 'public/join.html'),
        about:    resolve(__dirname, 'public/about.html'),
        shop:     resolve(__dirname, 'public/shop.html'),
      },
    },
  },
});
