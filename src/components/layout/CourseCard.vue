<template>
  <router-link :to="courseLink" class="course-card">
    <div class="course-card__top">
      <div class="course-card__header">
        <div class="course-card__img-container">
          <img class="course-card__img" :src="img" :alt="alt" />
        </div>

        <AddToFavoriteButton :isFavorite="isFavorite" :id="course._id"></AddToFavoriteButton>
      </div>
      <div>
        <h2 class="h2">{{ title }}</h2>
        <p class="course-card__description">{{ truncate(description) }}</p>
      </div>

    </div>
    <div class="course-card__btm">
      <div v-if="price !== 0" class="course-card__price-block">
        <p class="course-card__price-title">от {{ formatPrice(price) }} ₽</p>
        <p class="course-card__price-description">за {{ period }}</p>
      </div>
      <div v-else class="course-card__price-block">
        <p class="course-card__price-description">Бесплатный</p>
        <p class="course-card__price-description">{{ period }}</p>
      </div>
      <BaseButtonIcon class="button-icon_right" icon="right">Подробнее<br>о курсе</BaseButtonIcon>

    </div>
  </router-link>

</template>

<script setup>
import BaseButtonIcon from '../ui/BaseButtonIcon.vue';
import AddToFavoriteButton from '../ui/AddToFavoriteButton.vue';

const props = defineProps({
  course: {
    type: Object,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true,
  }
});

const { _id, title, description, slug: courseSlug, cost: { price, period }, school: { slug: schoolSlug } } = props.course;

const courseLink = "/courses/" + schoolSlug + "/" + courseSlug;

const truncate = (text) => text.length > 100 ? text.slice(0, 100).trim() + "…" : text;
const formatPrice = (price) => price.toLocaleString("ru-RU");


</script>
