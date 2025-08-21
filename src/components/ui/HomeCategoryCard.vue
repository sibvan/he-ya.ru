<template>

  <li @click="goToAllCourses" class="categories__card">
    <img class="categories__img" :src="img" :alt="title">
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
  img: {
    type: String,
    required: true
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