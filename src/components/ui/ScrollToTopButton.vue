<template>
  <button v-if="showBtnTop" class="btn-top" @click="scrollToTop">
    <Icon name="top" />
  </button>
</template>

<script setup>
import { ref, watch } from 'vue';
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
watch(windowScrollY, () => showBtnTop.value = windowScrollY.value > 0 ? true : false);
</script>