import App from './App.vue';

import "reset-css";
import "./assets/styles/main.css";

import { createApp } from 'vue';
import { router } from "./router";
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
