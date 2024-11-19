

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

    // Получение текущей даты
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonthIndex = today.getMonth(); // 0 = Январь, 1 = Февраль, ..., 11 = Декабрь

    // Массив названий месяцев
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    // Определение текущего месяца и декады
    const currentMonth = months[currentMonthIndex];
    const currentDecade = Math.ceil(currentDay / 10); // 1-я декада: 1-10, 2-я: 11-20, 3-я: 21-31

    // Поиск и выделение текущей декады
    decades.forEach(decade => {
        const decadeMonth = decade.getAttribute('data-month');
        const decadeNumber = parseInt(decade.getAttribute('data-decade'), 10);

        if (decadeMonth === currentMonth && decadeNumber === currentDecade) {
            decade.classList.add('current-decade'); // Добавление класса для выделения
        }
    });
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
