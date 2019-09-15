<template>
  <div class="explore container">
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
