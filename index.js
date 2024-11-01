document.addEventListener("DOMContentLoaded", function () {
  // Функція, яка встановлює src зображення та додає клас "loaded"

  function loadImage(img) {
    img.src = img.getAttribute("data-src");
    img.onload = () => img.classList.add("loaded");
    img.removeAttribute("data-src");
  }

  // Налаштовуємо IntersectionObserver для лінійного завантаження
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px", threshold: 0.1 }
  );

  // Спостерігаємо кожне зображення з атрибутом data-src
  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => observer.observe(img));

  // Завантаження зображень за натисканням кнопки
  document.getElementById("load-images").addEventListener("click", function () {
    images.forEach((img) => {
      if (img.hasAttribute("data-src")) {
        loadImage(img);
      }
    });
  });
});
