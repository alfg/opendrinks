const fs = require('fs');
var Ajv = require('ajv');
var ajv = new Ajv();

const findRecipeFiles = (err, files) => {
  if (err) {
    console.log(err);
  } else {
    validateRecipe(files.filter(file => file.endsWith('.json')));
  }
};

const validateRecipe = files => {
  let foundError = false;
  files.forEach(file => {
    var contents = fs.readFileSync(__dirname + '/../src/recipes/' + file, 'utf8');
    var jsonContents = JSON.parse(contents);

    var valid = ajv.validate('recipeSchema', jsonContents);
    if (!valid) {
      console.log(`Validation failed for ${file}!`);
      console.log(ajv.errorsText());
      foundError = true;
    }
  });

  if (foundError) process.exit(1);
};

const schema = fs.readFileSync('scripts/recipe_schema.json', 'utf-8');
const schemaJson = JSON.parse(schema);
ajv.addSchema(schemaJson, 'recipeSchema');
fs.readdir(__dirname + '/../src/recipes', findRecipeFiles);
