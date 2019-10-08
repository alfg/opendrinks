<template>
  <svg
    @click="$emit('favorite')"
    id="star"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    width="28px"
    height="28px"
    viewBox="0 0 24 24"
    enable-background="new 0 0 24 24"
    xml:space="preserve"
  >
    <g id="Bounding_Boxes">
      <path fill="none" d="M0,0h24v24H0V0z" />
      <path fill="none" d="M0,0h24v24H0V0z" />
    </g>
    <g id="Outline_1_" fill="white" stroke="black">
      <path
        :class="{ favorited: isFavorited }"
        d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,
        2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    isFavorited: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
svg {
  transition: 0.2s;
}

svg:hover {
  transition: 0.2s;
  transform: scale(1.2);
  cursor: pointer;
}

.favorited {
  fill: hsl(56, 74%, 52%);
  stroke: hsl(56, 74%, 52%);
}
</style>
