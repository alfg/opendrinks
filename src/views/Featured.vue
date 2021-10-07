<template>
  <div class="featured container">
    <FeaturedRecipes />
  </div>
</template>

<script>
import FeaturedRecipes from '@/components/FeaturedRecipes.vue';

export default {
  name: 'home',
  components: {
    FeaturedRecipes,
  },
};
</script>
