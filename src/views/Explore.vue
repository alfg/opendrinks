<template>
  <div class="explore container">
    <div class="d-flex flex-row align-items-center mb-2">
      <span class="text-nowrap mr-2">Filter by keyword</span>
      <b-form-select v-model="selectedKeyword" :options="keywordFilter"></b-form-select>
    </div>
    <RecipeList title="Open Drinks - Explore" v-bind:items="filterResults" />
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList.vue';
import recipes from '../recipes';

const KEYWORD_COUNT_LIMIT = 5;
const ALL_RECIPES_KEYWORD = 'All recipes';

export default {
  name: 'explore',
  components: {
    RecipeList,
  },
  data() {
    const drinks = recipes.getRecipes();
    return {
      drinks,
      selectedKeyword: ALL_RECIPES_KEYWORD,
      keywordFilter: [],
    };
  },
  created() {
    const keywords = this.getKeywords();
    this.keywordFilter = keywords;
  },
  computed: {
    filterResults() {
      if (this.selectedKeyword === ALL_RECIPES_KEYWORD) return this.drinks;
      return this.drinks
        .filter(drink => drink.keywords && drink.keywords.includes(this.selectedKeyword));
    },
  },
  methods: {
    getKeywords() {
      const keywords = recipes.getAllKeywordsWithCount()
        .filter(keyword => keyword.count >= KEYWORD_COUNT_LIMIT)
        .sort((keywordA, keywordB) => keywordA.count < keywordB.count)
        .map(keyword => keyword.keyword);
      keywords.unshift(ALL_RECIPES_KEYWORD);
      return keywords;
    },
  },
};
</script>
