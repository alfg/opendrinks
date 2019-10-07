<template>
  <div class="recipeTile">
    <b-img :src="drink.image ? require(`@/recipes/img/${drink.image}`) : null" :alt="drink.name" />
    <div class="text">
      <a :href="'/recipe/' + drink.filename" class="d-flex align-items-center flex-column">
        <b>{{drink.name}}</b>
        <div v-if="keywords">
          <b-badge
            v-for="(o, i) in keywords"
            v-bind:key="i"
            variant="primary"
            class="mr-1"
          >
            {{ o }}
          </b-badge>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import recipes from '../recipes';

const MAX_KEYWORDS = 3;

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
  computed: {
    keywords() {
      let { keywords } = this.drink;
      if (keywords.length > MAX_KEYWORDS) {
        keywords = keywords.slice(0, 3);
        keywords.push('...');
      }
      return keywords;
    },
  },
  created() {
    const drink = recipes.getRecipe(this.id);
    this.drink = drink;
  },
};
</script>

<style scoped>
.recipeTile {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.recipeTile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2);
  transition: filter 0.4s;
}

.recipeTile .text {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  top: 0;
  left: 0;
  transition: background-color 0.2s, opacity 0.2s, visibility 2s;
}

.recipeTile .text a {
  color: #000;
  text-decoration: none;
  padding: 10px;
  padding-top: 15%;
  text-align: center;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.recipeTile .text a b {
  width: 100%;
}

.recipeTile .text a:hover,
.recipeTile .text a:focus,
.recipeTile .text a:active {
  text-decoration: none;
  color: #000;
}

.recipeTile:hover .text {
  opacity: 1;
  visibility: visible;
  background-color: rgba(255, 255, 255, 0.5);
}

.recipeTile:hover img {
  filter: blur(5px);
}
</style>
