import { mount } from '@vue/test-utils';
import { createBootstrap } from 'bootstrap-vue-next';
import Search from '@/views/Search.vue';
import i18n from '@/i18n';

describe('Search view', () => {
  let fn;
  let wrapper;

  beforeEach(() => {
    fn = jest.fn();

    wrapper = mount(Search, {
      global: {
        plugins: [i18n, createBootstrap()],
        mocks: {
          $router: {
            replace: fn,
          },
        },
      },
    });
  });

  test('show cocktail list when text is entered and name is selected', () => {
    expect(wrapper.findAll('.list-group').exists()).toBe(false);

    wrapper.find('.form-control').setValue('Gin');
    wrapper.find('.form-control').trigger('keydown');
    expect(wrapper.find('.list-group').exists()).toBe(true);
  });
});
