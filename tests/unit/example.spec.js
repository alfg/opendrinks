import Vue from 'vue'
import TestExample from '@/components/TestExample.vue'

// helper function that mounts and returns the rendered text 
function getRenderedText (Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm.$el.textContent
}
  
// What is being tested
describe('TestExample.vue', () => {
  
  // What are you testing
  it('renders correctly with different props', () => {
	expect(getRenderedText(TestExample, {
	  // tested data
	  msg: 'Hello'
	//Expected result
	})).toBe('Hello')

	expect(getRenderedText(TestExample, {
	  msg: 'Bye'
	})).toBe('Bye')
  })
})
