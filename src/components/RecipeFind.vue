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

const limit = 10; // Limit filtered results.

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
      let filtered = [];

      // First, display the drinks where the name matches
      if (this.searchParameters.includes("name")) {
        const matchingName = this.data.filter(
          item =>
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
        filtered.push(...matchingName);
      }

      // Then display the drinks whose ingredients match
      if (this.searchParameters.includes("ingredients")) {
        let matchingIngredient = this.data.filter(
          item =>
            // To prevent adding the same drink multiple times
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) == -1
        );

        // Allow for multiple ingredients to match, seperated by space
        this.search
          .toLowerCase()
          .split(" ")
          .forEach(searchIngredient => {
            matchingIngredient = matchingIngredient.filter(
              recipe =>
                recipe.ingredients.filter(
                  ingredient =>
                    ingredient.toLowerCase().indexOf(searchIngredient) > -1
                ).length > 0
            );
          });
        filtered.push(...matchingIngredient);
      }

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
