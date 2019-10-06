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
      component: () => import('./views/Home.vue'),
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
  ],
});
