import recipes from '../../src/recipes/index';

exports.handler = function(event, context, callback) {
  const r = recipes.getRecipes();

  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipes: r }),
  });
}
