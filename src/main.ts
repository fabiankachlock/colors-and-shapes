import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './core/frameworks/i18n';
import { router } from './routes/router';
import './tailwind.css';

createApp(App).use(createPinia()).use(router).use(i18n).mount('#app');
