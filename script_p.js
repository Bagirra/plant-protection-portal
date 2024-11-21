
const decades = document.querySelectorAll('.decade');
const tooltip = document.getElementById('tooltip');

decades.forEach(decade => {
    decade.addEventListener('mouseover', (event) => {
        const month = event.target.getAttribute('data-month');
        const decadeNumber = event.target.getAttribute('data-decade');
        tooltip.textContent = `${month}, Декада ${decadeNumber}`;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    });

    decade.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    decade.addEventListener('click', () => {
        alert(`Вы выбрали: ${month}, Декада ${decadeNumber}`);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const decades = document.querySelectorAll('.decade');
    const tooltip = document.getElementById('tooltip');

    // Массив рекомендаций
    const recommendations = {
        "Апрель-1": "Рекомендуется обработка против клещей и сорняков.",
        "Апрель-2": "Проведите обработку от мильдью.",
        "Апрель-3": "Подготовьте виноград к цветению.",
        "Ноябрь-3": "Внесите универсальное удобрение.",
        // Добавьте рекомендации для всех декад
    };

    // Получение текущей даты
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonthIndex = today.getMonth(); // 0 = Январь, ..., 11 = Декабрь
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const currentMonth = months[currentMonthIndex];
    const currentDecade = Math.ceil(currentDay / 10); // Определяем декаду

    // Поиск и выделение текущей декады
    decades.forEach(decade => {
        const decadeMonth = decade.getAttribute('data-month');
        const decadeNumber = parseInt(decade.getAttribute('data-decade'), 10);

        if (decadeMonth === currentMonth && decadeNumber === currentDecade) {
            decade.classList.add('current-decade'); // Выделение текущей декады

            // Добавление рекомендации для текущей декады
            const recommendationKey = `${decadeMonth}-${decadeNumber}`;
            if (recommendations[recommendationKey]) {
                decade.setAttribute('data-tooltip', recommendations[recommendationKey]);
            }
        }
    });

    // Обработчики событий
    decades.forEach(decade => {
        decade.addEventListener('mouseover', (event) => {
            const tooltipText = event.target.getAttribute('data-tooltip');
            if (tooltipText) { // Показывать только если есть рекомендация
                tooltip.textContent = tooltipText;
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            }
        });

        decade.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
    });
});

// Навигация для выбора культуры
function navigateToPlan(crop) {
    if (crop === "grape") {
        window.location.href = "plan.html";
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
