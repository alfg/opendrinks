import { mount } from '@vue/test-utils';
import { createBootstrap } from 'bootstrap-vue-next';

import router from '@/router';
import i18n from '@/i18n';
import Explore from '@/views/Explore.vue';

describe('Explore', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Explore, {
      global: {
        plugins: [router, i18n, createBootstrap()],
      },
    });
  });

  test('toggle filters when button is clicked', () => {
    expect(wrapper.findAll('.col-12 h4').exists()).toBe(false);
    wrapper.find('.btn-outline-secondary').trigger('click');
    expect(wrapper.find('.col-12 h4').text()).toBe('Filters');
  });

  test('displays filter keywords', () => {
    wrapper.find('.btn-outline-secondary').trigger('click');
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('gin');
    expect(
      wrapper
        .findAll('.filter-item')
        .at(1)
        .text(),
    ).toBe('gin');
  });

  test('removes a filter when clicked', () => {
    wrapper.find('.btn-outline-secondary').trigger('click');
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('gin');
    wrapper
      .findAll('.filter-item')
      .at(1)
      .trigger('click');
    expect(wrapper.findAll('.filter-item').length).toBe(1);
  });
});
