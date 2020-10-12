import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import recipes from '@/recipes';
import RecipeList from '@/components/RecipeList.vue';

const drinks = recipes.getRecipes();
const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('RecipeList', () => {
  const wrapper = shallowMount(RecipeList, {
    propsData: { title: 'Open Drinks - Test', items: drinks },
    localVue,
    router,
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('sets the correct title', () => {
    expect(window.document.title).toMatch(/Open Drinks - Test/);
  });

  test('should render the correct number of items per page', () => {
    wrapper.setData({ perPage: 5 });
    expect(wrapper.findAll('.card-wrapper').length).toBe(5);
  });

  test('should display the correct items when the page number changes', () => {
    wrapper.setData({ perPage: 3, pageNumber: 1 });
    wrapper.vm.$router.push({ query: { page: 2 } });
    expect(wrapper.vm.paginatedItems[0]).toBe(drinks[3]);
  });
});
