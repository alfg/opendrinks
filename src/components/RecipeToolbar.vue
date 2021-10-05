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
        {{ $t('Hide Image') }}
      </b-form-checkbox>
    </div>

    <FavoriteStar
      class="mr-3 fav-star"
      @favorite="favorited"
      :isFavorited="isFavorited"
    ></FavoriteStar>

    <div class="print-button" v-if="!isMobile">
      <b-button v-if="isPrint" variant="outline-primary" @click="print()">
        {{ $t('Print') }}
      </b-button>
      <b-button v-else variant="outline-primary" :to="`/recipe/${name}/print`" target="_blank">
        {{ $t('Print') }}
      </b-button>
    </div>

    <div class="share-button">
      <b-dropdown :text="$t('Share')" variant="outline-primary" right class="m-2">
        <b-dropdown-item>
          <ShareNetwork
            network="facebook"
            :url="url"
            :title="drink.name"
            :description="drink.description"
            :hashtags="drink.keywords.join()"
          >
            {{ $t('Share on Facebook') }}
          </ShareNetwork>
        </b-dropdown-item>
        <b-dropdown-item>
          <ShareNetwork
            network="twitter"
            :url="url"
            :title="drink.name"
            :description="drink.description"
            :hashtags="drink.keywords.join()"
          >
            {{ $t('Share on Twitter') }}
          </ShareNetwork>
        </b-dropdown-item>
        <b-dropdown-item @click.prevent="copyUrl">
          <a href="#">{{ $t('Copy URL') }}</a>
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      favorites: [],
      showImage: true,
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
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    },
  },
};
</script>

<i18n>
{
  "ja": {
    "Print": "印刷",
    "Share": "共有",
    "Share on Facebook": "Facebook",
    "Share on Twitter": "Twitter",
    "Copy URL": "URLをコピー",
    "Hide Image": "画像を非表示"
  },
  "es": {
    "Print": "Imprimir",
    "Share": "Compartir",
    "Share on Facebook": "Compartir en Facebook",
    "Share on Twitter": "Compartir en Twitter",
    "Copy URL": "Copiar URL",
    "Hide Image": "Ocultar imagen"
  }
}
</i18n>
