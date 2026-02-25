<template>
  <div class="home container">
    <div class="float-end">
      <b-button variant="primary" size="sm" @click="onNext">Next</b-button>
    </div>
    <Recipe v-bind:name="name" />
  </div>
</template>

<script>
import Recipe from '@/components/Recipe.vue';
import recipes from '../recipes';

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
      const randDrink = recipes.getRandom().replace('./', '').replace('.json', '');
      this.name = `${randDrink}.json`;
      this.$router.replace({
        path: `/recipe/${randDrink.replace('.json', '')}`,
      });
    },
    onNext() {
      this.getRandom();
    },
  },
};
</script>
