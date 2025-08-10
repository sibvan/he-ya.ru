<template>
  <a class="button-icon">
    <img :src="src" :alt="alt">
    <span>
      <slot />
    </span>
  </a>
</template>

<script setup>

import { icons } from '../../assets/icons';
import { computed } from 'vue';


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


const src = computed(() => icons[props.icon] || props.logo);
const alt = computed(() => props.icon || props.logoAlt);



</script>