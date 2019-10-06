<template>
  <div class="explore container">
    <RecipeList title="Open Drinks - Explore" :items="drinks"/>
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
    const drinks = recipes.getRecipes();
    return {
      drinks,
    };
  },
};
</script>
