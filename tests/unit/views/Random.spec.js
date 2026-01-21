import { mount } from '@vue/test-utils';
import { createBootstrap } from 'bootstrap-vue-next';
import VueSocialSharing from 'vue-social-sharing';
import Random from '@/views/Random.vue';
import i18n from '@/i18n';

describe('Random view', () => {
  let fn;
  let wrapper;

  beforeEach(() => {
    fn = jest.fn();

    wrapper = mount(Random, {
      global: {
        plugins: [i18n, createBootstrap(), VueSocialSharing],
        mocks: {
          $router: {
            replace: fn,
          },
        },
        stubs: ['router-link'],
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
