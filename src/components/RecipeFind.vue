<template>
  <div id="recipe-find">
    <b-form-input @keydown.enter="onEnter" v-on:keydown="onKeydown" v-model.trim="search">
    </b-form-input>

    <b-form-group class="mt-2" label="Filter by:">
      <b-form-radio-group v-model="selectedSearch" name="selectedSearch">
        <b-form-radio value="name">Name</b-form-radio>
        <b-form-radio
          v-b-tooltip.hover
          title="You can search for multiple ingredients by separating them with a space"
          value="ingredients"
          >Ingredients</b-form-radio
        >
        <b-form-radio
          v-b-tooltip.hover
          title="You can search for multiple keywords by separating them with a space"
          value="keywords"
          >Keywords</b-form-radio
        >
      </b-form-radio-group>
    </b-form-group>

    <b-list-group class="mt-4" v-if="search.length > 0">
      <b-list-group-item
        v-for="o in filterResults"
        v-bind:key="o.name"
        v-on:mouseover="onMouseOverOrMove"
        v-on:mouseleave="onMouseLeave"
        v-on:mousemove="onMouseOverOrMove"
        :href="'/recipe/' + o.filename"
        >{{ o.name }}</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
import recipes from '../recipes';

const LIMIT = 50; // Limit filtered results.

export default {
  name: 'RecipeFind',
  data() {
    return {
      data: [],
      selectedSearch: 'name',
      search: '',
    };
  },
  computed: {
    filterResults() {
      const searchParts = this.search
        .toLowerCase()
        .normalize('NFD') // remove accents from string
        .replace(/[\u0300-\u036f]/g, '') // remove accents and diacritics in the Combining Diacritical Marks Unicode block
        .split(' ');

      const isNameEnabled = this.selectedSearch === 'name';
      const isIngredientsEnabled = this.selectedSearch === 'ingredients';
      const isKeywordsEnabled = this.selectedSearch === 'keywords';

      let filtered = [];

      if (isNameEnabled) {
        filtered = this.data.filter(
          recipe =>
            recipe.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .indexOf(this.search.toLowerCase()) > -1,
        );
      }

      if (isIngredientsEnabled) {
        filtered = this.data.filter(recipe =>
          searchParts.every(s =>
            recipe.ingredients.some(i =>
              i.ingredient
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(s.toLowerCase()),
            ),
          ),
        );
      }

      if (isKeywordsEnabled) {
        filtered = this.data.filter(recipe =>
          searchParts.every(
            s =>
              recipe.keywords &&
              recipe.keywords.some(k => k.toLowerCase().includes(s.toLowerCase())),
          ),
        );
      }

      // Sort the results.
      filtered = filtered.sort((recipeA, recipeB) => {
        // Name-matches to the top if the user wanted to find a drink based on the name
        const hasName = recipeB.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ? 1 : -1;

        // Doesn't seem to be used. Disabling for now.
        // const alphabetical = recipeB.name.toLowerCase() > recipeB.name.toLowerCase() ? -1 : 1;
        return !isNameEnabled ? 0 : hasName;
      });

      return filtered.slice(0, LIMIT);
    },
  },
  created() {
    const data = recipes.getRecipes();
    this.data = data;
    window.document.title = 'Open Drinks - Search';
  },
  methods: {
    onMouseOverOrMove(event) {
      // we add 'highlight' class when ever mouse is active on an element
      const hoveredElement = event.target;
      if (hoveredElement.classList.contains('highlight')) return;

      const currentHighlightedComponent = this.$children.find(component => {
        return component.$el && component.$el.classList.contains('highlight');
      });
      if (currentHighlightedComponent)
        currentHighlightedComponent.$el.classList.remove('highlight');
      hoveredElement.classList.add('highlight');
    },
    onMouseLeave(event) {
      // we remove the "highlight" class after mouse leave
      const hoveredElement = event.target;
      hoveredElement.classList.remove('highlight');
    },
    onEnter() {
      const listElements = this.$children.filter(component => {
        return component.$el && component.$el.classList.contains('list-group-item');
      });
      const currentHighlightedComponentIndex = listElements.findIndex(component => {
        return component.$el && component.$el.classList.contains('highlight');
      });
      const index = currentHighlightedComponentIndex > 0 ? currentHighlightedComponentIndex : 0;

      this.$router.push({
        name: 'recipe',
        params: { id: this.filterResults[index].filename },
      });
    },
    onKeydown(event) {
      const listElements = this.$children.filter(component => {
        return component.$el && component.$el.classList.contains('list-group-item');
      });
      if (listElements.length === 0) {
        return;
      }
      const currentHighlightedComponent = listElements.find(component => {
        return component.$el && component.$el.classList.contains('highlight');
      });
      const firstListElement = listElements[0].$el;
      const lastListElement = listElements[listElements.length - 1].$el;
      let nextElement;

      if (event.keyCode === 40) {
        // key down
        nextElement = currentHighlightedComponent
          ? currentHighlightedComponent.$el.nextSibling
          : firstListElement;
      } else if (event.keyCode === 38) {
        // key up
        nextElement = currentHighlightedComponent
          ? currentHighlightedComponent.$el.previousSibling
          : lastListElement;
      }
      if (currentHighlightedComponent)
        currentHighlightedComponent.$el.classList.remove('highlight');
      if (nextElement) nextElement.classList.add('highlight');
    },
  },
};
</script>

<style scoped>
.list-group .list-group-item-action.highlight {
  background-color: #f8f9fa;
}
/* we had to overrride bootstrap default hover color */
.list-group-item-action:hover {
  background-color: #fff;
}
</style>
