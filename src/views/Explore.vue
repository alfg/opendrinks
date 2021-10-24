<template>
  <div class="explore container">
    <div v-if="showFilter">
      <div class="row">
        <div class="col-12">
          <h4>{{ $t('Filters') }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-6 d-flex flex-row align-items-center mb-2">
          <span class="text-nowrap mr-2">{{ $t('Add Keyword') }}</span>
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
        v-t="'Reset Filters'"
      />
      <b-button variant="outline-secondary" :pressed.sync="showFilter" size="sm" v-t="'Filters'" />
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

<i18n>
{
  "ja": {
    "Filters": "フィルター",
    "Reset Filters": "条件をクリア",
    "Add Keyword": "キーワードを追加"
  },
  "fr": {
    "Filters": "Filtres",
    "Reset Filters": "Enlever les filtres",
    "Add Keyword": "Ajouter un mot-clés"
  },
  "es": {
    "Filters": "Filtros",
    "Reset Filters": "Reiniciar Filtros",
    "Add Keyword": "Agregar Palabra Clave"
  },
  "hi": {
    "Filters": "छन्नी",
    "Reset Filters": "छन्नी रीसेट करें",
    "Add Keyword": "सूचक-शब्द जोड़ें"
  },
  "ar": {
    "Filters": "المرشحات",
    "Reset Filters": "إعادة ضبط المرشحات",
    "Add Keyword": "إضافة الكلمات المفاتيح"
  },
  "gl": {
    "Filters": "Filtros",
    "Reset Filters": "Reiniciar filtros",
    "Add Keyword": "Agregar palabra chave"
  },
  "de": {
    "Filters": "Filter",
    "Reset Filters": "Filter zurücksetzen",
    "Add Keyword": "Stichwort hinzufügen"
  },
  "nl": {
    "Filters": "Filters",
    "Reset Filters": "Filters resetten",
    "Add Keyword": "Trefwoord toevoegen"
  },
  "no": {
    "Filters": "Filter",
    "Reset Filters": "Nullstill filter",
    "Add Keyword": "Legg til nøkkelord"
  },
  "bn": {
    "Filters": "ফিল্টার",
    "Reset Filters": "ফিল্টার রিসেট করুন",
    "Add Keyword": "কীওয়ার্ড যোগ করুন"
  },
  "it": {
    "Filters": "Filtri",
    "Reset Filters": "Cancella filtri",
    "Add Keyword": "Aggiungi parola chiave"
  },
  "ru": {
    "Filters": "Фильтры",
    "Reset Filters": "Сбросить фильтры",
    "Add Keyword": "Добавить ключевое слово"
  },
  "uk": {
    "Filters": "Фільтри",
    "Reset Filters": "Скинути фільтри",
    "Add Keyword": "Додати ключове слово"
  },
  "np": {
    "Filters": "फिल्टर",
    "Reset Filters": "फिल्टर रिसेट गर्नुहोस्",
    "Add Keyword": "मुख्य-शब्द जोड्नुहोस्"
  },
  "pt": {
    "Filters": "Filtros",
    "Reset Filters": "Restaurar Filtros",
    "Add Keyword": "Adicionar palavra-chave"
  },
  "zh": {
    "Filters": "筛选",
    "Reset Filters": "重置筛选",
    "Add Keyword": "添加关键字"
  },
  "vi": {
    "Filters": "Lọc",
    "Reset Filters": "Đặt lại bộ lọc",
    "Add Keyword": "Thêm từ khóa"
  },
  "zh": {
    "Filters": "คัดกรอง",
    "Reset Filters": "ลบตัวคัดกรอง",
    "Add Keyword": "ใส่คีย์เวิร์ด"
  }
}
</i18n>
