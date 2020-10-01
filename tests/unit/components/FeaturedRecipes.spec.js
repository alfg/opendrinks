import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import FeaturedRecipes from '@/components/FeaturedRecipes.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('FeaturedRecipes', () => {
  const wrapper = shallowMount(FeaturedRecipes, {
    localVue,
    router,
    stubs: ['b-button'],
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('render title correctly', () => {
    expect(
      wrapper
        .findAll('h2')
        .at(0)
        .text(),
    ).toBe('Popular Drinks');
  });

  test('render description', () => {
    expect(
      wrapper
        .findAll('p')
        .at(0)
        .text(),
    ).toBe('Popular drinks never going out of style!');
  });

  test('expand featured list if Load More clicked', () => {
    const EXPECTED_SIZE = wrapper.vm.featuredList[0].size + 6;
    wrapper.vm.loadMore(0);

    expect(wrapper.vm.featuredList[0].size).toBe(EXPECTED_SIZE);
  });
});
