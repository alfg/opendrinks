import { mount } from '@vue/test-utils';
import { createBootstrap } from 'bootstrap-vue-next';
import VueSocialSharing from 'vue-social-sharing';

import router from '@/router';
import i18n from '@/i18n';
import App from '@/App.vue';

describe('App', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n, createBootstrap(), VueSocialSharing],
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
