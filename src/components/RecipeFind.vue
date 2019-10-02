<template>
  <div id="recipe-find">
    <b-form-input
      @keydown.enter="onEnter"
      @input="onInput"
    ></b-form-input>

    <b-list-group class="mt-4" v-if="search.length > 0">
      <b-list-group-item
        v-for="o in filterResults" v-bind:key="o.name"
        :href="'/recipe/' + o.filename"
      >{{ o.name }}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import recipes from '../recipes';
import Fuse from 'fuse.js';

const limit = 10; // Limit filtered results.

export default {
  name: 'RecipeFind',
  data() {
    return {
      search: '',
      fuse: {},
    };
  },
  computed: {
    filterResults() {
      return this.fuse
        .search(this.search)
        .slice(0, limit);
    },
  },
  created() {
    const data = recipes.getRecipes();
    window.document.title = 'Open Drinks - Search';

    this.fuse = new Fuse(data, {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        { name: "name", weight: 0.75 },
        { name: "ingredients", weight: 0.25 },
      ]
    });
  },
  methods: {
    onEnter() {
      this.$router.push({
        name: 'recipe',
        params: { id: this.filterResults[0].filename },
      });
    },
    onInput(evt) {
      this.search = evt;
    },
  },
};
</script>
