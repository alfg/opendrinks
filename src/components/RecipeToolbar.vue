<template>
  <div class="d-flex align-items-center" v-bind:class="{ 'justify-content-end': isMobile }">
    <div class="show-image" v-if="isPrint">
      <b-form-checkbox
        class="mr-3"
        name="show-image-checkbox"
        :value="false"
        :unchecked-value="true"
        @change="onShowImage"
      >
        {{ $t('recipeToolbar.hideImage') }}
      </b-form-checkbox>
    </div>

    <FavoriteStar
      class="mr-3 fav-star"
      @favorite="favorited"
      :isFavorited="isFavorited"
      v-b-tooltip.hover.nonInteractive="
        !isFavorited ? $t('recipeToolbar.setFavorite') : $t('recipeToolbar.unsetFavorite')
      "
    ></FavoriteStar>
    <ShareNetwork
      network="facebook"
      :url="url"
      :title="drink.name"
      :description="drink.description"
      :hashtags="drink.keywords.join()"
      class="px-1 clickable-icon-hover"
      v-b-tooltip.hover.nonInteractive="$t('recipeToolbar.shareOnFacebook')"
    >
      <BIconFacebook font-scale="2"></BIconFacebook>
    </ShareNetwork>
    <ShareNetwork
      network="twitter"
      :url="url"
      :title="drink.name"
      :description="drink.description"
      :hashtags="drink.keywords.join()"
      class="px-1 clickable-icon-hover"
      v-b-tooltip.hover.nonInteractive="$t('recipeToolbar.shareOnTwitter')"
    >
      <BIconTwitter font-scale="2"></BIconTwitter>
    </ShareNetwork>
    <BIconFiles
      v-b-tooltip.hover.nonInteractive="$t('recipeToolbar.copyURL')"
      class="mx-1 theme-link-color cursor-pointerclickable-icon-hover"
      font-scale="2"
      @click="copyUrl"
    >
    </BIconFiles>
    <div
      v-b-tooltip.hover.nonInteractive="$t('recipeToolbar.print')"
      class="mx-1 theme-link-color cursor-pointer clickable-icon-hover"
      v-if="!isMobile"
    >
      <BIconPrinter :fontScale="2" v-if="isPrint" @click="print()"></BIconPrinter>
      <a v-else :href="`/recipe/${name}/print`" target="_blank">
        <BIconPrinter :fontScale="2"></BIconPrinter>
      </a>
    </div>
    <b-toast v-model="copyToast" :title="$t('recipeToolbar.urlCopied')" :auto-hide-delay="500">
      {{ $t('recipeToolbar.urlCopiiedInClipboard') }}
    </b-toast>
  </div>
</template>

<script>
import { BIconTwitter, BIconPrinter, BIconFiles, BIconFacebook } from 'bootstrap-vue';
import FavoriteStar from './FavoriteStar.vue';

export default {
  name: 'RecipeToolbar',
  props: {
    isPrint: Boolean,
    url: String,
    drink: Object,
    name: String,
  },
  components: {
    FavoriteStar,
    BIconTwitter,
    BIconPrinter,
    BIconFiles,
    BIconFacebook,
  },
  data() {
    return {
      favorites: [],
      showImage: true,
      copyToast: false,
    };
  },
  created() {
    this.getFavorites();
  },
  computed: {
    isFavorited() {
      return this.favorites.indexOf(this.drink.name) !== -1;
    },
  },
  methods: {
    getFavorites() {
      this.favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    },
    favorited() {
      const index = this.favorites.indexOf(this.drink.name);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(this.drink.name);
      }
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    print() {
      window.print();
    },
    onShowImage() {
      this.showImage = !this.showImage;
      this.$emit('show-image', this.showImage);
    },
    copyUrl() {
      // Credits to Fab for this interesting approach - https://stackoverflow.com/a/58734857
      const el = document.createElement('textarea');
      el.value = window.location.href;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
      el.select();
      document.execCommand('copy');
      this.copyToast = true;
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    },
  },
};
</script>

<style scoped>
.clickable-icon-hover {
  transition: transform 0.2s;
}

.clickable-icon-hover:hover {
  transform: scale(1.2);
}
</style>
