import Vue from 'vue'
import VueRouter from 'vue-router';
import EmptyView from '@/components/EmptyView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: EmptyView,
    children: [
      {
        path: '',
        name: 'home',
        redirect: 'exams',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'exams',
        name: 'exams',
        component: () => import('@/views/Exams.vue'),
      },
      {
        path: 'room',
        name: 'room',
        component: () => import('@/views/Room.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
