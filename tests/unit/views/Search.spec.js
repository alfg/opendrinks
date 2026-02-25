import { mount } from '@vue/test-utils';
import Search from '@/views/Search.vue';
import RecipeFind from '@/components/RecipeFind.vue';
import i18n from '@/i18n';

describe('Search view', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Search, {
      global: {
        plugins: [i18n],
        mocks: {
          $router: { replace: jest.fn() },
        },
        stubs: ['router-link', 'b-list-group-item'],
      },
    });
  });

  test('show cocktail list when text is entered and name is selected', async () => {
    const recipeFind = wrapper.findComponent(RecipeFind);
    expect(recipeFind.exists()).toBe(true);
    recipeFind.vm.search = 'Gin';
    await recipeFind.vm.$nextTick();
    expect(recipeFind.vm.filterResults.length).toBeGreaterThan(0);
  });
});
