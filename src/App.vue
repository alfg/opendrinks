<template>
  <div id="app" class="mb-4">
    <GitHubCorner />

    <div class="container mb-4 mt-4">
      <div class="mb-4">
        <h1 class="logo">
          <router-link to="/">
            <img alt="Logo" src="./assets/logo.png" width="50" />
            Open Drinks
          </router-link>
        </h1>
      </div>

      <b-nav tabs align="center">
        <b-nav-item to="/">Featured</b-nav-item>
        <b-nav-item to="/random" v-if="!isMobile">Random</b-nav-item>
        <b-nav-item to="/explore">Explore</b-nav-item>
        <b-nav-item to="/keyword" v-if="!isMobile">Keywords</b-nav-item>
        <b-nav-item to="/search">Search</b-nav-item>
        <b-nav-item to="/favorites" alt="Favorites">⭐</b-nav-item>
      </b-nav>
    </div>
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

export default {
  name: 'App',
  components: {
    GitHubCorner,
  },
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    },
  },
};
</script>