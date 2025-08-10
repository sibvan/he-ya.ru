<template>

  <div class="courses-wrapper">
    <div class="courses-wrapper__title-block">
      <div>
        <h1 class="h1">{{ titleText }}</h1>
        <p v-if="isLoadingOrError" class="courses-wrapper__subtitle">{{ subtitleText }}</p>
      </div>

      <button v-if="isReady" class="btn-filter" @click="toggleFilters">
        <img class="btn-filter__icon" :src="icons.filter" alt="Фильтр">
      </button>
    </div>
    <aside v-if="isReady" :class="['filters', { filters_hidden: !areFiltersVisible }]">
      <img @click="toggleFilters" :src="icons.close" class="filters__btn-close" alt="Закрыть">
      <h1 class="h1 filters_h1">Фильтры</h1>
      <div>
        <p class="filters__title">Категория</p>
        <div class="filters__options">
          <BaseCheckbox v-model="selectedCategories" v-for="category in categories" :key="category._id"
            :text="category.title" :id="category._id" :value="category.value" />
        </div>

      </div>

    </aside>
    <main class="courses-list">
      <template v-if="isLoadingOrError">
        <div v-for="placeholder in 9" :key="placeholder" :class="[
          'course-card',
          'course-card_placeholder',
          {
            'course-card_loading': isLoading,
            'course-card_error': hasError
          }
        ]"></div>
      </template>

      <template v-else>
        <CourseCard v-for="course in filteredCourses" :key="course._id" :course="course" :img="getLogoUrl(course)"
          :alt="course.title" :id="'course-' + course._id" />
      </template>

    </main>
  </div>
</template>
<script setup>
import CourseCard from '../components/layout/CourseCard.vue';
import BaseCheckbox from '../components/ui/BaseCheckbox.vue';

import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia';
import { useCoursesStore } from '../stores/useCoursesStore';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { icons } from '../assets/icons';


onMounted(async () => {
  try {
    await getCourses();
    await getCategories();
    if (route.query.categories) {
      selectedCategories.value = route.query.categories.split(",");
    }
  } catch (e) {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
});


const coursesStore = useCoursesStore();
const { getCategories, getCourses, assetsUrl } = coursesStore;
const { courses, categories } = storeToRefs(coursesStore);

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const hasError = ref(false);
const areFiltersVisible = ref(false);
const selectedCategories = ref([]);

const toggleFilters = () => {
  areFiltersVisible.value = !areFiltersVisible.value;
}

const changeUrl = () => {
  if (selectedCategories.value.length === 0) {
    router.push({ path: route.path });
  } else {
    router.push({ path: route.path, query: { categories: selectedCategories.value.join(',') } });
  }
}

const getLogoUrl = (course) => {
  return assetsUrl + (course.school.logo?.path || "");
}


const { width: winWidth } = useWindowSize();

watch(winWidth, () => {
  if (winWidth.value > 896) {
    areFiltersVisible.value = false;
  }
});


watch(selectedCategories, () => changeUrl());


const filteredCourses = computed(() => {
  if (selectedCategories.value.length === 0) {
    return courses.value;
  } else {
    return courses.value.filter(course => selectedCategories.value.includes(course.category.value));
  }
});

const isLoadingOrError = computed(() => isLoading.value || hasError.value);
const isReady = computed(() => !isLoading.value && !hasError.value);

const titleText = computed(() => {
  if (isLoading.value) return "Загрузка…";
  else if (hasError.value) return "Ошибка";
  else return "Все курсы"
});

const subtitleText = computed(() => {
  if (isLoading.value) return "Пожалуйста, подождите";
  else if (hasError.value) return "Перезагрузите страницу";
  else return null;
});




</script>