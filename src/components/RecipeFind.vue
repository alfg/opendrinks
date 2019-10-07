<template>
	<div id="recipe-find">
		<b-form-input @keydown.enter="onEnter" v-model.trim="search"></b-form-input>

    <b-form-group class="mt-2" label="Filter by:">
      <b-form-radio-group
        v-model="selectedSearch"
        name="selectedSearch"
      >
        <b-form-radio value="name">Name</b-form-radio>
        <b-form-radio
          v-b-tooltip.hover
          title="You can search for multiple ingredients by seperating them with a space"
          value="ingredients"
        >Ingredients</b-form-radio>
        <b-form-radio
          v-b-tooltip.hover
          title="You can search for multiple keywords by seperating them with a space"
          value="keywords"
        >Keywords</b-form-radio>
      </b-form-radio-group>
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
import recipes from '../recipes';

const LIMIT = 50; // Limit filtered results.

export default {
  name: 'RecipeFind',
  data() {
    return {
      data: [],
      selectedSearch: 'name',
      search: '',
    };
  },
  computed: {
    filterResults() {
      const searchParts = this.search.toLowerCase().split(' ');
      const isNameEnabled = this.selectedSearch === 'name';
      const isIngredientsEnabled = this.selectedSearch === 'ingredients';
      const isKeywordsEnabled = this.selectedSearch === 'keywords';

      let filtered = [];

      if (isNameEnabled) {
        filtered = this.data
          .filter(recipe => recipe.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      }

      if (isIngredientsEnabled) {
        filtered = this.data.filter(recipe =>
          searchParts.every(s =>
            recipe.ingredients.some(i =>
              i.ingredient.toLowerCase().includes(s.toLowerCase())
            )
          )
        );
      }

      if (isKeywordsEnabled) {
        filtered = this.data.filter(recipe =>
          searchParts.every(
            s =>
              recipe.keywords &&
              recipe.keywords.some(k =>
                k.toLowerCase().includes(s.toLowerCase())
              )
          )
        );
      }

      // Sort the results.
      filtered = filtered.sort((recipeA, recipeB) => {
        // Name-matches to the top if the user wanted to find a drink based on the name
        const hasName = recipeB.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ? 1 : -1;
        const alphabetical =
          recipeB.name.toLowerCase() > recipeB.name.toLowerCase() ? -1 : 1;
        return !isNameEnabled ? 0 : hasName;
      });

      return filtered.slice(0, LIMIT);
    },
  },
  created() {
    const data = recipes.getRecipes();
    this.data = data;
    window.document.title = 'Open Drinks - Search';
  },
  methods: {
    onEnter() {
      this.$router.push({
        name: 'recipe',
        params: { id: this.filterResults[0].filename },
      });
    }
  }
};
</script>
