<template>
  <div class="container">
    <b-form-input v-model="filter" :placeholder="$t('Enter your keyword')"></b-form-input>

    <b-list-group class="mt-4">
      <b-list-group-item
        v-for="(keyword, index) in keywords.filter(row => {
          return row.includes(filter) || !filter;
        })"
        :key="index"
        :to="{ name: 'keyword', params: { keyword: urlEncode(keyword) } }"
      >{{ keyword }}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import recipes from '../recipes';

export default {
  name: 'KeywordList',
  data() {
    const keywords = recipes.getAllKeywords().sort();
    return {
      keywords,
      filter: null,
    };
  },
  mounted() {
    window.document.title = 'Open Drinks - Keywords';
  },
  methods: {
    urlEncode(item) {
      return window.encodeURI(item);
    },
  },
};
</script>

<i18n>
{
  "no": {
    "Enter your keyword": "Søk etter nøkkelord"
  },
  "bn": {
    "Enter your keyword": "আপনার কীওয়ার্ড লিখুন"
  },
  "ru": {
    "Enter your keyword": "Введите ключевое слово"
  },
  "uk": {
    "Enter your keyword": "Введіть ключове слово"
  },
  "hi": {
    "Enter your keyword": "अपना सूचक-शब्द दर्ज करें"
  },
  "es": {
    "Enter your keyword": "Introduce tu palabra clave"
  },
  "de": {
    "Enter your keyword": "Gib dein Stichwort ein"
  },
  "fr": {
    "Enter your keyword": "Entrez votre mot-clé"
  },
  "nl": {
    "Enter your keyword": "Voer uw trefwoord in"
  },
  "ja": {
    "Enter your keyword": "キーワードを入力してください"
  }
}
</i18n>
