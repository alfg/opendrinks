<template>
  <div class="recipe container">
    <Recipe v-bind:name="$route.params.id" isPrint />
  </div>
</template>

<script>
import Recipe from '@/components/Recipe.vue';

export default {
  name: 'recipe',
  components: {
    Recipe,
  },
};
</script>

<style>
@media print {
  .show-image,
  .header-items,
  .print-button,
  .share-button,
  .fav-star {
    display: none;
  }
}

.container.mb-4.mb-4,
footer.container,
.similar-drinks {
  display: none;
}
</style>
