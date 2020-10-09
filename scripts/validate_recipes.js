const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const Ajv = require('ajv');

const ajv = new Ajv();

const validateRecipe = files => {
  let foundError = false;
  files.forEach(file => {
    const contents = fs.readFileSync(`${__dirname}/../src/recipes/${file}`, 'utf8');

    let jsonContents;
    try {
      jsonContents = JSON.parse(contents);
    } catch (error) {
      console.log(`Error reading: ${file}!`);
      foundError = true;
    }

    const valid = ajv.validate('recipeSchema', jsonContents);
    if (!valid) {
      console.log(`Validation failed for ${file}!`);
      console.log(ajv.errorsText());
      foundError = true;
    }
  });

  if (foundError) process.exit(1);
};

const findRecipeFiles = (err, files) => {
  if (err) {
    console.log(err);
  } else {
    validateRecipe(files.filter(file => file.endsWith('.json')));
  }
};

const schema = fs.readFileSync('scripts/recipe_schema.json', 'utf-8');
const schemaJson = JSON.parse(schema);
ajv.addSchema(schemaJson, 'recipeSchema');
fs.readdir(`${__dirname}/../src/recipes`, findRecipeFiles);
