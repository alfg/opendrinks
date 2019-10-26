import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import recipes from '@/recipes';

import router from '@/router';
import RecipeTile from '@/components/RecipeTile.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('RecipeTile', () => {
  const baseRecipe = {
    name: 'Appletini',
    description: 'A sweet and sour, electric green drink with a sweet, delicious apple flavor',
    ingredients: [
      {
        quantity: '1',
        measure: 'fl oz',
        ingredient: 'green apple schnapps',
      },
      {
        quantity: '1/4',
        measure: 'fl oz',
        ingredient: 'lemon juice',
      },
    ],
    directions: ['Garnish with the apple slice'],
    image: 'appletini.jpg',
    keywords: ['vodka'],
  };

  const wrapper = shallowMount(RecipeTile, {
    propsData: { id: 'americano' },
    localVue,
    router,
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('should pass the correct props', () => {
    const props = wrapper.props();
    expect(props.id).toBe('americano');
  });

  test('should render the correct title', () => {
    const title = wrapper.find('h5').text();
    expect(title).toEqual('Americano');
  });

  test('should not crop short description', () => {
    wrapper.setData({
      drink: {
        ...baseRecipe,
        description: 'short description',
      },
    });
    expect(wrapper.vm.croppedDescription).toEqual('short description');
    expect(wrapper.vm.croppedDescription).not.toContain('...');
  });

  test('should crop long description', () => {
    const longDescription = 'long description'.repeat(10);
    wrapper.setData({
      drink: {
        ...baseRecipe,
        description: longDescription,
      },
    });
    expect(wrapper.vm.croppedDescription).not.toEqual(longDescription);
    expect(wrapper.vm.croppedDescription).toContain('...');
  });

  test('should load correct recipe on create', () => {
    recipes.getRecipe = jest.fn().mockReturnValueOnce(baseRecipe);
    shallowMount(RecipeTile, {
      propsData: { id: 'Appletini' },
      localVue,
      router,
    });
    expect(recipes.getRecipe).toHaveBeenCalledWith('Appletini');
  });
});
