<template>
  <BaseButtonIcon @click.prevent="!isFavorite ? coursesStore.addToFavorite(id) : coursesStore.removeFromFavorite(id)"
    :icon="isFavorite ? 'redBookmark' : 'bookmark'">{{ !isFavorite ? "В избранное" : "" }}</BaseButtonIcon>
</template>

<script setup>
import BaseButtonIcon from './BaseButtonIcon.vue';
import { useCoursesStore } from '../../stores/useCoursesStore';

const coursesStore = useCoursesStore();

const props = defineProps({
  isFavorite: {
    type: Boolean,
    requireq: true
  },
  id: {
    type: String,
    requireq: true
  }
})
</script>