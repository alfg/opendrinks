/* eslint-env jest */
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();

// jsdom does not implement window.scrollTo
window.scrollTo = jest.fn();
