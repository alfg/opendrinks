<template>
  <div class="home container">
    <Recipe v-bind:name="name" />
  </div>
</template>

<script>
import recipes from '../recipes';
import Recipe from '@/components/Recipe.vue';

export default {
  name: 'home',
  components: {
    Recipe,
  },
  data() {
    return {
      name: null,
    };
  },
  created() {
    this.getRandom();
  },
  methods: {
    getRandom() {
      const randDrink = recipes.getRandom();
      this.name = randDrink;
    },
  },
};
</script>
