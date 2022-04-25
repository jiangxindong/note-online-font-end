import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'test',
    component: () => {
      import('@/components/Test.vue');
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
