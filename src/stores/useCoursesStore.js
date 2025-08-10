import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCoursesStore = defineStore("coursesStore", () => {
  const courses = ref([]);
  const categories = ref([]);

  const assetsUrl = "https://s1112388.smrtp.ru/heya/storage/uploads";

  async function getData(type, sort) {
    const params = new URLSearchParams({ populate: "1" });
    if (sort) params.set("sort", JSON.stringify(sort));

    const url = `https://s1112388.smrtp.ru/heya/api/content/items/${type}?${params}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-key": import.meta.env.VITE_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return response.json();
  }

  const courseCountByCategory = computed(() => {
    const object = {};
    categories.value.forEach((category) => {
      object[category.value] = courses.value.filter(
        (course) => course.category.value === category.value
      ).length;
    });
    return object;
  });

  const getCourses = async () => {
    if (courses.value.length === 0) {
      const sort = { _modified: -1 };
      courses.value = await getData("courses", sort);
    }
  };

  const getCategories = async () => {
    if (categories.value.length === 0) {
      categories.value = await getData("categories");
    }
  };

  return {
    assetsUrl,
    courses,
    categories,
    courseCountByCategory,

    getCourses,
    getCategories,
  };
});
