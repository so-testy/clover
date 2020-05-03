import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
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
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
