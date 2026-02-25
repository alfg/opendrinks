import { config } from '@vue/test-utils';
import { h } from 'vue';
import { componentNames, Directives } from 'bootstrap-vue-next';

// Stub every b-* component with a slot-transparent div.
// Using actual bootstrap-vue-next components in jest fails because they pull
// in vue-router composables that require fully-resolved routes.
const slotStub = {
  render() {
    return h('div', {}, this.$slots.default?.() ?? []);
  },
};

const stubs = {};
componentNames.forEach(name => {
  stubs[name] = slotStub;
});
config.global.stubs = stubs;

// Register bootstrap-vue-next directives as no-ops to avoid resolution warnings.
// The real implementations reference internal components that fail in jest.
const noopDirective = { mounted() {}, updated() {} };
const directives = {};
Object.keys(Directives).forEach(name => {
  // 'vBTooltip' → 'bTooltip'  (directive name used after 'v-')
  const directiveName = name.charAt(1).toLowerCase() + name.slice(2);
  directives[directiveName] = noopDirective;
});
config.global.directives = directives;
