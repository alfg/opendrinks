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
Vue.config.ignoredElements = ['amp-ad'];

Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(BoostrapVue);
Vue.use(VueSocialSharing);

Vue.mixin({
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    },
    isPrintPage() {
      return this.$route.name === 'printRecipe';
    },
  },
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
