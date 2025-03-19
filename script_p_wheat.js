
document.addEventListener('DOMContentLoaded', () => {
    const decades = document.querySelectorAll('.decade');
    const tooltip = document.getElementById('tooltip');
    let tooltipVisible = false;

    // Массив рекомендаций
    const recommendations = {
        "Март-1": "На озимой пшенице по стерневым предшественникам в фазу кущение возобновили питание личинки хлебной жужелицы. На слабо раскустившихся и поздно взошедших посевах, при обнаружении более 2х личинок на 1м² следует провести обработку одним из<a href='https://www.pesticide.md/registru-cautare/?name_registr=0&name_reg=0&t=0&c=10704&comp=0&par=18166&search=C%C4%83utare'> инсектицидов.</a> ",
        "Апрель-1": "Рекомендуется обработка против клещей и сорняков.",
        "Апрель-2": "Проведите обработку от мильдью.",
        "Апрель-3": "Подготовьте виноград к цветению.",
        "Ноябрь-3": "Внесите комплексные удобрения для улучшения агрофона. <a href='https://www.pesticide.md/registru-cautare/?name_registr=0&name_reg=0&t=0&c=10704&comp=0&par=18166&search=C%C4%83utare'>Подробнее</a>  <a href='https://fenix-agro.md/5a9829e53c7b7d0001a3fa3b/5a9c13eca5e9fa00010bf865_%D0%90%D0%BC%D0%BC%D0%BE%D1%84%D0%BE%D1%81.pdf'>Подробнее</a> ",
        "Сентябрь-2": "Предпосевная обработка семян <a href='https://www.pesticide.md/registru-cautare/?name_registr=0&name_reg=0&t=0&c=10568&comp=0&par=18166&search=C%C4%83utare'>одним из инсектицидов</a> ",
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

    function updateDecadeStyles() {
        document.querySelectorAll(".decade").forEach(decade => {
            const key = decade.dataset.decade; // Получаем ключ для поиска рекомендаций
            const recommendation = recommendations[key]; // Получаем рекомендацию
    
            if (recommendation && recommendation.trim() !== "") {
                // Если есть рекомендация — мигаем красным
                decade.classList.add("blinking");
                decade.classList.remove("current-decade");
            } else {
                // Если нет рекомендации — зелёный цвет
                decade.classList.add("current-decade");
                decade.classList.remove("blinking");
            }
        });
    }
    
    // Вызываем функцию после загрузки страницы
    document.addEventListener("DOMContentLoaded", updateDecadeStyles);

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

// Инициализация данных при загрузке страницы Plan

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
