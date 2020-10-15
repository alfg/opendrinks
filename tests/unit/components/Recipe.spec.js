import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import VueSocialSharing from 'vue-social-sharing';

import router from '@/router';
import Recipe from '@/components/Recipe.vue';
import FavoriteStar from "@/components/FavoriteStar.vue"

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(VueSocialSharing);

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

  it("shows that the drink has been favorited", () => {
    wrapper.setData({ isFavorited: true });
    const star = wrapper.find(FavoriteStar);
    const starProps = star.props()
    expect(starProps.isFavorited).toBe(true);
  });

  it("renders the correct amount of ingredients and directions", () => {
    const listArray = wrapper.findAll('li')
    expect(listArray.length).toBe(wrapper.vm.$data.drink.ingredients.length + wrapper.vm.$data.drink.directions.length)
  });
});
