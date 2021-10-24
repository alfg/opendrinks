<template>
  <div class="featured-recipes">
    <div v-for="(feature, i) in featuredList" v-bind:key="i">
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.description }}</p>
      <b-card-group deck>
        <RecipeTile
          v-for="(item, j) in feature.items.slice(0, feature.size)"
          v-bind:key="j"
          v-bind:id="item"
        />
      </b-card-group>
      <b-button
        block
        variant="outline-primary"
        v-if="feature.items.length > featuredItemSize && feature.size < feature.items.length"
        v-on:click="loadMore(i)"
        v-t="'Load More'"
      />

      <hr v-if="featuredList.length !== i + 1" />
    </div>
  </div>
</template>

<script>
import recipes from '../recipes';
import RecipeTile from './RecipeTile.vue';

const FEATURED_ITEM_SIZE = 6;

export default {
  name: 'FeaturedRecipes',
  components: {
    RecipeTile,
  },
  data() {
    return {
      featuredList: [],
      featuredItemSize: FEATURED_ITEM_SIZE,
    };
  },
  created() {
    window.document.title = `Open Drinks - Featured`;
    this.featuredList = recipes.getFeaturedRecipes();
  },
  methods: {
    loadMore(i) {
      this.featuredList[i].size += FEATURED_ITEM_SIZE;
    },
  },
};
</script>

<i18n>
{
  "ja": {
    "Load More": "もっと見る"
  },
  "fr": {
    "Load More": "Voir plus"
  },
  "es": {
    "Load More": "Cargar Más"
  },
  "hi": {
    "Load More": "और विधि देखिये"
  },
  "ar": {
    "Load More": "حمّل المزيد"
  },
  "gl": {
    "Load More": "Cargar máis"
  },
  "de": {
    "Load More": "Mehr laden"
  },
  "nl": {
    "Load More": "Laad meer"
  },
  "no": {
    "Load More": "Last mer"
  },
  "ru": {
    "Load More": "Загрузить еще"
  },
  "uk": {
    "Load More": "Завантажити більше"
  },
  "bn":{
    "Load More": "আরো দেখুন"
  },
  "it": {
    "Load More": "Carica altro"
  },
  "np": {
    "Load More": "अझ विधि हेर्नुहोस्"
  },
  "pt": {
    "Load More": "Ver mais"
  },
  "zh": {
    "Load More": "加载更多"
  },
  "vi": {
    "Load More": "Tải thêm"
  },
  "th": {
    "Load More": "โหลดเพิ่มเติม"
  }
}
</i18n>
