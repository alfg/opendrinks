import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/css/main.css';

import { createApp, computed, getCurrentInstance } from 'vue';
import { createUnhead, useHead } from '@unhead/vue';
import {
  createBootstrap,
  Components as BVNComponents,
  Directives as BVNDirectives,
} from 'bootstrap-vue-next';
import VueSocialSharing from 'vue-social-sharing';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'core-js';
import i18n from './i18n';

const app = createApp(App);

// @unhead/vue — manages <head> reactively
const head = createUnhead();
app.use(head);

// Global mixin so Options API components can define a head() function
app.mixin({
  setup() {
    const inst = getCurrentInstance();
    if (inst?.type?.head) {
      const headFn = inst.type.head;
      useHead(computed(() => headFn.call(inst.proxy)));
    }
  },
});

app.use(createBootstrap());

// Register all bootstrap-vue-next components globally
Object.entries(BVNComponents).forEach(([name, component]) => {
  app.component(name, component);
});

// Register all bootstrap-vue-next directives globally (vBTooltip → 'b-tooltip')
Object.entries(BVNDirectives).forEach(([name, directive]) => {
  const directiveName = name
    .slice(1)
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1);
  app.directive(directiveName, directive);
});

app.use(VueSocialSharing);
app.use(router);
app.use(i18n);

app.mixin({
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    },
    isPrintPage() {
      return this.$route && this.$route.name === 'printRecipe';
    },
  },
});

app.mount('#app');
