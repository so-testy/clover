import Vue from 'vue';
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
        component: EmptyView,
        children: [
          {
            path: '',
            name: 'exams',
            component: () => import('@/views/Exams.vue'),
          },
          {
            path: 'new',
            name: 'exams.new',
            component: () => import('@/views/ExamCreate.vue'),
          },
        ],
      },
      {
        path: 'room',
        name: 'room',
        props: (route) => ({ type: route.query.type }),
        component: () => import('@/views/UserRoom.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
