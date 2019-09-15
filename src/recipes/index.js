/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

function requireAll(r) {
  return r.keys();
}

const recipes = requireAll(require.context('./', true, /\.json$/));

function getRecipes() {
  const items = [];

  recipes.forEach((i) => {
    const r = i.replace('./', '').replace('.json', '');
    const item = require(`@/recipes/${r}`);
    item.filename = r;
    items.push(item);
  });
  return items;
}

function getRecipe(id) {
  const r = id.replace('./', '').replace('.json', '');
  const item = require(`@/recipes/${r}`);
  return item;
}

function getRandom() {
  const rand = recipes[Math.floor(Math.random() * recipes.length)];
  return rand;
}

export default {
  getRecipes,
  getRecipe,
  getRandom,
};
