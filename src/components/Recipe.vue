<template>
  <div id="recipe">
    <h1>{{ drink.name }}</h1>
    <p>{{ drink.description }}</p>

    <p class="text-muted">
      Contributed by:
      <a :href="getGithubUrl(drink.github)">{{ drink.github }}</a>
    </p>

    <b-img
      class="mb-4"
      :src="drink.image ? require(`@/recipes/img/${drink.image}`) : null"
      :alt="drink.name"
      rounded
      fluid-grow
    />

    <h4>Ingredients</h4>
    <ul>
      <li v-for="(o, i) in drink.ingredients" v-bind:key="i">{{ o }}</li>
    </ul>

    <h4>Directions</h4>
    <ol>
      <li v-for="(o, i) in drink.directions" v-bind:key="i">{{ o }}</li>
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
  watch: {
    name(newVal) {
      this.getRecipe(newVal);
    },
  },
  data() {
    return {
      json: {},
      drink: {},
    };
  },
  created() {
    this.getRecipe(this.name);
    document.title = 'Open Drinks - ' + this.drink.name;
  },
  methods: {
    getRecipe(name) {
      const drink = recipes.getRecipe(name);
      this.drink = drink;
    },
    getGithubUrl(name) {
      return `https://github.com/${name}`;
    },
  },
};
</script>
