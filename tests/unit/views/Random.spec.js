import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Random from '@/views/Random.vue';

describe('Random view', () => {
  let fn;
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    fn = jest.fn();

    wrapper = mount(Random, {
      localVue,
      mocks: {
        $router: {
          replace: fn,
        },
      },
    });
  });

  test('should route to random recipe', () => {
    expect(wrapper.vm.$router.replace).toHaveBeenCalled();
  });

  test('should route to another recipe after clicking on "next" button', () => {
    wrapper.find('.float-right > *').trigger('click');
    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(2);
    const call1Parameter = fn.mock.calls[0];
    const call2Parameter = fn.mock.calls[1];
    // both calls must lead to different recipes
    expect(call1Parameter).not.toBe(call2Parameter);
  });
});
