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
        {
            "quantity": "<quantity of ingredient 1>",
            "measure": "<type of measure (oz, cup, teaspoon)>",
            "ingredient": "<ingredient 1>"
        },
        {
            "quantity": "<quantity of ingredient 2>",
            "measure": "<type of measure (oz, cup, teaspoon)>",
            "ingredient": "<ingredient 2>"
        },
        {
            "quantity": "<quantity of ingredient 3>",
            "measure": "<type of measure (oz, cup, teaspoon)>",
            "ingredient": "<ingredient 3>"
        },
    ],
    "directions": [
        "<Step 1>",
        "<Step 2>",
        "<Step 3>"
    ],
    "image": "<drink-name.jpg>",
    "source": "<source url if available, otherwise remove this line>",
    "keywords": [
        "<keywords if available>",
        "...",
    ]
}
```

* Add an image to the [/src/assets/recipes/](/src/assets/recipes/).
  * Filename should match recipe filename
  * JPG format, **600x400px** if possible, 200KB max in size
* source is an optional field
* Submit a Pull Request with your recipe! 
* An automated preview link will be generated towards the bottom of the PR so your changes can be previewed while in review.
* Once approved and merged, the latest update will be published to https://opendrinks.io

---

## ✅ Add a Test
If you are adding a unit test, we are using the [jest](https://jestjs.io/) testing framework. 

All tests are located in [/tests](/tests). If you're unfamiliar with testing, or this project, take a look at the [example test](tests/unit/example.spec.js) located there. 

Testing files must end in ".spec.js" or ".test.js"

### Running tests 
Testing command follows the structure of "npm run [test folder]:[test sub folder]
e.g. the example test would be "npm run test:unit"
