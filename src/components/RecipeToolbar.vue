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
        Hide Image
      </b-form-checkbox>
    </div>

    <FavoriteStar
      class="mr-3 fav-star"
      @favorite="favorited"
      :isFavorited="isFavorited"
    ></FavoriteStar>

    <div class="print-button" v-if="!isMobile">
      <b-button v-if="isPrint" variant="outline-primary" @click="print()">
        Print
      </b-button>
      <b-button v-else variant="outline-primary" :to="`/recipe/${name}/print`" target="_blank">
        Print
      </b-button>
    </div>

    <div class="share-button">
      <b-dropdown text="Share" variant="outline-primary" right class="m-2">
        <b-dropdown-item>
          <ShareNetwork
            network="facebook"
            :url="url"
            :title="drink.name"
            :description="drink.description"
            :hashtags="drink.keywords.join()"
          >
            Share on Facebook
          </ShareNetwork>
        </b-dropdown-item>
        <b-dropdown-item>
          <ShareNetwork
            network="twitter"
            :url="url"
            :title="drink.name"
            :description="drink.description"
            :hashtags="drink.keywords.join()"
          >
            Share on Twitter
          </ShareNetwork>
        </b-dropdown-item>
      </b-dropdown>
    </div>
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
      isFavorited: false,
      favorites: [],
      showImage: true,
    };
  },
  created() {
    this.getFavorites();
  },
  methods: {
    getFavorites() {
      this.favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
      this.isFavorited = this.favorites.indexOf(this.drink.name) !== -1;
    },
    favorited() {
      const index = this.favorites.indexOf(this.drink.name);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(this.drink.name);
      }
      this.isFavorited = !this.isFavorited;
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    print() {
      window.print();
    },
    onShowImage() {
      this.showImage = !this.showImage;
      this.$emit('show-image', this.showImage);
    },
  },
};
</script>
