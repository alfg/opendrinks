import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Featured.vue'),
    },
    {
      path: '/featured',
      name: 'featured',
      component: () => import('./views/Featured.vue'),
    },
    {
      path: '/random',
      name: 'random',
      component: () => import('./views/Random.vue'),
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: () => import('./views/Recipe.vue'),
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('./views/Explore.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue'),
    },
    {
      path: '/recipe/:id/print',
      name: 'printRecipe',
      component: () => import('./views/PrintRecipe.vue'),
    },
    {
      path: '/keyword',
      name: 'keywordList',
      component: () => import('./views/KeywordList.vue'),
    },
    {
      path: '/keyword/:keyword',
      name: 'keyword',
      component: () => import('./views/Keyword.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('./views/Favorites.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/PageNotFound.vue'),
    },
  ],
});
