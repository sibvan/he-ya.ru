<template>
  <header :class="['header', headerClass]">
    <div @click="goHome" :class="['logo', logoClass]">
      <p :class="['logo__title', titleClass]">Heya<span class="logo__title_italic">!</span></p>
      <p :class="['logo__subtitle', subtitleClass]">Курсы <br v-if="!homeView">английского</p>
    </div>
    <nav>
      <ul class="menu" v-if="!homeView">
        <li><router-link to="/courses" class="menu__item">Все курсы<Icon name="triangle" /></router-link></li>
        <li><router-link to="/favorite" class="menu__item">Избранное<Icon name="triangle" /></router-link></li>
      </ul>
    </nav>

  </header>

</template>

<script setup>
import { computed } from 'vue';
import BaseButtonIcon from '../ui/BaseButtonIcon.vue';
import { useRouter } from 'vue-router';
import Icon from '../ui/Icon.vue';


const props = defineProps({
  homeView: {
    type: Boolean,
    required: true
  }
});

const headerClass = computed(() => props.homeView ? 'header_home' : 'header_round');
const logoClass = computed(() => props.homeView ? 'logo_home' : '');
const titleClass = computed(() => props.homeView ? 'logo__title_home' : '');
const subtitleClass = computed(() => props.homeView ? 'logo__subtitle_home' : '');


const router = useRouter();

const goHome = () => router.push("/");



</script>