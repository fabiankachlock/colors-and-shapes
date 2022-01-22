import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import icons, { ViteIconsResolver } from 'vite-plugin-icons';
import components from 'vite-plugin-components';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://gun.eco/docs/Vite
const moduleExclude = match => {
  const m = id => id.indexOf(match) > -1;
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id;
    },
    load(id) {
      if (m(id)) return `export default {}`;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      compositionOnly: true,
      include: path.resolve(__dirname, './src/locales/**')
    }),
    moduleExclude('text-encoding'),
    components({
      customComponentResolvers: ViteIconsResolver()
    }),
    icons(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/logo.png'],
      manifest: {
        name: 'Colors & Shapes',
        short_name: 'Colors',
        theme_color: '#16a34a',
        start_url: '/',
        display: 'standalone',
        background_color: '#1e293b',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  define: {
    'process.env.BASE_URL': process.env.VITE_BASE_URL
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  }
});
