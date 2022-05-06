import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'editor',
    component: () => import('@/view/Index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/Login.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
