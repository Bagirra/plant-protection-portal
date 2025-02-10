const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Обработчик клика по гамбургер-меню
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Добавляем/убираем класс active
    menuToggle.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX; // Начало свайпа
});

document.addEventListener("touchend", function (event) {
    endX = event.changedTouches[0].clientX; // Конец свайпа

    let swipeDistance = endX - startX;
    let swipeThreshold = 50; // Минимальная длина свайпа

    if (swipeDistance > swipeThreshold) {
        // Свайп вправо → Назад
        goToPrevPage();
    } else if (swipeDistance < -swipeThreshold) {
        // Свайп влево → Вперёд
        goToNextPage();
    }
});

function goToPrevPage() {
    let pages = ["index.html", "news.html", "pests.html", "meteo.html"];
    let currentPage = window.location.pathname.split("/").pop();
    let currentIndex = pages.indexOf(currentPage);

    if (currentIndex > 0) {
        window.location.href = pages[currentIndex - 1];
    }
}

function goToNextPage() {
    let pages = ["index.html", "news.html", "pests.html", "meteo.html"];
    let currentPage = window.location.pathname.split("/").pop();
    let currentIndex = pages.indexOf(currentPage);

    if (currentIndex < pages.length - 1) {
        window.location.href = pages[currentIndex + 1];
    }
}
});