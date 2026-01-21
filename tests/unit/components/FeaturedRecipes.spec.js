import { shallowMount } from '@vue/test-utils';
import { createBootstrap } from 'bootstrap-vue-next';

import router from '@/router';
import i18n from '@/i18n';
import FeaturedRecipes from '@/components/FeaturedRecipes.vue';

describe('FeaturedRecipes', () => {
  const wrapper = shallowMount(FeaturedRecipes, {
    global: {
      plugins: [router, i18n, createBootstrap()],
      stubs: ['b-button'],
    },
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test.skip('render title correctly', () => {
    expect(
      wrapper
        .findAll('h2')
        .at(0)
        .text(),
    ).toBe('Popular Drinks');
  });

  test.skip('render description', () => {
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
