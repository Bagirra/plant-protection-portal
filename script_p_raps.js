
document.addEventListener('DOMContentLoaded', () => {
    const decades = document.querySelectorAll('.decade');
    const tooltip = document.getElementById('tooltip');
    let tooltipVisible = false;

    // Массив рекомендаций
    const recommendations = {
        "Март-2": "Установите  по краям поля 2-4 ловушки на высоте растений, заполните 1 л воды с каплей моющего средства. Проверяйте ежедневно во второй половине дня. При выявлении  более 10 долгоносиков в одной ловушке за 3 дня следует провести обработку",
        "Апрель-2": "",
        "Апрель-3": "",
        "Ноябрь-3": " <a href='https://fenix-agro.md/5a9829e53c7b7d0001a3fa3b/5a9c139d2c064e00011cd88f_%D0%A1%D1%83%D0%BB%D1%8C%D1%84%D0%BE%D0%B0%D0%BC%D0%BC%D0%BE%D1%84%D0%BE%D1%81.pdf'>Подробнее</a>  <a href='https://fenix-agro.md/5a9829e53c7b7d0001a3fa3b/5a9c13eca5e9fa00010bf865_%D0%90%D0%BC%D0%BC%D0%BE%D1%84%D0%BE%D1%81.pdf'>Подробнее</a> ",
        "Декабрь-3": " <a href='https://fenix-agro.md/5a9829e53c7b7d0001a3fa3b/5a9c139d2c064e00011cd88f_%D0%A1%D1%83%D0%BB%D1%8C%D1%84%D0%BE%D0%B0%D0%BC%D0%BC%D0%BE%D1%84%D0%BE%D1%81.pdf'>Подробнее</a>  <a href='https://fenix-agro.md/5a9829e53c7b7d0001a3fa3b/5a9c13eca5e9fa00010bf865_%D0%90%D0%BC%D0%BC%D0%BE%D1%84%D0%BE%D1%81.pdf'>Подробнее</a> ",
    };

    // Получение текущей даты
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonthIndex = today.getMonth(); // 0 = Январь, ..., 11 = Декабрь
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const currentMonth = months[currentMonthIndex];
    const currentDecade = Math.ceil(currentDay / 10); // Определяем декаду

    // Обновление состояния декад
    decades.forEach(decade => {
        const decadeMonth = decade.getAttribute('data-month');
        const decadeNumber = parseInt(decade.getAttribute('data-decade'), 10);

        // Проверяем, если текущая декада
        if (decadeMonth === currentMonth && decadeNumber === currentDecade) {
            decade.classList.add('current-decade'); // Зеленый фон для текущей декады

            // Добавляем класс для мигания красным
            decade.classList.add('blinking');

            // Добавляем рекомендацию в атрибут data-tooltip
            const recommendationKey = `${decadeMonth}-${decadeNumber}`;
            if (recommendations[recommendationKey]) {
                decade.setAttribute('data-tooltip', recommendations[recommendationKey]);
            }
        }
    });

    // Функция отображения подсказки
    function showTooltip(event, element) {
        const tooltipText = element.getAttribute('data-tooltip');
        const month = element.getAttribute('data-month');
        const decadeNumber = element.getAttribute('data-decade');

        // Если подсказка для текущей декады
        if (tooltipText) {
            tooltip.innerHTML = tooltipText; // Показываем текст подсказки
        } else {
            tooltip.innerHTML = `${month}, Декада ${decadeNumber}`; // Показываем только месяц и номер декады
        }

        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltipVisible = true;
    }

    // Функция скрытия подсказки
    function hideTooltip(event) {
        if (!tooltip.contains(event.relatedTarget)) {
            tooltip.style.display = 'none';
            tooltipVisible = false;
        }
    }

    // Обработчики событий для декад
    decades.forEach(decade => {
        decade.addEventListener('mouseover', (event) => showTooltip(event, event.target));
        decade.addEventListener('mouseout', hideTooltip);

        // Обработка клика по декаде
        decade.addEventListener('click', (event) => {
            const element = event.target;

            // Убираем мигание с декады после клика
            element.classList.remove('blinking');

            // Оставляем зеленый цвет для текущей декады
            element.classList.add('current-decade');

            // Отображаем уведомление
            showTooltip(event, element);
        });
    });

    // Подсказка остаётся видимой, если курсор над ней
    tooltip.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
        tooltipVisible = true;
    });

    // Скрытие подсказки при уходе курсора за её пределы
    tooltip.addEventListener('mouseout', hideTooltip);
});


// Навигация для выбора культуры
function navigateToPlan(crop) {
    if (crop === "grape") {
        window.location.href = "plan.html";
    } else if (crop === "raps") {
        window.location.href = "raps_plan.html";    
    } else if (crop === "wheat") {
        window.location.href = "wheat_plan.html";
    } else if (crop === "corn") {
        window.location.href = "corn_plan.html";
    }
}

// Инициализация данных при загрузке страницы Plan
window.onload = async function() {
    try {
        // Получаем и обновляем текущие данные о погоде
        const currentWeather = await fetchCurrentWeather();
        updateCurrentWeather(currentWeather);

        // Получаем и обновляем прогноз погоды
        const weatherForecast = await fetchWeatherForecast();
        updateWeatherForecast(weatherForecast);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
};


function togglePlan(planId) {
    const planContent = document.getElementById(planId);
    if (planContent.style.display === "none" || planContent.style.display === "") {
        planContent.style.display = "block";
    } else {
        planContent.style.display = "none";
    }
}

function showDetails(detailId) {
    const detailContent = document.getElementById(detailId);
    if (detailContent.classList.contains("hidden")) {
        detailContent.classList.remove("hidden");
    } else {
        detailContent.classList.add("hidden");
    }
}
