<template>
  <div id="recipe-list" class="container">
    <b-card-group deck>
      <div
        v-for="(o, i) in items"
        v-bind:key="i"
      >
        <b-card
          :title="o.name"
          :img-src="o.image"
          :img-alt="o.name"
          img-top
          style="max-width: 20rem;"
        >
          <b-card-text>
            {{ o.description }}
          </b-card-text>

          <b-button :href="'/recipe/' + o.filename" variant="primary">View Recipe</b-button>
        </b-card>
      </div>
    </b-card-group>
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

<style scoped>
.card-deck .card {
  margin-right: 0;
}
</style>
