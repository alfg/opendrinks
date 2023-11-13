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
        <b-nav-item to="/">{{ $t('app.featured') }}</b-nav-item>
        <b-nav-item to="/random" v-if="!isMobile">{{ $t('app.random') }}</b-nav-item>
        <b-nav-item to="/explore">{{ $t('app.explore') }}</b-nav-item>
        <b-nav-item to="/keyword" v-if="!isMobile">{{ $t('app.keywords') }}</b-nav-item>
        <b-nav-item to="/search">{{ $t('app.search') }}</b-nav-item>
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
