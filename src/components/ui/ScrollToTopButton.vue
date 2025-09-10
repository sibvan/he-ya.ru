<template>
  <button :class="showBtnTopClass" class="btn-top" @click="scrollToTop">
    <Icon name="top" />
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import Icon from "../ui/Icon.vue";


const showBtnTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const { y: windowScrollY } = useWindowScroll();

  const showBtnTopClass = computed(() => ({
    'btn-top_show': windowScrollY.value > 100,
    'btn-top_hide': windowScrollY.value === 0
  }));

</script>