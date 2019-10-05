<template>
    <div class="recipeTile col-3">
        {{ drink }}
    </div>
</template>

<script>
import recipes from '../recipes';

export default {
  name: 'recipeTile',
  props: {
    id: String,
  },
  data() {
    return {
      drink: {},
    };
  },
  created() {
    const drink = recipes.getRecipe(this.id);
    this.drink = drink;
    console.log(drink);
  },
};
</script>
