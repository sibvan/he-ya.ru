<template>
  <component :is="icons[props.name]" />
</template>

<script setup>
import { icons } from '../icons';

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});


</script>