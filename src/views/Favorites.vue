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
  "ar": {
    "You don't have any favorite drinks": "ليس لديك أي مشروبات مفضلة",
    "Remove All Favorites": "إزالة كافة المفضّلات",
    "Are you sure you want to remove all favorites": "هل أنت متأكد أنك تريد إزالة كافة المفضّلات",
    "Delete": "حذف",
    "Cancel": "إلغاء"
  },
  "gl": {
    "You don't have any favorite drinks": "Non tes bebidas favoritas",
    "Remove All Favorites": "Eliminar todos os favoritos",
    "Are you sure you want to remove all favorites": "Estás seguro que queres eliminar todos os favoritos？",
    "Delete": "Eliminar",
    "Cancel": "Cancelar"
  },
  "de": {
    "You don't have any favorite drinks": "Sie haben noch keine Lieblingsgetränke",
    "Remove All Favorites": "Alle Favoriten löschen",
    "Are you sure you want to remove all favorites": "Sind Sie sicher, dass Sie alle Ihre Favoriten löschen wollen?",
    "Delete": "entfernen",
    "Cancel": "Abbrechen"
  },
  "nl": {
    "You don't have any favorite drinks": "Je hebt nog geen favoriete drankjes",
    "Remove All Favorites": "Alle favorieten verwijderen",
    "Are you sure you want to remove all favorites": "Weet je zeker dat je al je favorieten wilt verwijderen?",
    "Delete": "Verwijderen",
    "Cancel": "Annuleren"
  },
  "no": {
    "You don't have any favorite drinks": "Du har ingen favorittdrinker",
    "Remove All Favorites": "Fjern alle favoritter",
    "Are you sure you want to remove all favorites": "Er du sikker på at du vil fjerne alle favoritter?",
    "Delete": "Slett",
    "Cancel": "Avbryt"
  },
  "bn": {
    "You don't have any favorite drinks": "আপনার কোন প্রিয় পানীয় নেই",
    "Remove All Favorites": "সমস্ত প্রিয় সরান",
    "Are you sure you want to remove all favorites": "আপনি কি নিশ্চিত যে আপনি সমস্ত পছন্দ অপসারণ করতে চান",
    "Delete": "মুছুন",
    "Cancel": "বাতিল করুন"
  },
  "it": {
    "You don't have any favorite drinks": "Non hai nessun drink preferito",
    "Remove All Favorites": "Rimuovi tutti i preferiti",
    "Are you sure you want to remove all favorites": "Sei sicuro di voler rimuovere tutti i preferiti",
    "Delete": "Elimina",
    "Cancel": "Annulla"
  },
  "np": {
    "You don't have any favorite drinks": "तपाइँसँग कुनै मनपर्ने पेय छैन",
    "Remove All Favorites": "सबै मनपर्ने हटाउनुहोस्",
    "Are you sure you want to remove all favorites": "के तपाइँ पक्का हुनुहुन्छ कि तपाइँ सबै मनपर्ने हटाउन चाहानुहुन्छ?",
    "Delete": "हटाउनुहोस्",
    "Cancel": "रद्द गर्नुहोस्"
  },
  "pt": {
    "You don't have any favorite drinks": "Você não possui nenhum drink favorito",
    "Remove All Favorites": "Remover todos os favoritos",
    "Are you sure you want to remove all favorites": "Você tem certeza que quer remover todos os favoritos",
    "Delete": "Deletar",
    "Cancel": "Cancelar"
  },
  "ru": {
    "You don't have any favorite drinks": "У тебя нет любимых напитков",
    "Remove All Favorites": "Удалить все избранное",
    "Are you sure you want to remove all favorites": "Вы уверены, что хотите удалить все избранное",
    "Delete": "Удалить",
    "Cancel": "Отмена"
  },
  "uk": {
    "You don't have any favorite drinks": "У вас немає улюблених напоїв",
    "Remove All Favorites": "Видалити всі вибране",
    "Are you sure you want to remove all favorites": "Ви впевнені, що хочете видалити всі вибрані",
    "Delete": "Видалити",
    "Cancel": "Скасувати"
  },
  "zh": {
    "You don't have any favorite drinks": "您没有收藏的饮料",
    "Remove All Favorites": "删除所有收藏里的饮料",
    "Are you sure you want to remove all favorites": "您确定要删除所有收藏里的饮料么？",
    "Delete": "删除",
    "Cancel": "取消"
  },
  "vi": {
    "You don't have any favorite drinks": "Bạn chưa có đồ uống yêu thích",
    "Remove All Favorites": "Xóa tất cả các mục yêu thích",
    "Are you sure you want to remove all favorites": "Bạn có chắc là muốn xóa tất cả các mục yêu thích?",
    "Delete": "Xóa",
    "Cancel": "Hủy bỏ"
  },
  "th": {
    "You don't have any favorite drinks": "คุณไม่มีเครื่องดื่มที่ชอบ",
    "Remove All Favorites": "ลบของที่ชอบทั้งหมด",
    "Are you sure you want to remove all favorites": "คุณแน่ใจว่าจะลบของที่ชอบทั้งหมด?",
    "Delete": "ลบ",
    "Cancel": "ยกเลิก"
  }
}
</i18n>
