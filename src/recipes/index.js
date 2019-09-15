/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

function requireAll(r) {
  return r.keys();
}

const recipes = requireAll(require.context('./', true, /\.json$/));

function getRecipe(id) {
  const item = require(`@/recipes/${id.replace('./', '')}`);
  return item;
}

function getRandom() {
  const rand = recipes[Math.floor(Math.random() * recipes.length)];
  return rand;
}

export default {
  getRecipe,
  getRandom,
};
