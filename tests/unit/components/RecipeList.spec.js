import { shallowMount } from '@vue/test-utils';

import router from '@/router';
import i18n from '@/i18n';
import recipes from '@/recipes';
import RecipeList from '@/components/RecipeList.vue';

const drinks = recipes.getRecipes();

describe('RecipeList', () => {
  const wrapper = shallowMount(RecipeList, {
    props: { title: 'Open Drinks - Test', items: drinks },
    global: {
      plugins: [router, i18n],
    },
  });

  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('sets the correct title', () => {
    expect(window.document.title).toMatch(/Open Drinks - Test/);
  });

  test('should render the correct number of items per page', async () => {
    wrapper.vm.perPage = 5;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.paginatedItems.length).toBe(5);
  });

  test('should display the correct items when the page number changes', async () => {
    wrapper.vm.perPage = 3;
    wrapper.vm.currentPage = 2;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.paginatedItems[0]).toStrictEqual(drinks[3]);
  });
});
