export const getWordForm = (number, word) => {
  const words = {
    месяц: ["месяц", "месяца", "месяцев"],
    урок: ["урок", "урока", "уроков"],
    курс: ["курс", "курса", "курсов"],
    год: ["год", "года", "лет"],
    материал: ["материал", "материала", "материалов"],
  };

  if (!words[word]) return "";

  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return words[word][2];
  } else if (lastDigit === 1) {
    return words[word][0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return words[word][1];
  } else {
    return words[word][2];
  }
};
