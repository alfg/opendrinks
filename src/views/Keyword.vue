<template>
  <div class="explore container">
    <RecipeList :title="`Open Drinks - ${keyword}`" :items="drinks" />
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList.vue';
import recipes from '../recipes';

export default {
  name: 'explore',
  components: {
    RecipeList,
  },
  data() {
    const keyword = decodeURI(this.$route.params.keyword);
    const drinks = recipes.getRecipesByKeywords(keyword);
    return {
      drinks,
      keyword,
    };
  },
  mounted() {
    window.document.title = `Open Drinks - ${decodeURI(this.$route.params.keyword)}`;
  },
};
</script>
