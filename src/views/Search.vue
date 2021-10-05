<template>
  <div class="search container">
    <h2 class="text-center">{{ $t('Find Your Drink') }}</h2>
    <RecipeFind />
  </div>
</template>

<script>
import RecipeFind from '@/components/RecipeFind.vue';

export default {
  name: 'search',
  components: {
    RecipeFind,
  },
};
</script>

<i18n>
{
  "ja": {
    "Find Your Drink": "あなたのドリンクを見つけよう"
  },
  "es": {
    "Find Your Drink": "Encuentra Tu Bebida"
  }
}
</i18n>
