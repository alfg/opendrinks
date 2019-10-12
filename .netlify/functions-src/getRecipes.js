import recipes from '../../src/recipes/index';

exports.handler = function(event, context, callback) {
  const r = recipes.getRecipes();

  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
<<<<<<< HEAD
=======
      'Cache-Control': 'public, s-maxage=3600' // 60 minutes.
>>>>>>> 855fe49fcd477323400d7680f0b4117ee7112ba7
    },
    body: JSON.stringify({ recipes: r }),
  });
}
