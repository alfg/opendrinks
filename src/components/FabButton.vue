<template>
  <div class="fab-wrapper" @click="scrollTop">
    <a href="#" class="fab-button">
      <p>TOP</p>
    </a>
  </div>
</template>

<script>
export default {
  name: 'FabButton',
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
/*FAB Styles*/
.fab-wrapper {
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 5;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
}
.fab-button {
  width: 70px;
  height: 70px;
  background: var(--main-link-color) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  outline: none;
}
.fab-button:hover {
  text-decoration: none;
}

.fab-button p {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}
</style>
