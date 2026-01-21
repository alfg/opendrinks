import { shallowMount } from '@vue/test-utils';
import { createBootstrap } from 'bootstrap-vue-next';

import router from '@/router';
import i18n from '@/i18n';
import recipes from '@/recipes';
import RecipeList from '@/components/RecipeList.vue';

const drinks = recipes.getRecipes();

describe('RecipeList', () => {
  const wrapper = shallowMount(RecipeList, {
    props: { title: 'Open Drinks - Test', items: drinks },
    global: {
      plugins: [router, i18n, createBootstrap()],
    },
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('sets the correct title', () => {
    expect(window.document.title).toMatch(/Open Drinks - Test/);
  });

  test('should render the correct number of items per page', () => {
    wrapper.setData({ perPage: 5 });
    expect(wrapper.findAll('.card-wrapper').length).toBe(5);
  });

  test('should display the correct items when the page number changes', () => {
    wrapper.setData({ perPage: 3 });
    wrapper.vm.$router.push({ query: { page: 2 } });
    expect(wrapper.vm.paginatedItems[0]).toBe(drinks[3]);
  });
});
