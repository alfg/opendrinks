import Vue from 'vue';
import Example from './Example.vue';

// helper function that mounts and returns the rendered text
function getRenderedText(Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({ propsData }).$mount();
  return vm.$el.textContent;
}

// What is being tested
describe('Example.vue', () => {
  // What are you testing
  it('renders correctly with different props', () => {
    expect(
      getRenderedText(Example, {
        // tested data
        msg: 'Hello',
        // Expected result
      }),
    ).toBe('Hello');

    expect(
      getRenderedText(Example, {
        msg: 'Bye',
      }),
    ).toBe('Bye');
  });
});
