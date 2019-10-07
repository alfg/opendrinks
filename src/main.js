import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import BoostrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'core-js';

Vue.config.productionTip = false;

Vue.use(BoostrapVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
