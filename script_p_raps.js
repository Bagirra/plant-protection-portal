
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
