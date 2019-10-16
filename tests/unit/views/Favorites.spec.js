import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import Favorites from '@/views/Favorites.vue';
const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Favorites', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem("favorites", JSON.stringify(["Aam Panna", "Aperol Spritz"]));

    wrapper = mount(Favorites, {
      localVue,
      router,
    });  
  });

  test('shows the amount of favorites', () => {
    expect(wrapper.find("#recipe-list").html()).toContain("Aam Panna");
    expect(wrapper.find("#recipe-list").html()).toContain("Aperol Spritz");
  });
});
