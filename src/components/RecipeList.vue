<template>
  <div id="recipe-list">
    <div v-for="(o, i) in items" v-bind:key="i">
      <b-card
        :title="o.name"
        :img-src="o.image"
        :img-alt="o.name"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          {{ o.description }}
        </b-card-text>

        <b-button :href="'/recipe/' + o.filename" variant="primary">View Recipe</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import recipes from '../recipes';

export default {
  name: 'RecipeList',
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.getDrinks();
  },
  methods: {
    getDrinks() {
      const drinks = recipes.getRecipes();
      this.items = drinks;
    },
  },
};
</script>
