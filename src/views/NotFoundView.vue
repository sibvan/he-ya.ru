<template>
  <div class="not-found">
    <div class="not-found__wrapper">
      <img src="/404.svg" class="not-found__img" alt="404">
      <h1 class="h1 not-found__h1">Ошибка 404</h1>
      <p class="not-found__description">Страница не найдена</p>
      <BaseButton class="not-found__btn" text="Вернуться на главную" to="/"></BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "../components/ui/BaseButton.vue";
</script>