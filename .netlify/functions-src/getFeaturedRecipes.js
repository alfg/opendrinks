import recipes from '../../src/recipes/index';

exports.handler = function(event, context, callback) {
  const featuredList = recipes.getFeaturedRecipes();

  // Update the featuredList with recipe data.
  featuredList.forEach(feature => {
    const items = [];
    feature.items.forEach(recipeId => {
      const r = recipes.getRecipe(recipeId);
      items.push(r);
    });
    feature.items = items;
  });

  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600', // 60 minutes.
    },
    body: JSON.stringify({ featured: featuredList }),
  });
};
