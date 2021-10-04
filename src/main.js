import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/main.css';

import Vue from 'vue';
import VueMeta from 'vue-meta';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueSocialSharing from 'vue-social-sharing';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'core-js';
import i18n from './i18n';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['amp-ad'];

Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
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
  i18n,
  render: h => h(App),
}).$mount('#app');
