## 🍸 Submit a Drink Recipe
The [/src/recipes/](/src/recipes/) directory contains all the drink recipes as a JSON file. Add your own by following the process below:

* Fork the project
* Create a new json file named after the drink
* The filename should be all lowercase and hyphens only. `example-drink.json`
* Use this template to add your drink recipe:

```json
{
    "name": "<Name of drink>",
    "description": "<Short description of drink>",
    "github": "<Your Github username>",
    "ingredients": [
        "<Ingredient 1>",
        "<Ingredient 2>",
        "<Ingredient 3>"
    ],
    "directions": [
        "<Step 1>",
        "<Step 2>",
        "<Step 3>"
    ],
    "image": "<drink-name.jpg>",
    "source": "<url>"
}
```

* Add an image to the [/src/recipes/img](/src/recipes/img/).
  * Filename should match recipe filename
  * JPG format, 600x400px if possible, 200KB max in size
* source is an optional field
* Submit a Pull Request with your recipe!
* Once approved and merged, the latest update will be published to https://opendrinks.netlify.com

