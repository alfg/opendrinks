<template>
  <div class="favorites container">
    <b-button class="mb-3" v-if="drinks.length > 0" variant="outline-danger" @click="confirmModal">
      Remove All Favorites
    </b-button>

    <b-alert :show="drinks.length === 0">
      You don't have any favorite drinks
    </b-alert>
    <RecipeList @favoriteClick="favoriteClick" :title="`Open Drinks Favorites`" :items="drinks" />
  </div>
</template>

<script>
import RecipeList from '@/components/RecipeList.vue';
import recipes from '../recipes';

export default {
  components: {
    RecipeList,
  },
  data() {
    return {
      drinks: [],
    };
  },
  created() {
    const favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    this.drinks = recipes.getFavoritedRecipes(favorites);
  },
  methods: {
    confirmModal() {
      this.$bvModal
        .msgBoxConfirm('Are you sure you want to remove all favorites', {
          title: '',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
          okTitle: 'Delete',
        })
        .then(value => {
          if (value) {
            localStorage.removeItem('favorites');
            this.drinks = [];
          }
        });
    },
    favoriteClick(name) {
      const index = this.drinks.findIndex(drink => drink.name === name);
      if (index !== -1) {
        this.drinks.splice(index, 1);
      }
    },
  },
};
</script>
