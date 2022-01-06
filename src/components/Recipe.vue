<template>
  <article id="recipe">
    <b-container v-if="!drink.name" class="main d-flex align-items-center justify-content-center">
      <div class="row">
        <div class="col-md-12 text-center">
          <span class="display-1 d-block">404</span>
          <div class="mb-4 lead">{{ $t('The recipe you are looking for was not found.') }}</div>
          <b-link to="/">{{ $t('Back to Home') }}</b-link>
        </div>
      </div>
    </b-container>

    <div v-else>
      <header class="d-flex justify-content-between align-items-start">
        <div>
          <h1>{{ drink.name }}</h1>
          <ul v-if="drink.keywords" class="mb-2 list-reset d-flex">
            <li v-for="(o, i) in drink.keywords" v-bind:key="i">
              <b-badge
                variant="secondary"
                :style="badgeStyle"
                :to="{ name: 'keyword', params: { keyword: urlEncode(o) } }"
                >{{ o }}</b-badge
              >
            </li>
          </ul>
        </div>
        <RecipeToolbar
          v-if="!isMobile"
          :url="recipeAbsoluteURL"
          :drink="drink"
          :name="name"
          :isPrint="isPrint"
          v-on:show-image="onShowImage"
        />
      </header>

      <p>{{ drink.description }}</p>

      <address class="text-muted">
        {{ $t('recipe.contributedBy') }}:
        <a :href="getGithubUrl(drink.github)">{{ drink.github }}</a>
      </address>

      <RecipeToolbar
        v-if="isMobile"
        :url="recipeAbsoluteURL"
        :drink="drink"
        :name="name"
        :isPrint="isPrint"
        v-on:show-image="onShowImage"
      />

      <b-container tag="article">
        <b-row class="justify-content-between" tag="section">
          <div class="recipe-ingredients">
            <h2 class="h4">{{ $t('recipe.ingredients') }}</h2>
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

        <b-row tag="section">
          <div class="recipe-directions-list">
            <h3 class="h4">{{ $t('recipe.directions') }}</h3>
            <ol class="mb-4">
              <li v-for="(o, i) in drink.directions" v-bind:key="i">{{ o }}</li>
            </ol>
          </div>

          <div class="mt-4" v-if="drink.source">
            <span>
              {{ $t('recipe.fullRecipe') }}:
              <a :href="drink.source">{{ drink.source }}</a>
            </span>
          </div>
        </b-row>
      </b-container>

      <section class="similar-drinks mt-4 mb-4">
        <h4>{{ $t('recipe.similarDrinks') }}</h4>
        <b-card-group deck>
          <RecipeTile
            v-for="similarRecipe in similarRecipes"
            v-bind:key="similarRecipe.id"
            v-bind:id="similarRecipe.id"
          />
        </b-card-group>
      </section>
    </div>
  </article>
</template>

<script>
import RecipeTile from '@/components/RecipeTile.vue';
import recipes from '../recipes';
import RecipeToolbar from '@/components/RecipeToolbar.vue';

const NUMBER_OF_SIMILAR_RECIPES = 3;

export default {
  name: 'Recipe',
  props: {
    name: String,
    isPrint: Boolean,
  },
  components: {
    RecipeTile,
    RecipeToolbar,
  },
  computed: {
    recipeAbsoluteURL() {
      return `https://opendrinks.io${window.location.pathname}`;
    },
  },
  watch: {
    name(newVal) {
      this.getRecipe(newVal);
      this.getSimilarRecipes(newVal).then(data => {
        this.similarRecipes = data;
        window.scrollTo(0, 0);
      });
    },
  },
  metaInfo() {
    return {
      title: 'Open Drinks',
      titleTemplate: `%s - ${this.drink.name}`,
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content: this.drink.description,
          vmid: 'description',
        },
        {
          property: 'og:title',
          content: 'Open Drinks',
          template: chunk => `${chunk} - ${this.drink.name}`,
          vmid: 'og:title',
        },
        {
          property: 'og:type',
          content: 'article',
          vmid: 'og:type',
        },
        {
          property: 'og:site_name',
          content: 'Open Drinks',
          vmid: 'og:site_name',
        },
        {
          property: 'og:url',
          content: `https://opendrinks.io${window.location.pathname}`,
          vmid: 'og:url',
        },
        {
          property: 'og:description',
          content: this.drink.description,
          vmid: 'og:description',
        },
        {
          property: 'og:image',
          content: `https://opendrinks.io${this.drink.img}`,
          vmid: 'og:image',
        },
        {
          property: 'og:image:alt',
          content: this.drink.name,
          vmid: 'og:image:alt',
        },
        {
          itemprop: 'name',
          content: 'Open Drinks',
          template: chunk => `${chunk} - ${this.drink.name}`,
        },
        {
          itemprop: 'description',
          content: this.drink.description,
        },
        {
          itemprop: 'image',
          content: `https://opendrinks.io${this.drink.img}`,
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org/',
            '@type': 'Recipe',
            name: this.drink.name,
            url: `https://opendrinks.io${window.location.pathname}`,
            description: this.drink.description,
            image: `https://opendrinks.io${this.drink.img}`,
          },
        },
      ],
    };
  },
  data() {
    return {
      drink: {},
      similarRecipes: [],
      badgeStyle: {
        'margin-right': '0.2vw',
        'margin-left': '0.2vw',
      },
      showImage: true,
    };
  },
  created() {
    this.getRecipe(this.name);
    window.document.title = `Open Drinks - ${this.drink.name}`;
    this.getSimilarRecipes(this.name).then(data => {
      this.similarRecipes = data;
    });
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    async getSimilarRecipes(name) {
      return (await recipes.getSimilarRecipe(name)).slice(0, NUMBER_OF_SIMILAR_RECIPES);
    },
    getRecipe(name) {
      const drink = recipes.getRecipe(name) || {};
      this.drink = drink;
    },
    getGithubUrl(name) {
      return `https://github.com/${name}`;
    },
    urlEncode(item) {
      return window.encodeURI(item);
    },
    onShowImage(data) {
      this.showImage = data;
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

.list-reset,
.list-reset li {
  list-style: none;
  padding: 0;
  margin: 0;
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
