<template>
  <b-card
    class="mb-4"
    style="min-width: calc( 33.333% - 30px )"
    :to="'/recipe/' + drink.filename"
    no-body
  >
    <b-link :to="'/recipe/' + drink.filename">
      <b-card-img-lazy
        :src="drink.image ? require(`@/assets/recipes/${drink.image}`) : null"
        :alt="drink.name"
        top
      />
    </b-link>

    <b-card-body>
      <b-card-title>
        <b-link :to="'/recipe/' + drink.filename">
          <h5>{{ drink.name }}</h5>
        </b-link>
      </b-card-title>
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
  </b-card>
</template>

<script>
import recipes from '../recipes';

const MAX_DESCRIPTION_LENGTH = 80;

export default {
  name: 'RecipeTile',
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
      return description.length > MAX_DESCRIPTION_LENGTH ? `${cropped} ...` : description;
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

<style scoped>
.card-body {
  padding: 0.9rem;
}

.card-text p {
  margin-bottom: 0.5rem;
}

.card-img-top {
  height: 212px;
  object-fit: cover;
}

.mb-4:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
</style>
