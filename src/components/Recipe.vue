<template>
  <div id="recipe">
    <h1>{{ drink.name }}</h1>
    <p>{{ drink.description }}</p>

    <div><img src="" /></div>

    <h4>Ingredients</h4>
    <ul>
      <li v-for="(o, i) in drink.ingredients" v-bind:key="i">{{ o }}</li>
    </ul>

    <h4>Steps</h4>
    <ol>
      <li v-for="(o, i) in drink.steps" v-bind:key="i">{{ o }}</li>
    </ol>
  </div>
</template>

<script>
import recipes from '../recipes';

export default {
  name: 'Recipe',
  props: {
    name: String,
  },
  data() {
    return {
      json: {},
      drink: {},
    };
  },
  mounted() {
    const drink = recipes.getRecipe(this.name);
    this.drink = drink;
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
