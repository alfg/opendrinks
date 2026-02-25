<template>
  <div id="recipe-list" class="">
    <b-row>
      <b-col
        v-for="(o, i) in paginatedItems"
        v-bind:key="i"
        cols="12"
        md="6"
        lg="4"
        class="mb-4 d-flex"
      >
        <b-card
          class="w-100"
          :title="o.name"
          :img-src="o.image ? require(`@/assets/recipes/${o.image}`) : null"
          :img-alt="o.name"
          img-top
        >
          <b-card-text>
            {{ o.description }}
          </b-card-text>

          <b-button :to="'/recipe/' + o.filename" variant="primary">{{
            $t('recipeList.viewRecipe')
          }}</b-button>
          <FavoriteStar
            class="mt-2 float-end"
            @favorite="favorited(o.name)"
            :isFavorited="favorites.includes(o.name)"
          ></FavoriteStar>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col cols="12" md="10">
        <b-pagination
          v-model="currentPage"
          :total-rows="items.length"
          :per-page="perPage"
          @update:model-value="onPageChanged"
        ></b-pagination>
      </b-col>
      <b-col cols="12" md="2">
        <b-form-select v-model="perPage" :options="options" v-on:change="getSelectedItem">
        </b-form-select>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FavoriteStar from './FavoriteStar.vue';

export default {
  name: 'RecipeList',
  props: {
    title: String,
    items: Array,
  },
  components: {
    FavoriteStar,
  },
  data() {
    return {
      perPage: 12,
      currentPage: 1,
      options: [
        { value: 12, text: '12' },
        { value: 24, text: '24' },
        { value: 48, text: '48' },
      ],
      favorites: [],
    };
  },
  mounted() {
    window.document.title = this.title;
    this.favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    const page = this.$route && this.$route.query && this.$route.query.page;
    if (page) this.currentPage = parseInt(page, 10);
  },
  watch: {
    items(newItems, oldItems) {
      if (newItems && oldItems && newItems.length !== oldItems.length) {
        if (this.currentPage > Math.ceil(newItems.length / this.perPage)) {
          this.currentPage = 1;
        }
      }
    },
  },
  computed: {
    pages() {
      return this.items.length === 0 ? 1 : Math.ceil(this.items.length / this.perPage);
    },
    paginatedItems() {
      const pageNumber = (this.currentPage || 1) - 1;
      return this.items.slice(pageNumber * this.perPage, (pageNumber + 1) * this.perPage);
    },
  },
  methods: {
    onPageChanged(page) {
      if (this.$router) {
        const query = { ...this.$route.query, page: page === 1 ? undefined : page };
        this.$router.push({ query });
      }
      window.scrollTo(0, 0);
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`;
    },
    getSelectedItem(event) {
      this.perPage = event;
    },
    favorited(name) {
      const index = this.favorites.indexOf(name);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(name);
      }
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.$emit('favoriteClick', name);
    },
  },
};
</script>

<style scoped>
.card-text {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 6rem;
}
.card-img-top {
  height: 212px;
  object-fit: cover;
}
</style>
