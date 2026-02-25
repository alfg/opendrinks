import { mount } from '@vue/test-utils';

import router from '@/router';
import i18n from '@/i18n';
import App from '@/App.vue';

describe('App', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
