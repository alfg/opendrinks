import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import VueSocialSharing from 'vue-social-sharing';

import router from '@/router';
import i18n from '@/i18n';
import Recipe from '@/components/Recipe.vue';
import RecipeToolbar from '@/components/RecipeToolbar.vue';
import FavoriteStar from '@/components/FavoriteStar.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(VueSocialSharing);

describe('Recipe', () => {
  const wrapper = mount(Recipe, {
    propsData: { name: 'mango-juice.json' },
    localVue,
    router,
    i18n,
    stubs: ['router-link'],
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
    const btn = wrapper.find('.badge');
    expect(btn.text()).toBe(wrapper.vm.$data.drink.keywords[0]);
  });

  it('shows that the drink has been favorited', () => {
    const toolbar = wrapper.find(RecipeToolbar);
    toolbar.setData({ favorites: ['Mango Juice'] });
    const star = toolbar.find(FavoriteStar);
    const starProps = star.props();
    expect(starProps.isFavorited).toBe(true);
  });

  it('renders the correct amount of ingredients', () => {
    const listArray = wrapper.findAll('.recipe-ingredients li');
    expect(listArray.length).toBe(wrapper.vm.$data.drink.ingredients.length);
  });

  it('renders the correct amount of directions', () => {
    const listArray = wrapper.findAll('.recipe-directions-list li');
    expect(listArray.length).toBe(wrapper.vm.$data.drink.directions.length);
  });

  it('renders the first ingredient correctly', () => {
    const listArray = wrapper.findAll('.recipe-ingredients li');
    const firstIngredientListItem = listArray.at(0);
    const firstIngredient = wrapper.vm.$data.drink.ingredients[0];
    const matchingString = `${firstIngredient.quantity} ${firstIngredient.measure} ${firstIngredient.ingredient}`;
    expect(firstIngredientListItem.text()).toBe(matchingString);
  });

  it('renders the first direction correctly', () => {
    const listArray = wrapper.findAll('.recipe-directions-list li');
    const firstDirection = listArray.at(0);
    const matchingString = wrapper.vm.$data.drink.directions[0];
    expect(firstDirection.text()).toBe(matchingString);
  });
});
