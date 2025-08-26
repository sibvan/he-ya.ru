<template>
  <div class="checkbox">
    <div class="checkbox__container">
      <input v-model="model" class="checkbox__indicator" type="checkbox" :id="id" :value="value" />
      <Icon class="test" v-if="model.includes(value)" name="checkbox" />
    </div>

    <label class="checkbox__text" :for="id">{{ text }}<span v-if="number" class="checkbox__text_number">&nbsp;&nbsp;{{
      number }}</span></label>
  </div>
</template>

<script setup>

import Icon from "../ui/Icon.vue"
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
  number: {
    type: Number,
    required: false
  },
});



</script>