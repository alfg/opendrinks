import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import Favorites from '@/views/Favorites.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Favorites (Populated)', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem('favorites', JSON.stringify(['Aam Panna', 'Aperol Spritz']));

    wrapper = mount(Favorites, {
      localVue,
      router,
    });
  });

  test('shows the amount of favorites', () => {
    expect(wrapper.find('#recipe-list').html()).toContain('Aam Panna');
    expect(wrapper.find('#recipe-list').html()).toContain('Aperol Spritz');
  });

  test('shows favorite star', () => {
    expect(wrapper.find('#star').exists()).toBe(true);
  });

  test('remove favorite recipe', () => {
    expect(wrapper.find('#star').trigger('click'));
    const favs = JSON.parse(localStorage.getItem('favorites'));
    expect(favs.length === 1).toBe(true);
  });
});

describe('Favorites (Empty)', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Favorites, {
      localVue,
      router,
    });
  });

  test('show correct empty state', () => {
    localStorage.setItem('favorites', JSON.stringify([]));
    wrapper = mount(Favorites, {
      localVue,
      router,
    });
    expect(wrapper.find('.alert-info').html()).toContain("You don't have any favorite drinks");
  });
});
