import recipes from '../../src/recipes/index';

exports.handler = function(event, context, callback) {
  const r = recipes.getRecipes();

  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600', // 60 minutes.
    },
    body: JSON.stringify({ recipes: r }),
  });
};
