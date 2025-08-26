<template>

  <li @click="goToAllCourses" class="categories__card">
    <img v-if="img" class="categories__img" :src="img" :alt="title">
    <component class="categories__img" v-else-if="svg" :is="svg" />
    <div class="categories__text">
      <p class="categories__title">{{ title }}</p>
      <p class="categories__description">{{ number }}</p>
    </div>
  </li>


</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  svg: {
    type: Object,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: Object,
    required: false
  },
  number: {
    type: String,
    required: true
  }
});


const goToAllCourses = () => router.push(props.link);



</script>