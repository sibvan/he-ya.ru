import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CourseListView from "../views/CourseListView.vue";
import CourseView from "../views/CourseView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { nextTick } from "vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    meta: { title: "Каталог курсов английского языка Heya!" },
  },
  {
    path: "/courses",
    component: CourseListView,
    meta: { title: "Все курсы Heya!" },
    name: "courses",
  },
  {
    path: "/courses/:id",
    component: CourseView,
    name: "course",
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
    meta: { title: "Ошибка 404. Страница не найдена" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "menu__item_active",
  scrollBehavior(to, from, savedPosition) {
    if (to.name === "courses" && from.name === "course") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        });
      });
    } else {
      return {
        top: 0,
      };
    }
  },
});

router.beforeEach((to) => {
  const defaultTitle = "Heya!";
  document.title = to.meta.title || defaultTitle;

  return true;
});
