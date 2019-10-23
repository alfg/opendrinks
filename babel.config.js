//code starting
module.exports = {
  presets: ['@vue/app'],
  env: {
    test: {
      plugins: ['require-context-hook'],
    },
  },
};
