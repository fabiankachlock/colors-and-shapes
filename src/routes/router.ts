import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Main from '../pages/Main.vue';
import Settings from '../pages/Settings.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

export const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
  strict: true
});
