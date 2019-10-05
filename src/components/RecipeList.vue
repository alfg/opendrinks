<template>
  <div id="recipe-list" class="container">
    <b-card-group deck>
      <div
        v-for="(o, i) in paginatedItems"
        v-bind:key="i"
        class="mb-2 p-1"
      >
        <b-card
            :title="o.name"
            :img-src="o.image ? require(`@/recipes/img/${o.image}`) : null"
            :img-alt="o.name"
            img-top
            style="max-width: 20rem;"
          >
          <b-card-text>
            {{ o.description }}
          </b-card-text>

          <b-button :href="'/recipe/' + o.filename" variant="primary">View Recipe</b-button>
        </b-card>
      </div>
    </b-card-group>

    <b-container>
      <b-row>
        <b-col cols="12" md="10">
          <b-pagination
            @change="onPageChanged"
            :total-rows="rows"
            :per-page="selected"
            v-model="currentPage"
          ></b-pagination>
        </b-col>
        <b-col cols="12" md="2">
          <b-form-select
            v-model="selected"
            :options="options"
            v-on:change="getSelectedItem">
          </b-form-select>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import recipes from '../recipes';

export default {
  name: 'RecipeList',
  data() {
    return {
      items: [],
      paginatedItems: [],
      currentPage: 1,
      perPage: 10,
      selected: 10,
      options: [
        { value: 10, text: '10'},
        { value: 25, text: '25'},
        { value: 50, text: '50'}
      ]
    };
  },
  mounted() {
    this.getDrinks();
    window.document.title = 'Open Drinks - Explore';
    this.paginate(this.perPage, 0);
  },
  computed: {
      rows() {
        return this.items.length
      }
  },
  methods: {
    getDrinks() {
      const drinks = recipes.getRecipes();
      this.items = drinks;
    },
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    getSelectedItem(event) {
      this.perPage = event;
      this.paginate(this.perPage, 0);
    }
  },
};
</script>

<style scoped>
.card-deck .card {
  margin-right: 0;
}
</style>
