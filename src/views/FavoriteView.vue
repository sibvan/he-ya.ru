<template>
  <ScrollToTopButton />
  <div v-if="favoriteNumber > 0 || favoriteNumberOnload > 0" class="courses-wrapper">
    <div class="courses-wrapper__title-block">
      <div>
        <h1 class="h1">{{ isLoading ? "Загрузка…" : hasError ? "Ошибка" : "Избранное" }}</h1>
        <p v-if="!isLoading && !hasError" class="courses-wrapper__subtitle">{{ favoriteNumber + " " +
          getWordForm(favoriteNumber, "курс") }}</p>
        <p class="courses-wrapper__subtitle" v-else>{{ isLoading ? "Пожалуйста, подождите" : "Перезагрузите страницу" }}
        </p>
        <BaseButton @click="loadData()" class="courses-wrapper__btn-reload" v-if="hasError"
          text="Перезагрузить страницу" />
      </div>
    </div>
    <main class="courses-list" v-if="!isLoading && !hasError">
      <CourseCard v-for="course in filteredCourses" :key="course._id" :course="course" :img="getLogoUrl(course)"
        :alt="course.title" @remove-from-favorite="coursesStore.removeFromFavorite(course._id)"
        @add-to-favorite="coursesStore.addToFavorite(course._id)" :isFavorite="coursesStore.isFavorite(course._id)" />
    </main>
    <main class="courses-list" v-else=>
      <div v-for="placeholder in 9" :key="placeholder" :class="[
        'course-card',
        'course-card_placeholder',
        {
          'course-card_loading': isLoading,
          'course-card_error': hasError
        }
      ]"></div>
    </main>
  </div>
  <div v-else class="not-found">
    <div class="not-found__wrapper">
      <FavoriteImg />
      <h1 class="h1 not-found__h1">Избранное</h1>
      <p class="not-found__description">Тут пока что пусто</p>
      <BaseButton class="not-found__btn" text="Перейти в каталог" to="/courses"></BaseButton>
    </div>
  </div>
</template>

<script setup>
import ScrollToTopButton from '../components/ui/ScrollToTopButton.vue';
import CourseCard from '../components/layout/CourseCard.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import FavoriteImg from '../components/illustrations/FavoriteImg.vue';
import { getLogoUrl } from '../utils';
import { useCoursesStore } from '../stores/useCoursesStore';
import { computed, ref, onMounted } from 'vue';
import { getWordForm } from '../utils';
import { storeToRefs } from 'pinia';

const coursesStore = useCoursesStore();
const { courses, favoriteNumber } = storeToRefs(coursesStore);
const { getCourses, clearLocalStorage } = coursesStore;


const isLoading = ref(false);
const hasError = ref(false);
const favoriteNumberOnload = favoriteNumber.value;

const loadData = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    await getCourses();
    clearLocalStorage();
  } catch {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}





onMounted(() => {
  loadData();

});

const favoriteCourses = [...coursesStore.favoriteCourses];

const filteredCourses = computed(() => {
  return courses.value.filter(course => favoriteCourses.includes(course._id));
});


</script>