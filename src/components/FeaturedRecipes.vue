<template>
  <div class="featured-recipes">
    <div v-for="(feature, i) in featuredList" v-bind:key="i">
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.description }}</p>
      <b-card-group deck>
        <RecipeTile v-for="(item, j) in feature.items" v-bind:key="j" v-bind:id="item" />
      </b-card-group>
      <hr v-if="featuredList.length !== i + 1" />
    </div>
  </div>
</template>

<script>
import recipes from '../recipes';
import RecipeTile from './RecipeTile.vue';

export default {
  name: 'FeaturedRecipes',
  components: {
    RecipeTile,
  },
  data() {
    return {
      featuredList: [],
    };
  },
  created() {
    window.document.title = `Open Drinks - Featured`;
    this.featuredList = recipes.getFeaturedRecipes();
  },
};
</script>
