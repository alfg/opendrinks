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
        {{ $t('Contributed by') }}:
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
            <h2 class="h4">{{ $t('Ingredients') }}</h2>
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
            <h3 class="h4">{{ $t('Directions') }}</h3>
            <ol class="mb-4">
              <li v-for="(o, i) in drink.directions" v-bind:key="i">{{ o }}</li>
            </ol>
          </div>

          <div class="mt-4" v-if="drink.source">
            <span>
              {{ $t('View full recipe at') }}:
              <a :href="drink.source">{{ drink.source }}</a>
            </span>
          </div>
        </b-row>
      </b-container>

      <section class="similar-drinks mt-4 mb-4">
        <h4>{{ $t('Similar drinks') }}</h4>
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

const NUMBER_OF_SIMILAR_RECIPES = 6;

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

<i18n>
{
  "ja": {
    "Contributed by": "提供",
    "Ingredients": "材料",
    "Directions": "手順",
    "View full recipe at": "完全なレシピを見る",
    "Similar drinks": "似ているドリンク"
  },
    "fr": {
    "Contributed by": "Partagé par",
    "Ingredients": "Ingrédients",
    "Directions": "Préparation",
    "View full recipe at": "Voir la recette complète:",
    "Similar drinks": "Cocktails similaires"
  },
  "es": {
    "Contributed by": "Aportado por",
    "Ingredients": "Ingredientes",
    "Directions": "Instrucciones",
    "View full recipe at": "Mira la receta completa en",
    "Similar drinks": "Bebidas similares"
  },
  "hi": {
    "Contributed by": "योगदानी",
    "Ingredients": "सामग्री",
    "Directions": "तैयारी",
    "View full recipe at": "पूरी विधि यहाँ देखें",
    "Similar drinks": "समान पेय"
  },
  "ar": {
    "Contributed by": "تمّت المساهمة بواسطة",
    "Ingredients": "المكوّنات",
    "Directions": "كيفيّة التّحضير",
    "View full recipe at": "عرض الوصفة كاملة على",
    "Similar drinks": "مشروبات مماثلة"
  },
  "gl": {
    "Contributed by": "Achegado por",
    "Ingredients": "Ingredientes",
    "Directions": "Instrucións",
    "View full recipe at": "Mira a receita completa en",
    "Similar drinks": "Bebidas similares"
  },
  "de": {
    "Contributed by": "Beitrag von",
    "Ingredients": "Zutaten",
    "Directions": "Rezeptschritte",
    "View full recipe at": "Das vollständige Rezept finden Sie auf",
    "Similar drinks": "Ähnliche Getränke"
  },
  "nl": {
    "Contributed by": "Bijdrage door",
    "Ingredients": "Ingrediënten",
    "Directions": "Bereidingswijze",
    "View full recipe at": "Bekijk het volledige recept op",
    "Similar drinks": "Vergelijkbare drankjes"
  },
  "no": {
    "Contributed by": "Bidrag fra",
    "Ingredients": "Ingredienser",
    "Directions": "Fremgangsmåte",
    "View full recipe at": "Se hele oppskriften på",
    "Similar drinks": "Lignende drinker"
  },
  "ru": {
    "Contributed by": "Автор",
    "Ingredients": "Ингредиенты",
    "Directions": "Способы приготовления",
    "View full recipe at": "Посмотреть полный рецепт на",
    "Similar drinks": "Подобные напитки"
  },
  "uk": {
    "Contributed by": "Автор",
    "Ingredients": "Інгредієнти",
    "Directions": "Способи приготування",
    "View full recipe at": "Подивитися повний рецепт на",
    "Similar drinks": "Подібні напої"
  },
  "bn": {
    "Contributed by": "অবদান করেছেন",
    "Ingredients": "উপকরণ সমূহ",
    "Directions": "প্রস্তুত প্রণালি",
    "View full recipe at": "সম্পূর্ণ রেসিপি দেখুন",
    "Similar drinks": "অনুরূপ পানীয়গুলো"
  },
  "it": {
    "Contributed by": "Contribuito da",
    "Ingredients": "Ingredienti",
    "Directions": "Istruzioni",
    "View full recipe at": "Vedi la ricetta completa su",
    "Similar drinks": "Drink simili"
  },
  "np": {
    "Contributed by": "योगदानी",
    "Ingredients": "सामग्री",
    "Directions": "तयारी",
    "View full recipe at": "पुरा नुस्खा यहाँ हेर्नुहोस्",
    "Similar drinks": "उस्तै पेय"
  },
  "pt": {
    "Contributed by": "Contribuição por",
    "Ingredients": "Ingredientes",
    "Directions": "Modo de preparo",
    "View full recipe at": "Visualizar receita completa em",
    "Similar drinks": "Bebidas semelhantes"
  },
  "zh": {
    "Contributed by": "贡献者",
    "Ingredients": "用料",
    "Directions": "步骤",
    "View full recipe at": "查看完整配方",
    "Similar drinks": "类似的饮料"
  },
  "vi": {
    "Contributed by": "Đóng góp bởi",
    "Ingredients": "Nguyên liệu",
    "Directions": "Cách làm",
    "View full recipe at": "Xem toàn bộ công thức tại",
    "Similar drinks": "Đồ uống tương tự"
  },
  "th": {
    "Contributed by": "ร่วมสนับสนุนโดย",
    "Ingredients": "ส่วนประกอบ",
    "Directions": "ขั้นตอน",
    "View full recipe at": "ดูสูตรทั้งหมด",
    "Similar drinks": "เครื่องดื่มที่คล้ายกัน"
  }
}
</i18n>
