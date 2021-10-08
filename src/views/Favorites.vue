<template>
  <div class="favorites container">
    <b-button class="mb-3" v-if="drinks.length > 0" variant="outline-danger" @click="confirmModal">
      {{ $t('Remove All Favorites') }}
    </b-button>

    <b-alert :show="drinks.length === 0">
      {{ $t("You don't have any favorite drinks") }}
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
        .msgBoxConfirm(this.$t('Are you sure you want to remove all favorites'), {
          title: '',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
          okTitle: this.$t('Delete'),
          cancelTitle: this.$t('Cancel'),
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

<i18n>
{
  "ja": {
    "You don't have any favorite drinks": "お気に入りのドリンクがありません",
    "Remove All Favorites": "お気に入りをすべて削除する",
    "Are you sure you want to remove all favorites": "お気に入りをすべて削除してもよろしいですか？",
    "Delete": "削除",
    "Cancel": "キャンセル"
  },
  "fr": {
    "You don't have any favorite drinks": "Vous n'avez pas de cocktails favoris",
    "Remove All Favorites": "Supprimer tous les cocktails favoris",
    "Are you sure you want to remove all favorites": "Etes-vous sûr de vouloir supprimer tous les favoris",
    "Delete": "Supprimer",
    "Cancel": "Annuler"
  },
  "es": {
    "You don't have any favorite drinks": "No tienes bebidas favoritas",
    "Remove All Favorites": "Eliminar Todos Los Favoritos",
    "Are you sure you want to remove all favorites": "Estás seguro que quieres eliminar todos los favoritos？",
    "Delete": "Eliminar",
    "Cancel": "Cancelar"
  },
  "hi": {
    "You don't have any favorite drinks": "आपका कोई पसंदीदा पेय नहीं है",
    "Remove All Favorites": "सभी पसंदीदा हटाएं",
    "Are you sure you want to remove all favorites": "क्या आप वाकई सभी पसंदीदा हटाना चाहते हैं",
    "Delete": "हटाइये",
    "Cancel": "रद्द करें"
  },
  "nl": {
    "You don't have any favorite drinks": "Je hebt nog geen favoriete drankjes",
    "Remove All Favorites": "Alle favorieten verwijderen",
    "Are you sure you want to remove all favorites": "Weet je zeker dat je al je favorieten wilt verwijderen?",
    "Delete": "Verwijderen",
    "Cancel": "Annuleren"
  }
}
</i18n>
