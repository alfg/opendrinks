<template>
  <div id="app" class="mb-4">
    <GitHubCorner class="theme-bg-color" v-if="!isMobile && !isPrintPage" />
    <ThemeHandler class="mt-2 ml-2" v-if="!isMobile && !isPrintPage"></ThemeHandler>
    <div class="container mb-4 mt-4">
      <div class="mb-4 d-flex">
        <h1 class="logo">
          <router-link to="/">
            <img alt="Logo" src="./assets/logo.png" width="50" />
            Open Drinks
          </router-link>
        </h1>
      </div>

      <b-nav tabs align="center">
        <b-nav-item to="/">{{ $t('Featured') }}</b-nav-item>
        <b-nav-item to="/random" v-if="!isMobile">{{ $t('Random') }}</b-nav-item>
        <b-nav-item to="/explore">{{ $t('Explore') }}</b-nav-item>
        <b-nav-item to="/keyword" v-if="!isMobile">{{ $t('Keywords') }}</b-nav-item>
        <b-nav-item to="/search">{{ $t('Search') }}</b-nav-item>
        <b-nav-item to="/favorites" alt="Favorites">⭐</b-nav-item>
      </b-nav>
    </div>
    <Adspace v-if="!isPrintPage" />

    <router-view />

    <footer class="container mt-4 text-center">
      <hr />
      <div>
        View the source or contribute a drink recipe on
        <a href="https://github.com/alfg/opendrinks">GitHub</a>!
      </div>
      <a href="https://www.netlify.com">
        <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="Netlify" />
      </a>
    </footer>
  </div>
</template>

<script>
import GitHubCorner from '@/components/GitHubCorner.vue';
import ThemeHandler from '@/components/ThemeHandler.vue';
import Adspace from '@/components/Adspace.vue';

export default {
  name: 'App',
  components: {
    GitHubCorner,
    ThemeHandler,
    Adspace,
  },
  metaInfo() {
    return {
      title: 'Open Drinks',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content: 'Open Source Drink Recipes',
          vmid: 'description',
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  max-width: 960px;
}

.logo {
  font-family: 'Pacifico', 'cursive';
  width: 100%;
  text-align: center;
}
.logo a {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 576px) {
  .nav {
    font-size: 0.9rem;
  }
}
</style>

<i18n>
{
  "ja": {
    "Featured": "特集",
    "Random": "ランダム",
    "Explore": "探索",
    "Keywords": "キーワード",
    "Search": "検索"
  },
  "fr": {
    "Featured": "En vedette",
    "Random": "Aléatoire",
    "Explore": "Parcourir",
    "Keywords": "Mots-Clés",
    "Search": "Recherche"
  },
  "es": {
    "Featured": "Destacadas",
    "Random": "Aleatorio",
    "Explore": "Explora",
    "Keywords": "Palabras Claves",
    "Search": "Búsqueda"
  },
  "hi": {
    "Featured": "विशेष रुप से प्रदर्शित",
    "Random": "अनियमित",
    "Explore": "अन्वेषण करिये",
    "Keywords": "सूचक-शब्द",
    "Search": "खोजिये"
  },
  "ar": {
    "Featured": "مميّز",
    "Random": "عشوائي",
    "Explore": "اكتشف",
    "Keywords": "الكلمات المفاتيح",
    "Search": "ابحث"
  },
  "gl": {
    "Featured": "Destacadas",
    "Random": "Aleatorio",
    "Explore": "Explora",
    "Keywords":"Palabras Craves",
    "Search": "Procura"
  },
  "de": {
    "Featured": "Empfohlen",
    "Random": "Zufallsrezepte",
    "Explore": "Alle Rezepte",
    "Keywords": "Schlüsselwörter",
    "Search": "Suche"
  },
  "nl": {
    "Featured": "Aanbevolen",
    "Random": "Willekeurig",
    "Explore": "Alle recepten",
    "Keywords": "Trefwoorden",
    "Search": "Zoeken"
  },
  "no": {
    "Featured": "Fremhevet",
    "Random": "Tilfeldig",
    "Explore": "Alle oppskrifter",
    "Keywords": "Nøkkelord",
    "Search": "Søk"
  },
  "bn": {
    "Featured": "বিশেষ ভাবে প্রকাশিত",
    "Random": "এলোমেলো",
    "Explore": "ঘুরে দেখুন",
    "Keywords": "কীওয়ার্ড সমূহ",
    "Search": "খুঁজে দেখুন "
  },
  "it": {
    "Featured": "In primo piano",
    "Random": "Casuale",
    "Explore": "Esplora",
    "Keywords": "Parole chiave",
    "Search": "Cerca"
  },
  "np": {
    "Featured": "विशेष रुपले प्रदर्शित",
    "Random": "अनियमित",
    "Explore": "अन्वेषण गर्नुहोस्",
    "Keywords": "मुख्य-शब्द",
    "Search": "खोज"
  },
  "zh": {
    "Featured": "精选",
    "Random": "随机",
    "Explore": "探索",
    "Keywords": "关键词",
    "Search": "搜索"
  },
    "vi": {
    "Featured": "Tiêu biểu",
    "Random": "Ngẫu nhiên",
    "Explore": "Khám phá",
    "Keywords": "Từ khóa",
    "Search": "Tìm kiếm"
  },
    "th": {
    "Featured": "แนะนำ",
    "Random": "สุ่ม",
    "Explore": "ค้นหา",
    "Keywords": "คำค้น",
    "Search": "ค้นหา"
  }
}
</i18n>
