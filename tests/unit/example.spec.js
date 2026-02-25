import Vue from 'vue';
// NOTE: Example.vue does not exist in this project; this test is intentionally skipped.

// What is being tested
describe.skip('Example.vue', () => {
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
