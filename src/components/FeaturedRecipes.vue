<template>
  <div class="featured-recipes">
    <div v-for="(feature, i) in featuredList" v-bind:key="i">
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.description }}</p>
      <b-card-group deck>
        <RecipeTile
          v-for="(item, j) in feature.items.slice(0, feature.size)"
          v-bind:key="j"
          v-bind:id="item"
        />
      </b-card-group>
      <b-button
        block
        variant="outline-primary"
        v-if="feature.items.length > featuredItemSize && feature.size < feature.items.length"
        v-on:click="loadMore(i)"
      >
        Load More</b-button
      >

      <hr v-if="featuredList.length !== i + 1" />
    </div>
  </div>
</template>

<script>
import recipes from '../recipes';
import RecipeTile from './RecipeTile.vue';

const FEATURED_ITEM_SIZE = 6;

export default {
  name: 'FeaturedRecipes',
  components: {
    RecipeTile,
  },
  data() {
    return {
      featuredList: [],
      featuredItemSize: FEATURED_ITEM_SIZE,
    };
  },
  created() {
    window.document.title = `Open Drinks - Featured`;
    this.featuredList = recipes.getFeaturedRecipes();
  },
  methods: {
    loadMore(i) {
      this.featuredList[i].size += FEATURED_ITEM_SIZE;
    },
  },
};
</script>
