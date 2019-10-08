<template>
    <b-card
      :title="drink.name"
      :img-src="drink.image
        ? require(`@/recipes/img/${drink.image}`)
        : null"
      :img-alt="drink.name"
      img-top
      footer-tag="footer"
      :header="drink.name"
      tag="article"
      class="mb-4"
      style="min-width: calc( 50% - 30px )"
      no-body
    >
      <b-card-body>
        <b-card-text>
          {{ croppedDescription }}
        </b-card-text>
        <b-card-text>
          <div v-if="drink.keywords">
            <b-badge
              v-for="(o, i) in drink.keywords"
              v-bind:key="i"
              variant="primary"
              class="mr-1"
              :to="{ name: 'keyword', params: { keyword: urlEncode(o) } }"
            >
              {{ o }}
            </b-badge>
          </div>
        </b-card-text>
      </b-card-body>

      <b-card-footer>
        <b-button
          :href="'/recipe/' + drink.filename"
          variant="primary"
          size="sm"
        >
          View Recipe
        </b-button>
      </b-card-footer>
    </b-card>
</template>

<script>
import recipes from '../recipes';

const MAX_DESCRIPTION_LENGTH = 50;

export default {
  name: 'recipeTile',
  props: {
    id: String,
  },
  data() {
    return {
      drink: {},
    };
  },
  computed: {
    croppedDescription() {
      const { description } = this.drink;
      const cropped = description.substring(0, MAX_DESCRIPTION_LENGTH);
      return description.length > MAX_DESCRIPTION_LENGTH
        ? `${cropped} …`
        : description;
    },
  },
  created() {
    const drink = recipes.getRecipe(this.id);
    this.drink = drink;
  },
  methods: {
    urlEncode(item) {
      return window.encodeURI(item);
    },
  },
};
</script>
