import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import icons, { ViteIconsResolver } from 'vite-plugin-icons';
import components from 'vite-plugin-components';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      compositionOnly: true,
      include: path.resolve(__dirname, './src/locales/**')
    }),
    components({
      customComponentResolvers: ViteIconsResolver()
    }),
    icons(),
    VitePWA({
      scope: '/',
      registerType: 'autoUpdate',
      includeAssets: [
        '/logo.png',
        'icons/*.png',
        'icons/*.svg',
        'icons/*.xml',
        'icons/*.ico',
        'robots.txt',
        'gm/@clothes/*.png'
      ],
      workbox: {
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: 'Colors & Shapes',
        short_name: 'Colors',
        theme_color: '#1e293b',
        start_url: '/',
        display: 'standalone',
        background_color: '#1e293b',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  define: {
    BASE_URL: process.env.VITE_BASE_URL,
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  }
});
