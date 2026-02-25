import { mount } from '@vue/test-utils';
import Random from '@/views/Random.vue';
import i18n from '@/i18n';

describe('Random view', () => {
  let fn;
  let wrapper;

  beforeEach(() => {
    fn = jest.fn();

    wrapper = mount(Random, {
      global: {
        plugins: [i18n],
        mocks: {
          $router: {
            replace: fn,
          },
        },
        stubs: ['router-link', 'share-network', 'ShareNetwork'],
      },
    });
  });

  test('should route to random recipe', () => {
    expect(wrapper.vm.$router.replace).toHaveBeenCalled();
  });

  test('should route to another recipe after clicking on "next" button', async () => {
    await wrapper.find('.float-end > *').trigger('click');
    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(2);
    const call1Parameter = fn.mock.calls[0];
    const call2Parameter = fn.mock.calls[1];
    // both calls must lead to different recipes
    expect(call1Parameter).not.toBe(call2Parameter);
  });
});
