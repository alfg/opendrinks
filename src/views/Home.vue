<template>
  <div class="home container">
    <div class="float-right">
      <b-button variant="primary" size="sm" @click="onNext">Next</b-button>
    </div>
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
      this.$router.replace({
        path: `recipe/${randDrink.replace('.json', '')}`,
      });
    },
    onNext() {
      this.getRandom();
    },
  },
};
</script>
