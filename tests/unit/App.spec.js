import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import VueSocialSharing from 'vue-social-sharing';

import router from '@/router';
import i18n from '@/i18n';
import App from '@/App.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(VueSocialSharing);

describe('App', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(App, { localVue, router, i18n });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
