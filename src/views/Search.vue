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
  "ru": {
    "Find Your Drink": "Найдите свой напиток"
  },
  "uk": {
    "Find Your Drink": "Знайдіть свій напій"
  }
}
</i18n>
