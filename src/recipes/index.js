/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import featured from '../featured.json';

async function forEachParallel(arr, func) {
  await Promise.all(arr.map(async item => func(item)));
}

function requireAll(r) {
  return r.keys();
}

const recipes = requireAll(require.context('./', true, /\.json$/));

function getRecipes() {
  const items = [];
  recipes.forEach(i => {
    const r = i.replace('./', '').replace('.json', '');
    const item = require(`./${r}`);
    item.filename = r;
    items.push(item);
  });
  return items;
}

function getRecipesByKeywords(keyword) {
  return getRecipes()
    .filter(recipe => recipe.keywords)
    .filter(recipe => recipe.keywords.some(recipeKey => recipeKey.toLowerCase() === keyword));
}

function getRecipe(id) {
  const r = id.replace('./', '').replace('.json', '');
  const item = require(`./${r}`);
  item.filename = r;
  item.img = require(`../assets/recipes/${item.image}`);
  return item;
}

function getRandom() {
  const rand = recipes[Math.floor(Math.random() * recipes.length)];
  return rand;
}

async function getSimilarRecipe(id) {
  const { keywords, ingredients, name } = getRecipe(id);
  const similarities = [];
  await forEachParallel(recipes, recipe => {
    const { keywords: currKeywords, ingredients: currIngredients, name: currName } = getRecipe(
      recipe,
    );

    if (name === currName) {
      return;
    }

    similarities.push({
      id: recipe,
      recipe: currName,
      tags: [],
    });

    currIngredients.forEach(ingredient => {
      if (ingredients.includes(ingredient)) {
        similarities[similarities.length - 1].tags.push(ingredient);
      }
    });

    if (currKeywords && keywords) {
      currKeywords.forEach(keyword => {
        if (keywords.includes(keyword)) {
          similarities[similarities.length - 1].tags.push(keyword);
        }
      });
    }
  });
  similarities.sort((a, b) => b.tags.length - a.tags.length);
  return similarities;
}

function getAllKeywords() {
  const keywords = new Set();
  const drinks = getRecipes();

  drinks.forEach(drink => {
    if (drink.keywords) {
      drink.keywords.forEach(keyword => {
        keywords.add(keyword.toLowerCase());
      });
    }
  });

  return Array.from(keywords);
}

function getAllKeywordsWithCount() {
  const keywordMap = new Map();
  const keywords = [];
  const drinks = getRecipes();

  drinks.forEach(drink => {
    if (drink.keywords) {
      drink.keywords
        .map(keyword => keyword.toLowerCase())
        .forEach(keyword => {
          keywordMap.set(keyword, keywordMap.has(keyword) ? keywordMap.get(keyword) + 1 : 1);
        });
    }
  });

  keywordMap.forEach((value, key) => keywords.push({ keyword: key, count: value }));

  return keywords;
}

function getFavoritedRecipes(favorites) {
  return getRecipes().filter(recipe => favorites.some(favorite => favorite === recipe.name));
}

function getFeaturedRecipes() {
  return featured.filter(feature => feature.enabled !== false);
}

export default {
  getAllKeywords,
  getAllKeywordsWithCount,
  getRecipes,
  getRecipesByKeywords,
  getRecipe,
  getRandom,
  getSimilarRecipe,
  getFavoritedRecipes,
  getFeaturedRecipes,
};
