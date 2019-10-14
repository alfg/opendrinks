import recipes from '../../src/recipes/index';

exports.handler = function(event, context, callback) {
  const path = event.path || null;
  const id = path.split('/').slice(-1)[0];
  let r;

  try {
    r = recipes.getRecipe(id);
  } catch (error) {
    return callback(null, {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: 404, message: 'Recipe not found.' }),
    });
  }

  return callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600', // 60 minutes.
    },
    body: JSON.stringify({ recipe: r }),
  });
};
