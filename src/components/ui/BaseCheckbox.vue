<template>
  <div class="checkbox">
    <input v-model="model" class="checkbox__indicator" type="checkbox" :id="id" :value="value">
    <label class="checkbox__text" :for="id">{{ text }}</label>
  </div>
</template>

<script setup>
const model = defineModel();


const props = defineProps({
  text: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
});



</script>