<template>
  <div class="container shot-recipes">
    <header class="mb-4">
      <h1>Best Shot Recipes (Easy Party &amp; Bar Shooters)</h1>
      <p>
        Shot drinks are small, bold cocktails served in one quick sip. Whether you're hosting a
        party, stocking your home bar, or just looking for fun and creative drink ideas, this guide
        covers the best shot recipes — from sweet and layered shooters to strong classic bar shots.
      </p>
      <p class="mb-0">Explore our collection below and find your next favorite.</p>
    </header>

    <section class="mb-4">
      <h2>Classic Shot Recipes</h2>
      <p class="mb-2">These are the most popular bar shots you’ll find in clubs and parties.</p>
      <ul class="mb-0">
        <li v-for="link in classicShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>
    </section>

    <section class="mb-4">
      <h2>Sweet &amp; Dessert-Inspired Shots</h2>
      <p class="mb-2">Perfect for beginners and party guests who prefer sweeter drinks.</p>
      <ul class="mb-0">
        <li v-for="link in sweetShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>
    </section>

    <section class="mb-4">
      <h2>Strong &amp; High-Alcohol Shots</h2>
      <p class="mb-2">These pack a punch.</p>
      <ul class="mb-0">
        <li v-for="link in strongShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>
    </section>

    <section class="mb-4">
      <h2>Layered Shot Recipes (Visually Impressive)</h2>
      <p class="mb-2">
        Layered shots look great and taste even better. To layer a shot, pour each ingredient slowly
        over the back of a bar spoon so the liquids float into distinct layers.
      </p>
      <ul class="mb-0">
        <li v-for="link in layeredShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>
    </section>

    <section class="mb-4">
      <h2>Best Party Shot Recipes</h2>
      <p class="mb-2">If you’re hosting a party, these are crowd favorites.</p>
      <ul class="mb-0">
        <li v-for="link in partyShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>
    </section>

    <section class="mb-4">
      <h2>Shots by Liquor</h2>

      <h3 class="h5 mt-3">Vodka Shots</h3>
      <ul class="mb-0">
        <li v-for="link in vodkaShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>

      <h3 class="h5 mt-3">Tequila Shots</h3>
      <ul class="mb-0">
        <li v-for="link in tequilaShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>

      <h3 class="h5 mt-3">Whiskey Shots</h3>
      <ul class="mb-0">
        <li v-for="link in whiskeyShots" :key="link.slug">
          <b-link :to="`/recipe/${link.slug}`">{{ link.label }}</b-link>
        </li>
      </ul>
    </section>

    <section class="mb-5">
      <h2>Shot Recipes FAQ</h2>

      <h3 class="h5">What is the most popular shot drink?</h3>
      <p>The Lemon Drop, Kamikaze, and Irish Car Bomb are among the most popular bar shots.</p>

      <h3 class="h5">What are easy 2-ingredient shots?</h3>
      <p>
        Lemon Drop (vodka + lemon), Pickleback (whiskey + pickle juice), and Tequila Slammer are
        simple options.
      </p>

      <h3 class="h5">What is the strongest shot?</h3>
      <p>
        Shots made with high-proof alcohol like 151 rum or multiple spirits (like the Four Horsemen)
        are among the strongest.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ShotRecipes',
  head() {
    const title = '50+ Best Shot Recipes (Easy Party & Bar Shots Guide)';
    const description =
      'Discover 50+ of the best shot recipes for parties and home bars. From sweet layered shots to strong classic shooters, find easy step-by-step recipes and ingredients.';
    return {
      title,
      titleTemplate: t => `${t} | Open Drinks`,
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Open Drinks' },
        { property: 'og:url', content: `https://opendrinks.io${window.location.pathname}` },
        { property: 'og:description', content: description },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the most popular shot drink?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Lemon Drop, Kamikaze, and Irish Car Bomb are among the most popular bar shots.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are easy 2-ingredient shots?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Lemon Drop (vodka + lemon), Pickleback (whiskey + pickle juice), and Tequila Slammer are simple options.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the strongest shot?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Shots made with high-proof alcohol like 151 rum or multiple spirits (like the Four Horsemen) are among the strongest.',
                },
              },
            ],
          }),
        },
      ],
    };
  },
  data() {
    return {
      classicShots: [
        { label: 'Irish Car Bomb', slug: 'irish-car-bomb' },
        { label: 'Kamikaze Shot', slug: 'kamikaze-shot' },
        { label: 'Lemon Drop Shot', slug: 'lemon-drop' },
        { label: 'B-52 Shot', slug: 'b-52' },
        { label: 'Jägerbomb', slug: 'jagerbomb' },
        { label: 'Tequila Slammer', slug: 'tequila-slammer' },
        { label: 'Buttery Nipple', slug: 'buttery-nipple' },
        { label: 'Vegas Bomb', slug: 'vegas-bomb' },
        { label: 'Washington Apple Shot', slug: 'washington-apple' },
        { label: 'Mind Eraser', slug: 'mind-eraser' },
      ],
      sweetShots: [
        { label: 'Alien Brain Hemorrhage', slug: 'alien-brain-hemorrhage' },
        { label: 'Chocolate Cake Shot', slug: 'chocolate-cake-shot' },
        { label: 'Birthday Cake Shot', slug: 'birthday-cake-shot' },
        { label: 'Pineapple Upside Down Shot', slug: 'pineapple-upside-down-shot' },
        { label: 'Peach Ring Shot', slug: 'peach-ring-shot' },
        { label: 'Strawberry Cheesecake Shot', slug: 'strawberry-cheesecake-shot' },
        { label: 'Caramel Apple Shot', slug: 'caramel-apple-shot' },
      ],
      strongShots: [
        { label: 'AMF Shot', slug: 'amf' },
        { label: 'Four Horsemen Shot', slug: 'four-horsemen-shot' },
        { label: 'Cement Mixer', slug: 'cement-mixer' },
        { label: 'Straight Whiskey Shot', slug: 'straight-whiskey-shot' },
        { label: 'Rumple Minze Shot', slug: 'rumple-minze-shot' },
        { label: '151 Rum Shot', slug: '151-rum-shot' },
      ],
      layeredShots: [
        { label: 'B-52', slug: 'b-52' },
        { label: 'Alien Brain Hemorrhage', slug: 'alien-brain-hemorrhage' },
        { label: 'Slippery Nipple', slug: 'slippery-nipple' },
        { label: 'Traffic Light Shot', slug: 'traffic-light-shot' },
      ],
      partyShots: [
        { label: 'Jello Shots', slug: 'jello-shots' },
        { label: 'Trash Can Shot', slug: 'trash-can' },
        { label: 'Blue Kamikaze Shot', slug: 'blue-kamikaze-shot' },
        { label: 'Fireball Shot', slug: 'fireball-shot' },
        { label: 'Pickleback Shot', slug: 'pickleback-shot' },
      ],
      vodkaShots: [
        { label: 'Lemon Drop', slug: 'lemon-drop' },
        { label: 'Kamikaze', slug: 'kamikaze-shot' },
        { label: 'Blue Kamikaze', slug: 'blue-kamikaze-shot' },
        { label: 'Pineapple Shot', slug: 'pineapple-shot' },
      ],
      tequilaShots: [
        { label: 'Tequila Slammer', slug: 'tequila-slammer' },
        { label: 'Mexican Candy Shot', slug: 'mexican-candy-shot' },
        { label: 'Straight Tequila Shot', slug: 'straight-tequila-shot' },
      ],
      whiskeyShots: [
        { label: 'Irish Car Bomb', slug: 'irish-car-bomb' },
        { label: 'Pickleback', slug: 'pickleback-shot' },
        { label: 'Fireball Shot', slug: 'fireball-shot' },
        { label: 'Washington Apple', slug: 'washington-apple' },
      ],
    };
  },
};
</script>

<style scoped>
ul {
  padding-left: 1.1rem;
}
</style>
