import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io';
import VModal from 'vue-js-modal';

Vue.use(
  new VueSocketIO({
    debug: true,
    // connection: 'http://localhost:3000',
    connection: 'https://c4a5f804.ngrok.io',
    // vuex: {
    //   store,
    //   actionPrefix: 'SOCKET_',
    //   mutationPrefix: 'SOCKET_'
    // },
  }),
);

Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
