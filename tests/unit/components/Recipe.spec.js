import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import Recipe from '@/components/Recipe.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('Recipe', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Recipe, {
      propsData: { name: 'mango-juice.json' },
      localVue,
      router,
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
