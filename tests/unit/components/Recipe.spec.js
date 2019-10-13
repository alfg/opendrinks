import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import Recipe from '@/components/Recipe.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('Recipe', () => {
  const wrapper = shallowMount(Recipe, {
    propsData: { name: 'mango-juice.json' },
    localVue,
    router,
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders the correct props', () => {
    const props = wrapper.props();
    expect(props.name).toBe('mango-juice.json');
  });

  test('renders the correct title', () => {
    const title = wrapper.find('h1').text();
    expect(title).toMatch(/Mango Juice/);
  });

  test('first keyword badge of recipe should correspond to first keyword array element in data', () => {
    const btn = wrapper.find('b-badge-stub');
    expect(btn.text()).toBe(wrapper.vm.$data.drink.keywords[0]);
  });
});
