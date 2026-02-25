import { mount } from '@vue/test-utils';

import router from '@/router';
import i18n from '@/i18n';
import Favorites from '@/views/Favorites.vue';

describe('Favorites (Populated)', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem('favorites', JSON.stringify(['Aam Panna', 'Aperol Spritz']));

    wrapper = mount(Favorites, {
      global: {
        plugins: [router, i18n],
      },
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
      global: {
        plugins: [router, i18n],
      },
    });
  });

  test('show correct empty state', () => {
    localStorage.clear();
    localStorage.setItem('favorites', JSON.stringify([]));
    wrapper = mount(Favorites, {
      global: {
        plugins: [router, i18n],
      },
    });
    expect(wrapper.text()).toContain("You don't have any favorite drinks");
  });
});
