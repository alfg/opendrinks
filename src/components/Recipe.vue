<template>
  <div id="recipe">
    <h1>{{ drink.name }}</h1>
    <div v-if="drink.tags">
      <b-badge
        v-for="(o, i) in drink.tags"
        v-bind:key="i"
        variant="secondary"
        :style="badgeStyle"
      >{{ o }}</b-badge>
    </div>
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
    <div v-if="drink.source">
      <span>
        View full recipe at:
        <a :href="drink.source">{{drink.source}}</a>
      </span>
    </div>
  </div>
</template>

<script>
import recipes from "../recipes";

export default {
  name: "Recipe",
  props: {
    name: String
  },
  watch: {
    name(newVal) {
      this.getRecipe(newVal);
      window.document.title = `Open Drinks - ${this.drink.name}`;
    }
  },
  data() {
    return {
      json: {},
      drink: {},
      badgeStyle: {
        "margin-right": "0.2vw"
      }
    };
  },
  created() {
    this.getRecipe(this.name);
    window.document.title = `Open Drinks - ${this.drink.name}`;
  },
  methods: {
    getRecipe(name) {
      const drink = recipes.getRecipe(name);
      this.drink = drink;
    },
    getGithubUrl(name) {
      return `https://github.com/${name}`;
    }
  }
};
</script>
