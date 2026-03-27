<template>
  <div class="d-flex align-items-center" v-bind:class="{ 'justify-content-end': isMobile }">
    <div class="show-image" v-if="isPrint">
      <b-form-checkbox
        class="me-3"
        name="show-image-checkbox"
        :value="false"
        :unchecked-value="true"
        @change="onShowImage"
      >
        {{ $t('recipeToolbar.hideImage') }}
      </b-form-checkbox>
    </div>

    <FavoriteStar
      class="me-3 fav-star"
      @favorite="favorited"
      :isFavorited="isFavorited"
      v-b-tooltip.hover="
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
      v-b-tooltip.hover="$t('recipeToolbar.shareOnFacebook')"
    >
      <i class="bi bi-facebook fs-4"></i>
    </ShareNetwork>
    <ShareNetwork
      network="twitter"
      :url="url"
      :title="drink.name"
      :description="drink.description"
      :hashtags="drink.keywords.join()"
      class="px-1 clickable-icon-hover"
      v-b-tooltip.hover="$t('recipeToolbar.shareOnTwitter')"
    >
      <i class="bi bi-twitter-x fs-4"></i>
    </ShareNetwork>
    <span
      v-b-tooltip.hover="$t('recipeToolbar.copyURL')"
      class="mx-1 theme-link-color cursor-pointer clickable-icon-hover"
      @click="copyUrl"
    >
      <i class="bi bi-files fs-4"></i>
    </span>
    <div
      v-b-tooltip.hover="$t('recipeToolbar.print')"
      class="mx-1 theme-link-color cursor-pointer clickable-icon-hover"
      v-if="!isMobile"
    >
      <i class="bi bi-printer fs-4" v-if="isPrint" @click="print()"></i>
      <a v-else :href="`/recipe/${name}/print`" target="_blank">
        <i class="bi bi-printer fs-4"></i>
      </a>
    </div>
    <transition name="fade">
      <div v-if="copyToast" class="copy-toast badge bg-success ms-2">
        {{ $t('recipeToolbar.urlCopiiedInClipboard') }}
      </div>
    </transition>
  </div>
</template>

<script>
import useIsMobile from '@/composables/useIsMobile';
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
  },
  setup() {
    const isMobile = useIsMobile();

    return {
      isMobile,
    };
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
      setTimeout(() => {
        this.copyToast = false;
      }, 1500);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.copy-toast {
  font-size: 0.8rem;
}
</style>
