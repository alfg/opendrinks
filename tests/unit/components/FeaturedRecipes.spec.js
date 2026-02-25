import { shallowMount } from '@vue/test-utils';

import router from '@/router';
import i18n from '@/i18n';
import FeaturedRecipes from '@/components/FeaturedRecipes.vue';

describe('FeaturedRecipes', () => {
  const wrapper = shallowMount(FeaturedRecipes, {
    global: {
      plugins: [router, i18n],
    },
  });

  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test.skip('render title correctly', () => {
    expect(wrapper.findAll('h2')[0].text()).toBe('Popular Drinks');
  });

  test.skip('render description', () => {
    expect(wrapper.findAll('p')[0].text()).toBe('Popular drinks never going out of style!');
  });

  test('expand featured list if Load More clicked', () => {
    const EXPECTED_SIZE = wrapper.vm.featuredList[0].size + 6;
    wrapper.vm.loadMore(0);
    expect(wrapper.vm.featuredList[0].size).toBe(EXPECTED_SIZE);
  });
});
