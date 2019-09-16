<template>
  <div class="search container">
    <h2 class="text-center">Find Your Drink</h2>
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
