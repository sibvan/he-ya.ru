<template>
  <router-link v-if="to" :to="to" class="button">{{ text }}</router-link>
  <a v-else-if="href" :href="href" class="button" target="_blank" rel="noopener noreferrer">{{ text }}</a>
  <a v-else class="button">{{ text }}</a>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: false
  },
  href: {
    type: String,
    required: false
  }
});


</script>