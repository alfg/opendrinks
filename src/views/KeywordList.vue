<template>
  <div class="container">
    <b-list-group class="mt-4">
      <b-list-group-item
        v-for="(keyword, index) in keywords"
        :key="index"
        :to="{ name: 'keyword', params: { keyword: urlEncode(keyword) } }"
        >{{ keyword }}</b-list-group-item
      >
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
