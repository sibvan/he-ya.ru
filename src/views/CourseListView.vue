<template>
  <button v-if="showBtnTop" class="btn-top" @click="scrollToTop">
    <img class="btn-top__icon" :src="icons.top" alt="">
  </button>
  <div class="courses-wrapper">
    <div class="courses-wrapper__title-block">
      <div>
        <h1 class="h1">{{ titleText }}</h1>
        <p v-if="isLoadingOrError" class="courses-wrapper__subtitle">{{ subtitleText }}</p>
        <BaseButton @click="loadData()" class="courses-wrapper__btn-reload" v-if="hasError" text="Перезагрузить страницу" />
      </div>

      <button v-if="isReady" :class="['btn-filter', { 'btn-filter_active': areFiltersActive }]" @click="toggleFilters">
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
            :text="category.title" :number="courseCountByCategory[category.value]" :id="category._id"
            :value="category.value" />
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
          :alt="course.title" />
      </template>

    </main>
  </div>
</template>
<script setup>
import CourseCard from '../components/layout/CourseCard.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import BaseCheckbox from '../components/ui/BaseCheckbox.vue';

import { useWindowSize, useWindowScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia';
import { useCoursesStore } from '../stores/useCoursesStore';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { icons } from '../assets/icons';
import { getLogoUrl } from '../utils';


const loadData = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    await getCourses();
    await getCategories();
    if (route.query.categories) {
      selectedCategories.value = route.query.categories.split(",");
      areFiltersActive.value = true;
    }
  } catch (e) {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}


onMounted(() => {
  loadData();
});


const coursesStore = useCoursesStore();
const { getCategories, getCourses, assetsUrl } = coursesStore;
const { courses, categories, courseCountByCategory } = storeToRefs(coursesStore);

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const hasError = ref(false);
const areFiltersVisible = ref(false);
const selectedCategories = ref([]);
const areFiltersActive = ref(null);
const showBtnTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const toggleFilters = () => {
  areFiltersVisible.value = !areFiltersVisible.value;
}

const changeUrl = () => {
  if (selectedCategories.value.length === 0) {
    router.push({ path: route.path });
    areFiltersActive.value = false;
  } else {
    router.push({ path: route.path, query: { categories: selectedCategories.value.join(',') } });
    areFiltersActive.value = true;
  }
}



const { width: winWidth } = useWindowSize();
const { y: windowScrollY } = useWindowScroll();

watch(winWidth, () => {
  if (winWidth.value > 896) {
    areFiltersVisible.value = false;
  }
});

watch(windowScrollY, () => showBtnTop.value = windowScrollY.value > 0 ? true : false);


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