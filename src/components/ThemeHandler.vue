<template>
  <b-button @click="toggleTheme()" class="theme ml-5"
    >{{ theme == 'dark' ? 'Light Theme' : 'Dark Theme' }}
  </b-button>
</template>

<script>
export default {
  data() {
    return {
      theme: localStorage.getItem('theme'),
    };
  },
  mounted() {
    if (this.theme === 'dark') this.addDarkTheme();
  },
  methods: {
    addDarkTheme() {
      const darkThemeLinkEl = document.createElement('link');
      darkThemeLinkEl.setAttribute('rel', 'stylesheet');
      darkThemeLinkEl.setAttribute('href', '/assets/darktheme.css');
      darkThemeLinkEl.setAttribute('id', 'dark-theme-style');

      const docHead = document.querySelector('head');
      docHead.append(darkThemeLinkEl);
    },
    removeDarkTheme() {
      const darkThemeLinkEl = document.querySelector('#dark-theme-style');
      const parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    },
    toggleTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
        localStorage.setItem('theme', 'light');
        this.removeDarkTheme();
      } else {
        this.theme = 'dark';
        localStorage.setItem('theme', 'dark');
        this.addDarkTheme();
      }
    },
  },
};
</script>