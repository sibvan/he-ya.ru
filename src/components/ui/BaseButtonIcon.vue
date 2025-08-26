<template>
  <a class="button-icon">
    <img v-if="logo" :src="props.logo" :alt="props.logoAlt">
    <Icon v-else-if="icon" :name="props.icon"  />
    <span>
      <slot />
    </span>
  </a>
</template>

<script setup>

import { icons } from '../icons';
import { computed } from 'vue';
import Icon from "../ui/Icon.vue"


const props = defineProps({
  icon: {
    type: String,
    required: false
  },
  logo: {
    type: String,
    required: false
  },
  logoAlt: {
    type: String,
    required: false
  }
});






</script>