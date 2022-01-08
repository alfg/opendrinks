<template>
  <div class="search container">
    <h2 class="text-center">{{ $t('search.findYourDrink') }}</h2>
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
