<template>
  <div class="featured-recipes">
    <div class="button-wrapper">
      <template v-for="(feature, i) in featuredList" style="display: flex;">
        <b-button
          v-on:click="showSubset(feature.title)"
          variant="outline-primary"
          v-bind:key="`btn-${i}`"
          class="mr-2 mb-2"
          >{{ feature.title }}</b-button
        >
      </template>
      <b-button v-on:click="showSubset('All')" variant="outline-primary" class="mb-2">All</b-button>
    </div>
    <div v-for="(feature, i) in filteredList" v-bind:key="i">
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
      filteredList: [],
      featuredItemSize: FEATURED_ITEM_SIZE,
    };
  },
  created() {
    window.document.title = `Open Drinks - Featured`;
    this.featuredList = recipes.getFeaturedRecipes();
    this.filteredList = this.featuredList;
  },
  methods: {
    loadMore(i) {
      this.featuredList[i].size += FEATURED_ITEM_SIZE;
    },
    showSubset(title) {
      if (title === 'All') {
        this.filteredList = this.featuredList;
      } else {
        this.filteredList = this.featuredList.filter(item => item.title === title);
      }
    },
  },
};
</script>
