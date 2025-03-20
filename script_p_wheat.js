
document.addEventListener('DOMContentLoaded', () => {
    const decades = document.querySelectorAll('.decade');
    const tooltip = document.getElementById('tooltip');
    let tooltipVisible = false;

    // Массив рекомендаций
    const recommendations = {
        "Март-3": "На озимой пшенице по стерневым предшественникам в фазу кущения возобновили питание личинки хлебной жужелицы.",
        "Апрель-1": "Рекомендуется обработка против клещей и сорняков.",
        "Апрель-2": "Проведите обработку от мильдью.",
        "Апрель-3": "Подготовьте виноград к цветению.",
        "Ноябрь-3": "Внесите комплексные удобрения ...",
        "Сентябрь-2": "Предпосевная обработка семян ..."
    };

    // Получение текущей даты
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonthIndex = today.getMonth();
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const currentMonth = months[currentMonthIndex];
    const currentDecade = Math.ceil(currentDay / 10); // Определяем декаду

    // Функция обновления стилей декад
    function updateDecadeStyles() {
        decades.forEach(decade => {
            const decadeMonth = decade.dataset.month;
            const decadeNumber = parseInt(decade.dataset.decade, 10);
            const key = `${decadeMonth}-${decadeNumber}`;
            const recommendation = recommendations[key];

            // Если это текущая декада
            if (decadeMonth === currentMonth && decadeNumber === currentDecade) {
                decade.classList.add('current-decade'); // Зеленый фон
                decade.classList.remove('blinking'); // Очищаем мигание

                if (recommendation) {
                    decade.classList.add('blinking'); // Мигание, если есть рекомендация
                    decade.setAttribute('data-tooltip', recommendation);
                }
            } else {
                // Для остальных декад убираем все классы
                decade.classList.remove('current-decade', 'blinking');
            }
        });
    }

    // Обработчики событий для подсказок
    function showTooltip(event, element) {
        const tooltipText = element.getAttribute('data-tooltip');
        const month = element.getAttribute('data-month');
        const decadeNumber = element.getAttribute('data-decade');

        tooltip.innerHTML = tooltipText ? tooltipText : `${month}, Декада ${decadeNumber}`;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltipVisible = true;
    }

    function hideTooltip(event) {
        if (!tooltip.contains(event.relatedTarget)) {
            tooltip.style.display = 'none';
            tooltipVisible = false;
        }
    }

    // Применяем обновление стилей декад
    updateDecadeStyles();

    // Добавляем обработчики событий
    decades.forEach(decade => {
        decade.addEventListener('mouseover', (event) => showTooltip(event, event.target));
        decade.addEventListener('mouseout', hideTooltip);
        decade.addEventListener('click', (event) => {
            const element = event.target;

            // Убираем мигание после клика
            element.classList.remove('blinking');
            element.classList.add('current-decade');
            showTooltip(event, element);
        });
    });

    // Подсказка остаётся видимой, если курсор над ней
    tooltip.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
        tooltipVisible = true;
    });

    tooltip.addEventListener('mouseout', hideTooltip);
});

// Функции для показа и скрытия деталей плана
function togglePlan(planId) {
    const planContent = document.getElementById(planId);
    planContent.style.display = (planContent.style.display === "none" || planContent.style.display === "") ? "block" : "none";
}

function showDetails(detailId) {
    const detailContent = document.getElementById(detailId);
    detailContent.classList.toggle("hidden");
}