<template>
  <div class="container">
    <TheHeader :homeView="isHomeView" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import TheHeader from './components/layout/TheHeader.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isHomeView = computed(() => route.path === "/");

</script>