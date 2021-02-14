<template>
  <div class="recipe container">
    <Adspace />
    <Recipe v-bind:name="$route.params.id" />
  </div>
</template>

<script>
import Recipe from '@/components/Recipe.vue';
import Adspace from '@/components/Adspace.vue';

export default {
  name: 'recipe',
  components: {
    Recipe,
    Adspace,
  },
};
</script>
