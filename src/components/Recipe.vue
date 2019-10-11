<template>
  <div id="recipe">
    <div class="print-button">
      <b-button
        variant="outline-primary"
        :href="`/recipe/${this.name}/print`"
        target="_blank"
        class="float-right"
      >
        Print
      </b-button>
    </div>

    <h1>{{ drink.name }}</h1>

    <div v-if="drink.keywords" class="mb-2">
      <b-badge
        v-for="(o, i) in drink.keywords"
        v-bind:key="i"
        variant="secondary"
        :style="badgeStyle"
        :to="{ name: 'keyword', params: { keyword: urlEncode(o) } }"
        >{{ o }}</b-badge
      >
    </div>

    <p>{{ drink.description }}</p>
    <FavoriteStar class="float-right" @favorite="favorited" :isFavorited="isFavorited">
    </FavoriteStar>
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
      <li v-for="(o, i) in drink.ingredients" v-bind:key="i">
        {{ o.quantity + ' ' + o.measure + ' ' + o.ingredient }}
      </li>
    </ul>

    <h4>Directions</h4>
    <ol class="mb-4">
      <li v-for="(o, i) in drink.directions" v-bind:key="i">{{ o }}</li>
    </ol>

    <div class="mt-4 mb-4" v-if="drink.source">
      <span>
        View full recipe at:
        <a :href="drink.source">{{ drink.source }}</a>
      </span>
    </div>

    <div class="similarDrinks mt-4 mb-4">
      <h4>Similar drinks</h4>
      <b-card-group deck>
        <RecipeTile
          v-for="(similarRecipe, i) in similarRecipes"
          v-bind:key="i"
          v-bind:id="similarRecipe.id"
        />
      </b-card-group>
    </div>
  </div>
</template>

<script>
import recipes from '../recipes';
import RecipeTile from '@/components/RecipeTile.vue';
import FavoriteStar from './FavoriteStar.vue';

const NUMBER_OF_SIMILAR_RECIPES = 4;

export default {
  name: 'Recipe',
  props: {
    name: String,
  },
  components: {
    RecipeTile,
    FavoriteStar,
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
      isFavorited: false,
      favorites: [],
    };
  },
  async created() {
    this.getRecipe(this.name);
    window.document.title = `Open Drinks - ${this.drink.name}`;
    this.similarRecipes = (await recipes.getSimilarRecipe(this.name)).slice(
      0,
      NUMBER_OF_SIMILAR_RECIPES,
    );
    this.favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    if (this.favorites.indexOf(this.drink.name) !== -1) {
      this.isFavorited = true;
    }
  },
  methods: {
    getRecipe(name) {
      const drink = recipes.getRecipe(name);
      this.drink = drink;
    },
    getGithubUrl(name) {
      return `https://github.com/${name}`;
    },
    urlEncode(item) {
      return window.encodeURI(item);
    },
    favorited() {
      const index = this.favorites.indexOf(this.drink.name);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(this.drink.name);
      }
      this.isFavorited = !this.isFavorited;
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
};
</script>

<style scoped>
.print-button {
  margin-top: 1em;
}
</style>
