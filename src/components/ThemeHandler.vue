<template>
  <b-button @click="toggleTheme()" class="theme ml-5 text-capitalize"
      >{{theme}} Theme
  </b-button>
</template>

<script>
export default {
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
    };
  },
  mounted() {
    this.setTheme(this.theme);
  },
  methods: {
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme)
    },
    toggleTheme() {
      switch(this.theme){
        case 'dark':
          this.theme = 'light';
          localStorage.setItem('theme', 'light');
          break;
        case 'light':
          this.theme = 'dark';
          localStorage.setItem('theme', 'dark');
          break;
        default:
          break;
      }
      this.setTheme(this.theme) 
    },
  },
};
</script>