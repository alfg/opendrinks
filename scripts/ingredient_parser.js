const fs = require('fs');

const findJsonFiles = (err, files) => {
  if (err) {
    console.log(err);
  } else {
    parseIngredientQuantities(files.filter(file => file.endsWith('.json')));
  }
};

const parseIngredientQuantities = files => {
  files.forEach(file => {
    var contents = fs.readFileSync(file, 'utf8');
    var jsonContents = JSON.parse(contents);
    if (jsonContents.hasOwnProperty('ingredients')) {
      var ingredientArray = [];
      for (var ingredient of jsonContents.ingredients) {
        try {
          var newIngredient = {};
          newIngredient.quantity = ingredient.match(/^[^a-zA-Z]+/)[0].trim();
          newIngredient.measure = ingredient
            .split(newIngredient.quantity)[1]
            .trim()
            .match(/^[a-zA-Z]+/)[0]
            .trim();
          newIngredient.ingredient = ingredient.split(newIngredient.measure)[1].trim();
          ingredientArray.push(newIngredient);
        } catch (err) {
          // "Input normalization"? Never met her.
          ingredientArray.push({ quantity: '', measure: '', ingredient: ingredient });
        }
      }

      jsonContents.ingredients = ingredientArray;

      console.log(jsonContents);
    }

    var fixedContents = JSON.stringify(jsonContents, null, 4);

    fs.writeFileSync(file, fixedContents);
  });
};

fs.readdir(__dirname, findJsonFiles);
