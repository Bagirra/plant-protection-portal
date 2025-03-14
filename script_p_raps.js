
document.addEventListener('DOMContentLoaded', () => {
    const decades = document.querySelectorAll('.decade');
    const tooltip = document.getElementById('tooltip');
    let tooltipVisible = false;

    // Массив рекомендаций
    const recommendations = {
        "Март-1": "Рекомендовано внесение азотных удобрений",
        "Март-2": "1)Отмечен массовый выход стеблевых долгоносиков, проведите обработку одним из <a href='https://www.pesticide.md/registru-cautare/?name_registr=0&name_reg=0&t=0&c=10608&comp=0&par=24537&search=C%C4%83utare'> системных инсектицидов</a>. 2) На полях, где культура возвращена раньше 4 лет, для защиты от болезней используйте один из <a href='https://www.pesticide.md/registru-cautare/?name_registr=0&name_reg=tebuconazol&t=0&c=10608&comp=0&par=0&search=C%C4%83utare'>фунгицидов</a>. 3)После обработки проверяйте ловушки во второй половине дня до начала цветения на выявление семенного скрытнохоботника. При выявлении более 10 долгоносиков в одной ловушке за 3 дня, в период бутонизации надо будет провести обработку против семенного долгоносика.",
        "Апрель-2": "",
        "Апрель-3": "",
        "Ноябрь-3": "<a href=''>Подробнее</a> <a href=''>Подробнее</a>",
        "Декабрь-3": "<a href=''>Подробнее</a> <a href=''>Подробнее</a>",
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

            // Добавекорневую подкормку ляем рекомендацию в атрибут data-tooltip
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
