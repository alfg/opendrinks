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
      v-b-tooltip.hover.nonInteractive="!isFavorited ? $t('Set Favorite') : $t('Unset Favorite')"
    ></FavoriteStar>
    <ShareNetwork
      network="facebook"
      :url="url"
      :title="drink.name"
      :description="drink.description"
      :hashtags="drink.keywords.join()"
      class="px-1 clickable-icon-hover"
      v-b-tooltip.hover.nonInteractive="$t('Share on Facebook')"
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
      v-b-tooltip.hover.nonInteractive="$t('Share on Twitter')"
    >
      <BIconTwitter font-scale="2"></BIconTwitter>
    </ShareNetwork>
    <BIconFiles
      v-b-tooltip.hover.nonInteractive="$t('Copy URL')"
      class="mx-1 theme-link-color cursor-pointerclickable-icon-hover"
      font-scale="2"
      @click="copyUrl"
    >
    </BIconFiles>
    <div
      v-b-tooltip.hover.nonInteractive="$t('Print')"
      class="mx-1 theme-link-color cursor-pointer clickable-icon-hover"
      v-if="!isMobile"
    >
      <BIconPrinter :fontScale="2" v-if="isPrint" @click="print()"></BIconPrinter>
      <a v-else :href="`/recipe/${name}/print`" target="_blank">
        <BIconPrinter :fontScale="2"></BIconPrinter>
      </a>
    </div>
    <b-toast v-model="copyToast" :title="$t('URL Copied')" :auto-hide-delay="500">
      {{ $t('The URL is copied in your clipboard') }}
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
  "ar": {
    "Print": "إطبع",
    "Share": "شارك",
    "Share on Facebook": "شارك على الفيسبوك",
    "Share on Twitter": "شارك على التويتر",
    "Copy URL": "إنسخ الرابط",
    "Hide Image": "إخفاء الصورة"
  },
  "gl": {
    "Print": "Imprimir",
    "Share": "Compartir",
    "Share on Facebook": "Compartir en Facebook",
    "Share on Twitter": "Compartir en Twitter",
    "Copy URL": "Copiar URL",
    "Hide Image": "Ocultar imaxe"
  },
  "de": {
    "Print": "Drucken",
    "Share": "Teilen",
    "Share on Facebook": "Auf Facebook teilen",
    "Share on Twitter": "Auf Twitter teilen",
    "Copy URL": "URL kopieren",
    "Hide Image": "Bild ausblenden"
  },
  "nl": {
    "Print": "Printen",
    "Share": "Delen",
    "Share on Facebook": "Deel op Facebook",
    "Share on Twitter": "Deel op Twitter",
    "Copy URL": "URL kopiëren",
    "Hide Image": "Afbeelding verbergen"
  },
  "no": {
    "Print": "Skriv ut",
    "Share": "Del",
    "Share on Facebook": "Del på Facebook",
    "Share on Twitter": "Del på Twitter",
    "Copy URL": "Kopier URL",
    "Hide Image": "Skjul bilde"
  },
  "ru": {
    "Print": "Распечатать",
    "Share": "Поделиться",
    "Share on Facebook": "Поделиться через Facebook",
    "Share on Twitter": "Поделиться через Twitter",
    "Copy URL": "скопировать URL",
    "Hide Image": "Скрыть изображение"
  },
  "uk": {
    "Print": "Роздрукувати",
    "Share": "Поділитися",
    "Share on Facebook": "Поділитися через Facebook",
    "Share on Twitter": "Поділитися через Twitter",
    "Copy URL": "скопіювати URL",
    "Hide Image": "Приховати зображення"
  },
  "bn": {
    "Print": "প্রিন্ট",
    "Share": "শেয়ার",
    "Share on Facebook": "ফেসবুকে শেয়ার করুন",
    "Share on Twitter": "টুইটারে শেয়ার করুন",
    "Copy URL": "ইউআরএল অনুলিপি করে নিন  ",
    "Hide Image": "ছবি লুকান"
  },
  "it": {
    "Print": "Stampa",
    "Share": "Condividi",
    "Share on Facebook": "Condividi su Facebook",
    "Share on Twitter": "Condividi su Twitter",
    "Copy URL": "Copia URL",
    "Hide Image": "Nascondi immagine"
  },
  "np": {
    "Print": "छाप्नुहोस्",
    "Share": "साझा गर्नुहोस्",
    "Share on Facebook": "फेसबुकमा साझा गर्नुहोस्",
    "Share on Twitter": "ट्विटर मा साझा गर्नुहोस्",
    "Copy URL": "यूआरएल प्रतिलिपि गर्नुहोस्",
    "Hide Image": "चित्र लुकाउनुहोस्"
  },
  "pt": {
    "Print": "Imprimir",
    "Share": "Compartilhar",
    "Share on Facebook": "Compartilhar no Facebook",
    "Share on Twitter": "Compartilhar no Twitter",
    "Copy URL": "Copiar URL",
    "Hide Image": "Esconder imagem"
  },
  "zh": {
    "Print": "打印",
    "Share": "分享",
    "Share on Facebook": "Facebook",
    "Share on Twitter": "Twitter",
    "Copy URL": "复制链接",
    "Hide Image": "隐藏图像"
  },
  "vi": {
    "Print": "In",
    "Share": "Chia sẻ",
    "Share on Facebook": "Chia sẻ trên Facebook",
    "Share on Twitter": "Chia sẻ trên Twitter",
    "Copy URL": "Sao chép URL",
    "Hide Image": "Ẩn hình ảnh"
  },
  "th": {
    "Print": "พิมพ์",
    "Share": "แชร์",
    "Share on Facebook": "Facebook",
    "Share on Twitter": "Twitter",
    "Copy URL": "คัดลอกลิ้งค์",
    "Hide Image": "ซ่อนรูป"
  }
}
</i18n>
