import { ref, onMounted, onUnmounted, computed } from 'vue';

export default () => {
  const windowWidth = ref(null);

  const handleResize = newWidth => {
    windowWidth.value = newWidth;
  };

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return computed(() => windowWidth.value !== null && windowWidth.value < 576);
};
