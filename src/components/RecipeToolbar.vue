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

    <div class="mx-1 print-button" v-if="!isMobile">
      <b-button v-if="isPrint" variant="outline-primary" @click="print()">
        {{ $t('Print') }}
      </b-button>
      <b-button v-else variant="outline-primary" :to="`/recipe/${name}/print`" target="_blank">
        {{ $t('Print') }}
      </b-button>
    </div>
    <ShareNetwork
      network="facebook"
      :url="url"
      :title="drink.name"
      :description="drink.description"
      :hashtags="drink.keywords.join()"
      class="px-1 clickable-icon-hover"
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
    >
      <BIconTwitter font-scale="2"></BIconTwitter>
    </ShareNetwork>

    <BIconFiles
      class="mx-1 theme-link-color cursor-pointer clickable-icon-hover"
      font-scale="2"
      @click="copyUrl"
    >
    </BIconFiles>

    <b-toast v-model="copyToast" :title="$t('Link Copied')" :auto-hide-delay="500">
      {{ $t('The link to this page is copied in your clipboard') }}
    </b-toast>
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
  "fr": {
    "Print": "Imprimer",
    "Share": "Partager",
    "Share on Facebook": "Partager sur Facebook",
    "Share on Twitter": "Partager sur Twitter",
    "Copy URL": "copier l'url",
    "Hide Image": "cacher l'image"
  },
  "es": {
    "Print": "Imprimir",
    "Share": "Compartir",
    "Share on Facebook": "Compartir en Facebook",
    "Share on Twitter": "Compartir en Twitter",
    "Copy URL": "Copiar URL",
    "Hide Image": "Ocultar imagen"
  },
  "hi": {
    "Print": "प्रिंट करे",
    "Share": "बाटें",
    "Share on Facebook": "फेसबुक पर बाटे",
    "Share on Twitter": "ट्विटर पर बाटे",
    "Copy URL": "यूआरएल नकल करें",
    "Hide Image": "चित्र छुपाएं"
  },
  "nl": {
    "Print": "Printen",
    "Share": "Delen",
    "Share on Facebook": "Deel op Facebook",
    "Share on Twitter": "Deel op Twitter",
    "Copy URL": "URL kopiëren",
    "Hide Image": "Afbeelding verbergen"
  },
  "bn": {
    "Print": "প্রিন্ট",
    "Share": "শেয়ার",
    "Share on Facebook": "ফেসবুকে শেয়ার করুন",
    "Share on Twitter": "টুইটারে শেয়ার করুন",
    "Copy URL": "ইউআরএল অনুলিপি করে নিন  ",
    "Hide Image": "ছবি লুকান"
  }
}
</i18n>
