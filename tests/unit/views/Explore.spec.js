import { mount } from '@vue/test-utils';

import router from '@/router';
import i18n from '@/i18n';
import Explore from '@/views/Explore.vue';

describe('Explore', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Explore, {
      global: {
        plugins: [router, i18n],
      },
    });
  });

  test('toggle filters when button is clicked', async () => {
    expect(wrapper.findAll('.col-12 h4').length).toBe(0);
    await wrapper.vm.$nextTick();
    wrapper.vm.showFilter = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.col-12 h4').text()).toBe('Filters');
  });

  test('displays filter keywords', async () => {
    wrapper.vm.showFilter = true;
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('gin');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.filter-item')[1].text()).toBe('gin');
  });

  test('removes a filter when clicked', async () => {
    wrapper.vm.showFilter = true;
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('gin');
    await wrapper.vm.$nextTick();
    await wrapper.findAll('.filter-item')[1].trigger('click');
    expect(wrapper.findAll('.filter-item').length).toBe(1);
  });
});
