import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/main.css';

import Vue from 'vue';
import VueMeta from 'vue-meta';
import BoostrapVue from 'bootstrap-vue';
import VueSocialSharing from 'vue-social-sharing';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'core-js';

Vue.config.productionTip = false;

Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(BoostrapVue);
Vue.use(VueSocialSharing);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
