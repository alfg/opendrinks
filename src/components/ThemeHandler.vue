<template>
  <div>
    <input id="theme-toggle" v-model="darkCheckBox" @input="checkboxHandler" type="checkbox" />
    <label for="theme-toggle"><span></span></label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: localStorage.getItem('theme') || 'light',
      darkCheckBox: false,
    };
  },
  mounted() {
    this.setTheme(this.theme);
    this.darkCheckBox = this.theme === 'dark';
  },
  methods: {
    checkboxHandler() {
      if (this.darkCheckBox) {
        this.setTheme('light');
      } else {
        this.setTheme('dark');
      }
    },
    setTheme(theme) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    },
    toggleTheme() {
      switch (this.theme) {
        case 'dark':
          this.theme = 'light';
          break;
        case 'light':
          this.theme = 'dark';
          break;
        default:
          break;
      }
      this.setTheme(this.theme);
    },
  },
};
</script>
