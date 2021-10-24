<template>
  <div class="search container">
    <h2 class="text-center">{{ $t('Find Your Drink') }}</h2>
    <RecipeFind />
  </div>
</template>

<script>
import RecipeFind from '@/components/RecipeFind.vue';

export default {
  name: 'search',
  components: {
    RecipeFind,
  },
};
</script>

<i18n>
{
  "ja": {
    "Find Your Drink": "あなたのドリンクを見つけよう"
  },
  "fr": {
    "Find Your Drink": "Rechercher votre cocktail"
  },
  "es": {
    "Find Your Drink": "Encuentra Tu Bebida"
  },
  "hi": {
    "Find Your Drink": "अपना पेय खोजें"
  },
  "ar": {
    "Find Your Drink": "ابحث عن مشروبك"
  },
  "gl": {
    "Find Your Drink": "Atopa a túa bebida"
  },
  "de": {
    "Find Your Drink": "Finden Sie Ihr Getränk"
  },
  "nl": {
    "Find Your Drink": "Vind jouw drankje"
  },
  "no": {
    "Find Your Drink": "Finn din drink"
  },
  "bn": {
    "Find Your Drink": "আপনার পানীয় খুঁজুন"
  },
  "it": {
    "Find Your Drink": "Trova il tuo drink"
  },
  "np": {
    "Find Your Drink": "तपाइँको पेय खोज्नुहोस्"
  },
  "pt": {
    "Find Your Drink": "Encontre sua bebida"
  },
  "ru": {
    "Find Your Drink": "Найдите свой напиток"
  },
  "uk": {
    "Find Your Drink": "Знайдіть свій напій"
  },
  "zh": {
    "Find Your Drink": "找想要的饮料"
  },
  "vi": {
    "Find Your Drink": "Tìm đồ uống của bạn"
  },
  "th": {
    "Find Your Drink": "หาเครื่องดื่มของคุณ"
  }
}
</i18n>
