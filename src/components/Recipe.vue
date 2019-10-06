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
      <li
        v-for="(o, i) in drink.ingredients"
        v-bind:key="i">{{ o.quantity + ' ' + o.measure + ' ' + o.ingredient }}
      </li>
    </ul>

    <h4>Directions</h4>
    <ol>
      <li v-for="(o, i) in drink.directions" v-bind:key="i">{{ o }}</li>
    </ol>

    <div v-if="drink.keywords">
      <b-badge
        v-for="(o, i) in drink.keywords"
        v-bind:key="i"
        variant="secondary"
        :style="badgeStyle"
      >{{ o }}</b-badge>
    </div>

    <div class="mt-4" v-if="drink.source">
      <span>
        View full recipe at:
        <a :href="drink.source">{{drink.source}}</a>
      </span>
    </div>

    <div class="print-button mt-4 mb-4">
      <b-button
        variant="outline-primary"
        :href="`/recipe/${this.name}/print`"
        target="_blank">Print</b-button>
    </div>

    <h4>Similar drinks</h4>
    <div class="d-flex flex-row">
      <div v-for="(similarRecipe, i) in similarRecipes" v-bind:key="i" class="col-3 pr-0 pl-0">
        <RecipeTile v-bind:id="similarRecipe.id"/>
      </div>
    </div>
  </div>

</template>

<script>
import recipes from '../recipes';
import RecipeTile from '@/components/RecipeTile.vue';

export default {
  name: 'Recipe',
  components: {
    RecipeTile,
  },
  props: {
    name: String,
  },
  watch: {
    name(newVal) {
      this.getRecipe(newVal);
      window.document.title = `Open Drinks - ${this.drink.name}`;
    },
  },
  data() {
    return {
      json: {},
      drink: {},
      similarRecipes: {},
      badgeStyle: {
        'margin-right': '0.2vw',
      },
    };
  },
  async created() {
    this.getRecipe(this.name);
    window.document.title = `Open Drinks - ${this.drink.name}`;
    this.similarRecipes = (await recipes.getSimilarRecipe(this.name)).slice(0, 4);
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

<style scoped>
.print-button {
  margin-top: 1em;
}
</style>
