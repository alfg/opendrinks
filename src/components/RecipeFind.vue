<template>
  <div id="recipe-find">
    <b-form-input @keydown.enter="onEnter" @input="onInput"></b-form-input>

    <b-form-group class="mt-2" label="Filter by:">
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="searchParameters"
        name="searchParameters"
      >
        <b-form-checkbox value="name">Name</b-form-checkbox>
        <b-form-checkbox v-b-tooltip.hover title="You can search for multiple ingredients by seperating them with a space" value="ingredients">Ingredients</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <b-list-group class="mt-4" v-if="search.length > 0">
      <b-list-group-item
        v-for="o in filterResults"
        v-bind:key="o.name"
        :href="'/recipe/' + o.filename"
      >{{ o.name }}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import recipes from "../recipes";

const limit = 50; // Limit filtered results.

export default {
  name: "RecipeFind",
  data() {
    return {
      data: [],
      searchParameters: ["name"],
      search: ""
    };
  },
  computed: {
    filterResults() {
      let searchParts = this.search.toLowerCase().split(" ");

      let filtered = this.data.filter(recipe =>
        // If enabled, find the drinks which names match
        (this.searchParameters.includes("name") ? recipe.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : false)
        ||
        // If enabled, find the drinks which ingredients contain all of the searched ingredients
        (this.searchParameters.includes("ingredients") ?
          recipe.ingredients.filter(ingredient =>
            searchParts.filter(searchPart =>
              ingredient.ingredient.toLowerCase().indexOf(searchPart) > -1
            ).length > 0
          ).length == searchParts.length
        : false)
      )
      .sort((recipeA, recipeB) =>
        // Name-matches to the top if the user wanted to find a drink based on the name
        !this.searchParameters.includes("name") ? 0 :
        recipeB.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ? 1 : -1
      );

      return filtered.slice(0, limit);
    }
  },
  created() {
    const data = recipes.getRecipes();
    this.data = data;
    window.document.title = "Open Drinks - Search";
  },
  methods: {
    onEnter() {
      this.$router.push({
        name: "recipe",
        params: { id: this.filterResults[0].filename }
      });
    },
    onInput(evt) {
      this.search = evt;
    }
  }
};
</script>
