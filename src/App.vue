<template>
  <div id="app">
    <div class="container mb-4 mt-4">
      <div class="text-center">
        <h1>
        <img alt="Logo" src="./assets/logo.png" width="50">
        Open Drinks
        </h1>
      </div>

      <b-nav tabs>
        <b-nav-item to="/">Random</b-nav-item>
        <b-nav-item to="/explore">Explore</b-nav-item>
        <b-nav-item to="/search">Search</b-nav-item>
      </b-nav>
    </div>
    <router-view/>

    <footer class="container mt-4 text-center">
      <hr />
      <div>View the source or contribute a drink recipe on <a href="https://github.com/alfg/drink">GitHub</a>!</div>
      <a href="https://www.netlify.com">
        <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="Netlify" />
      </a>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app .router-link-exact-active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
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
    max-width: 720px;
}
</style>
