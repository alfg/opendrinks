<template>
  <div class="featured container">
    <FeaturedRecipes />
    <FabButton />
  </div>
</template>

<script>
import FeaturedRecipes from '@/components/FeaturedRecipes.vue';
import FabButton from '@/components/FabButton.vue';

export default {
  name: 'home',
  components: {
    FeaturedRecipes,
    FabButton,
  },
};
</script>
