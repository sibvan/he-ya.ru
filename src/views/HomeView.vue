<template>

  <div class="home-wrapper">
    <main class="home-main">
      <h1 class="h1 h1_home">
        <p class="h1_color-stone">Каталог курсов</p>
        <p>английского языка</p>
      </h1>
      <ul v-if="!isLoading && !hasError" class="categories">
        <HomeCategoryCard v-for="category in categories"
          :number="courseCountByCategory[category.value] + ' ' + getWordForm(courseCountByCategory[category.value], 'курс')"
          :key="category._id" :img="assetsUrl + category.image.path" :title="category.title"
          :link="{ path: '/courses', query: { categories: category.value } }" />
      </ul>
      <ul class="categories categories_center" v-else-if="!hasError">
        <HomeCategoryCard class="categories__card_loading" :svg="LoadingImg" title="Загрузка…"
          number="Пожалуйста, подождите" />
      </ul>
      <ul class="categories categories_center" v-else>
        <HomeCategoryCard :svg="BugImg" class="categories__card_error" title="Ошибка"
          number="Перезагрузите страницу" />
      </ul>
    </main>

    <footer class="footer">

      <BaseButton v-if="!isLoading && !hasError" to="/courses" text="Все курсы" />
      <BaseButton v-else-if="hasError" text="Перезагрузить страницу" @click="loadData()" />
      <p class="footer__text">Created by <a class="footer__link" target="_blank"
          href="https://sibvan.dev">sibvan.dev</a></p>
    </footer>
  </div>

</template>

<script setup>
import BaseButton from '../components/ui/BaseButton.vue';
import HomeCategoryCard from '../components/ui/HomeCategoryCard.vue';
import LoadingImg from "../components/illustrations/LoadingImg.vue"
import BugImg from "../components/illustrations/BugImg.vue";

import { useCoursesStore } from '../stores/useCoursesStore';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { getWordForm } from "../utils";

const coursesStore = useCoursesStore();
const { categories, courseCountByCategory } = storeToRefs(coursesStore);
const { getCategories, getCourses, assetsUrl } = coursesStore;



const isLoading = ref(true);
const hasError = ref(false);


const loadData = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    await getCategories();
    await getCourses();
  } catch {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}


onMounted(() => {
  loadData();

});


</script>