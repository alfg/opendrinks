<template>
  <div class="explore container">
    Filter by keyword
    <b-form-select v-model="selectedKeyword" :options="keywordFilter"></b-form-select>
    <RecipeList title="Open Drinks - Explore" :items="drinks"/>
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList.vue';
import recipes from '../recipes';

const KEYWORD_COUNT_LIMIT = 3;

export default {
  name: 'explore',
  components: {
    RecipeList,
  },
  data() {
    const drinks = recipes.getRecipes();
    return {
      drinks,
      selectedKeyword: null,
      keywordFilter: [],
    };
  },
  created() {
    const keywords = this.getKeywords();
    this.keywordFilter = keywords;
  },
  computed: {
    filterByKeyword() {
      return null;
    },
  },
  methods: {
    getKeywords() {
      const keywords = recipes.getAllKeywordsWithCount()
        .filter(keyword => keyword.count >= KEYWORD_COUNT_LIMIT)
        .sort((keywordA, keywordB) => keywordA.count < keywordB.count)
        .map(keyword => keyword.keyword);
      return keywords;
    },
  },
};
</script>
