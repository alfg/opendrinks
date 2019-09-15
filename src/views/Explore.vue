<template>
  <div class="explore container">
    <h2 class="text-center">Explore Drinks</h2>
    <RecipeList />
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList.vue';

export default {
  name: 'explore',
  components: {
    RecipeList,
  },
};
</script>
