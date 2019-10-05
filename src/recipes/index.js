/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

async function forEachParallel(arr, func) {
  await Promise.all(
    arr.map(async item => func(item)),
  );
}

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

async function getSimilarRecipe(id) {
  const { keywords, ingredients, name } = getRecipe(id);
  const similarities = [];
  await forEachParallel(recipes, (recipe) => {
    const {
      keywords: currKeywords, ingredients: currIngredients,
      name: currName,
    } = getRecipe(recipe);

    if (name === currName) {
      return;
    }

    similarities.push({
      recipe: currName,
      tags: [],
    });

    currIngredients.forEach((ingredient) => {
      if (ingredients.includes(ingredient)) {
        similarities[similarities.length - 1].tags.push(ingredient);
      }
    });

    if (currKeywords && keywords) {
      currKeywords.forEach((keyword) => {
        if (keywords.includes(keyword)) {
          similarities[similarities.length - 1].tags.push(keyword);
        }
      });
    }
  });
  similarities.sort((a, b) => b.tags.length - a.tags.length);
  return similarities;
}

export default {
  getRecipes,
  getRecipe,
  getRandom,
  getSimilarRecipe,
};
