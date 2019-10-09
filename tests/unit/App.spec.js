import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import App from '@/App.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('App', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(App, { localVue, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
