<template>
  <div v-if="isReady" class="course-wrapper">
    <main class="course" :style="bgColor">

      <div class="course__top">
        <div class="course__tags">
          <BaseButtonIcon class="button-icon_back" icon="back" @click="router.go(-1)">Назад</BaseButtonIcon>
          <div class="course__tags">
            <BaseButtonIcon :logoAlt="course.school.title" class="course__school" :logo="getLogoUrl(course)">{{
              course.school.title }}</BaseButtonIcon>
            <BaseButtonIcon v-if="false" icon="bookmark">В избранное</BaseButtonIcon>
          </div>

        </div>
        <div>
          <h1 class="h1">{{ course.title }}</h1>
          <p class="course__description"> {{ course.description }}</p>
        </div>
      </div>
      <div class="course__btm">
        <div v-if="course.cost.price !== 0" class="course__cost">
          <p class="course__price"><span class="course__price_from">от</span> {{
            formatPrice(course.cost.price) }}</p>
          <p class="course__period">рублей<br>за {{ course.cost.period }}</p>
        </div>
        <div v-else class="course__cost">
          <p class="course__price">Бесплатно</p>
        </div>
        <BaseButton text="Подробнее на сайте школы" :href="course.link" />
      </div>

    </main>
    <aside class="course-aside">
      <div class="rating">
        <p class="rating__grade">{{ formatPrice(course.school.rating.grade) }}</p>
        <div class="rating__stars">
          <img v-for="n in 5" :key="n" :src="getStarIcon(n, course.school.rating.grade)" alt="Звезда рейтинга">
        </div>
        <p class="rating__source">Рейтинг на сайте {{ course.school.rating.source }}</p>
      </div>
      <div class="features">
        <ul class="features__item">
          <li class="features__feature">
            <p class="features__title">Категория</p>
            <p class="features__description">{{ course.category.title }}</p>
          </li>
        </ul>
        <ul class="features__item">
          <li v-if="course.teacher" class="features__feature">
            <p class="features__title">Преподаватель</p>
            <p class="features__description">Носитель языка</p>
          </li>
          <li class="features__feature">
            <p class="features__title">Формат</p>
            <p class="features__description">{{ getFeatures(course.format)
            }}</p>
          </li>
        </ul>
        <ul class="features__item">
          <li class="features__feature">
            <p class="features__title">Возраст</p>
            <p class="features__description">{{ getFeatures(course.age) }}</p>
          </li>
          <li v-if="course.exam" class="features__feature">
            <p class="features__title">Экзамен</p>
            <p class="features__description">{{ getFeatures(course.exam) }}</p>
          </li>
          <li v-if="course.profession" class="features__feature">
            <p class="features__title">Профессия</p>
            <p class="features__description">{{
              getFeatures(course.profession)
            }} </p>
          </li>
        </ul>
        <ul v-if="course.payment" class="features__item">
          <li class="features__feature">
            <p class="features__title">Возможности оплаты</p>
            <p class="features__description">{{ course.payment }}</p>
          </li>
        </ul>
      </div>
    </aside>
  </div>
  <div v-else-if="isLoading || hasError" class="course-wrapper">
    <main :class="['course', { 'course_loading': isLoading, 'course_error': hasError }]">

      <div class="course__top">
        <div class="course__tags">
          <BaseButtonIcon class="button-icon_back" icon="back" @click="router.go(-1)">Назад</BaseButtonIcon>
        </div>
        <div>
          <h1 class="h1">{{ isLoading ? "Загрузка…" : "Ошибка" }}</h1>
          <p class="course__description">{{ isLoading ? "Пожалуйста, подождите" : "Перезагрузите страницу" }}</p>
        </div>
      </div>


    </main>
    <aside :class="['course-aside', { 'course_loading': isLoading, 'course_error': hasError }]"></aside>
  </div>

</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useCoursesStore } from "../stores/useCoursesStore";
import { useRoute, useRouter } from 'vue-router';
import { icons } from '../assets/icons';

import BaseButton from "../components/ui/BaseButton.vue";
import BaseButtonIcon from "../components/ui/BaseButtonIcon.vue";

const route = useRoute();
const router = useRouter();

const coursesStore = useCoursesStore();
const { assetsUrl } = coursesStore;

const isLoading = ref(true);
const hasError = ref(false);



const getFeatures = (value) => {
  let res = "";
  if (Array.isArray(value)) {
    res = value.join(", ");
  } else {
    res = value;
  }
  return makeFirstLetterCapital(res);
}

const getLogoUrl = (course) => {
  return assetsUrl + (course.school.logo?.path || "");
}

const makeFirstLetterCapital = (str) => {
  return str[0].toUpperCase() + str.slice(1);
}

const formatPrice = (price) => price.toLocaleString("ru-RU");

const getStarIcon = (order, grade) => {

  const ratingEmpty = icons.emptyRating;
  const ratingHalf = icons.halfRating;
  const ratingFull = icons.fullRating;


  if (grade <= order - 1) return ratingEmpty;
  else if (grade < order) return ratingHalf;
  else if (grade >= order) return ratingFull;

}



onMounted(async () => {
  try {
    await coursesStore.getCourses();
    await coursesStore.getCategories();
    if (course.value) {
      document.title = course.value.title + " — Heya!";
    } else {
      router.push({
        name: "404", params: { pathMatch: '404' }
      });
    }
  } catch {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }

});

const isReady = computed(() => !isLoading.value && !hasError.value);

const bgColor = computed(() => {
  const colors = course.value.school.logo.colors;
  if (colors) {
    const randomColor = Math.floor(Math.random() * colors.length);
    return {
      backgroundColor: `color-mix(in oklab, ${colors[randomColor]} 10%, var(--color-white))`
    }
  }
});



const course = computed(() => coursesStore.courses.find(course => course.school.slug === route.params.school && course.slug === route.params.course));







</script>