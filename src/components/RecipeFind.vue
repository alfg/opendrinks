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

const limit = 10; // Limit filtered results.

export default {
  name: 'RecipeFind',
  data() {
    return {
      data: [],
      search: '',
    };
  },
  computed: {
    filterResults() {
      const filtered = this.data.filter(item => (
        item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      ));
      return filtered.slice(0, limit);
    },
  },
  created() {
    const data = recipes.getRecipes();
    this.data = data;
    window.document.title = 'Open Drinks - Search';
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
