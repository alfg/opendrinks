import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/css/main.css';

import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createBootstrap } from 'bootstrap-vue-next';
import VueSocialSharing from 'vue-social-sharing';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import i18n from './i18n';

const app = createApp(App);
const head = createHead();

app.config.globalProperties.$isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

app.config.compilerOptions.isCustomElement = tag => tag === 'amp-ad';

app.mixin({
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

app.use(head);
app.use(router);
app.use(i18n);
app.use(createBootstrap());
app.use(VueSocialSharing);

app.mount('#app');
