import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCoursesStore = defineStore("coursesStore", () => {
  const courses = ref([]);
  const categories = ref([]);
  const favoriteCourses = ref(
    JSON.parse(localStorage.getItem("favoriteCourses") || "[]")
  );

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

  const addToFavorite = (id) => {
    if (!favoriteCourses.value.includes(id)) favoriteCourses.value.push(id);
    updateLocalStorage();
  };

  const removeFromFavorite = (id) => {
    const index = favoriteCourses.value.findIndex((item) => item === id);
    if (index !== -1) {
      favoriteCourses.value.splice(index, 1);
      updateLocalStorage();
    }
  };

  const clearLocalStorage = () => {
    favoriteCourses.value.forEach(id => {
      if(!courses.value.find(course => course._id === id)) {
        favoriteCourses.value = favoriteCourses.value.filter(favoriteCourseId => favoriteCourseId !== id);
      }
    });
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem(
      "favoriteCourses",
      JSON.stringify(favoriteCourses.value)
    );
  };

  const isFavorite = (id) => {
    return favoriteCourses.value.includes(id);
  };

  const favoriteNumber = computed(() => {
    return favoriteCourses.value.length;
  });

  return {
    assetsUrl,
    courses,
    categories,
    courseCountByCategory,
    favoriteNumber,
    favoriteCourses,

    clearLocalStorage,
    isFavorite,
    getCourses,
    getCategories,
    addToFavorite,
    removeFromFavorite,
  };
});
