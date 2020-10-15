import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Search from '@/views/Search.vue';

describe('Search view', () => {
  let fn;
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    fn = jest.fn();

    wrapper = mount(Search, {
      localVue,
      mocks: {
        $router: {
          replace: fn,
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
