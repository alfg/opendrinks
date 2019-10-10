import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import Recipe from '@/components/Recipe.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('Recipe', () => {
  const wrapper = mount(Recipe, {
    propsData: { name: 'mango-juice.json' },
    localVue,
    router,
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
