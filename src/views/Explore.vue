<template>
  <div class="explore container">
    <div v-if="showFilter">
      <div class="row">
        <div class="col-12">
          <h4>Filters</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-6 d-flex flex-row align-items-center mb-2">
          <span class="text-nowrap mr-2">Add Keyword</span>
          <b-form-select
            v-model="selectedKeyword"
            @change="addNewKeywordToFilter($event)"
            :options="keywordFilter"
          ></b-form-select>
        </div>
        <div v-if="filteredKeywords" class="col-6 d-flex flex-row align-items-center mb-2">
          <p class="mb-0">
            <b-badge
              v-for="(o, i) in filteredKeywords"
              v-bind:key="i"
              variant="secondary"
              class="mr-2 filter-item"
              @click="removeKeywordFromFilter(i)"
            >
              {{ o }}
            </b-badge>
          </p>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-end mb-2">
      <b-button
        variant="outline-warning"
        @click="resetFilters()"
        class="mr-2"
        size="sm"
        v-if="showFilter"
      >
        Reset Filters
      </b-button>
      <b-button variant="outline-secondary" :pressed.sync="showFilter" size="sm">Filters</b-button>
    </div>
    <RecipeList title="Open Drinks - Explore" v-bind:items="filterResults" />
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList.vue';
import recipes from '../recipes';

const KEYWORD_COUNT_LIMIT = 5;

export default {
  name: 'explore',
  components: {
    RecipeList,
  },
  data() {
    const drinks = recipes.getRecipes();
    return {
      drinks,
      showFilter: false,
      filteredKeywords: [],
      selectedKeyword: '',
      keywordFilter: [],
    };
  },
  created() {
    const keywords = this.getKeywords();
    this.keywordFilter = keywords;
  },
  computed: {
    filterResults() {
      if (this.filteredKeywords.length === 0) return this.drinks;
      return this.drinks.filter(
        drink =>
          drink.keywords &&
          this.filteredKeywords.every(keyword => drink.keywords.includes(keyword)),
      );
    },
  },
  methods: {
    getKeywords() {
      const keywords = recipes
        .getAllKeywordsWithCount()
        .filter(keyword => keyword.count >= KEYWORD_COUNT_LIMIT)
        .sort((keywordA, keywordB) => keywordA.count < keywordB.count)
        .map(keyword => keyword.keyword);
      return keywords;
    },
    addNewKeywordToFilter(newKeyword) {
      if (!this.filteredKeywords.includes(newKeyword)) {
        this.filteredKeywords.push(newKeyword);
      }
      this.selectedKeyword = null;
    },
    removeKeywordFromFilter(keywordIndex) {
      this.filteredKeywords.splice(keywordIndex, 1);
    },
    resetFilters() {
      this.filteredKeywords = [];
    },
  },
};
</script>

<style scoped>
.filter-item {
  cursor: pointer;
}

.filter-item:hover {
  background-color: #363a3e;
}

.filter-item:hover::after {
  content: '×';
}
</style>
