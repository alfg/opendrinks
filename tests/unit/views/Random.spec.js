import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import Random from '@/views/Random.vue';



describe('Random view', () => {
    let fn = jest.fn();



  test('should display anything', () => {
    const localVue = createLocalVue();
localVue.use(BootstrapVue);
    const wrapper = mount(Random, {
      localVue,
      mocks: {
        $router: {
          replace: fn
        }
      }
    });
    expect(wrapper.vm.$router.replace).toHaveBeenCalled();
  });

});
