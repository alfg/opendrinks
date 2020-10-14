<template>
  <div id="recipe">
    <div class="d-flex justify-content-between align-items-start">
      <div>
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
      </div>

      <div class="d-flex align-items-center">
        <div class="show-image" v-if="isPrint">
          <b-form-checkbox
            v-model="showImage"
            name="show-image-checkbox"
            :value="false"
            :unchecked-value="true"
            class="mr-3"
          >
            Hide Image
          </b-form-checkbox>
        </div>
        <FavoriteStar class="mr-3" @favorite="favorited" :isFavorited="isFavorited"> </FavoriteStar>

        <div class="print-button">
          <b-button v-if="isPrint" variant="outline-primary" @click="print()">
            Print
          </b-button>
          <b-button
            v-else
            variant="outline-primary"
            :to="`/recipe/${this.name}/print`"
            target="_blank"
          >
            Print
          </b-button>
        </div>

        <div class="share-button">
          <b-dropdown text="Share" variant="outline-primary" right class="m-2">
            <b-dropdown-item>
              <ShareNetwork
                network="facebook"
                :url="recipeAbsoluteURL"
                :title="drink.name"
                :description="drink.description"
                :hashtags="drink.keywords.join()"
              >
                Share on Facebook
              </ShareNetwork>
            </b-dropdown-item>
            <b-dropdown-item>
              <ShareNetwork
                network="twitter"
                :url="recipeAbsoluteURL"
                :title="drink.name"
                :description="drink.description"
                :hashtags="drink.keywords.join()"
              >
                Share on Twitter
              </ShareNetwork>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <p>{{ drink.description }}</p>

    <p class="text-muted">
      Contributed by:
      <a :href="getGithubUrl(drink.github)">{{ drink.github }}</a>
    </p>

    <b-container>
      <b-row class="justify-content-between">
        <div class="recipe-ingredients">
          <h4>Ingredients</h4>
          <ul>
            <li v-for="(o, i) in drink.ingredients" v-bind:key="i">
              {{ o.quantity + ' ' + o.measure + ' ' + o.ingredient }}
            </li>
          </ul>
        </div>

        <div class="recipe-image" v-if="showImage">
          <b-img
            right
            class="mb-4"
            :src="drink.image ? require(`@/assets/recipes/${drink.image}`) : null"
            :alt="drink.name"
            rounded
            fluid-grow
          />
        </div>
      </b-row>

      <b-row>
        <div class="recipe-directions-list">
          <h4>Directions</h4>
          <ol class="mb-4">
            <li v-for="(o, i) in drink.directions" v-bind:key="i">{{ o }}</li>
          </ol>
        </div>

        <div class="mt-4" v-if="drink.source">
          <span>
            View full recipe at:
            <a :href="drink.source">{{ drink.source }}</a>
          </span>
        </div>
      </b-row>
    </b-container>

    <div class="similar-drinks mt-4 mb-4">
      <h4>Similar drinks</h4>
      <b-card-group deck>
        <RecipeTile
          v-for="similarRecipe in similarRecipes"
          v-bind:key="similarRecipe.id"
          v-bind:id="similarRecipe.id"
        />
      </b-card-group>
    </div>
  </div>
</template>

<script>
import RecipeTile from '@/components/RecipeTile.vue';
import recipes from '../recipes';
import FavoriteStar from './FavoriteStar.vue';

const NUMBER_OF_SIMILAR_RECIPES = 6;

export default {
  name: 'Recipe',
  props: {
    name: String,
    isPrint: Boolean,
  },
  components: {
    RecipeTile,
    FavoriteStar,
  },
  computed: {
    recipeAbsoluteURL() {
      return `https://opendrinks.io${window.location.pathname}`;
    },
  },
  watch: {
    name(newVal) {
      this.getRecipe(newVal);
      window.document.title = `Open Drinks - ${this.drink.name}`;

      this.getFavorites();
      this.getSimilarRecipes(newVal).then(data => {
        this.similarRecipes = data;
      });
    },
  },
  data() {
    return {
      json: {},
      drink: {},
      similarRecipes: [],
      badgeStyle: {
        'margin-right': '0.2vw',
      },
      isFavorited: false,
      favorites: [],
      showImage: true,
    };
  },
  created() {
    this.getRecipe(this.name);
    this.getFavorites();
    this.getSimilarRecipes(this.name).then(data => {
      this.similarRecipes = data;
    });
  },
  methods: {
    async getSimilarRecipes(name) {
      return (await recipes.getSimilarRecipe(name)).slice(0, NUMBER_OF_SIMILAR_RECIPES);
    },
    getFavorites() {
      this.favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
      this.isFavorited = this.favorites.indexOf(this.drink.name) !== -1;
    },
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
    print() {
      window.print();
    },
  },
};
</script>

<style scoped>
.recipe-ingredients {
  width: 37%;
  margin-right: 1em;
}
.recipe-image {
  width: 60%;
  margin-bottom: 2em;
}

.recipe-directions-list {
  width: 100%;
  float: left;
  margin-top: 1em;
}

@media (max-width: 768px) {
  .recipe-hero-container {
    display: grid;
  }

  .recipe-image {
    order: 1;
    width: 100%;
  }

  .recipe-ingredients {
    order: 2;
    width: 100%;
  }
}
</style>
