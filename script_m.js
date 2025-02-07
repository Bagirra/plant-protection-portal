const apiKey = '14843efb54ff452c843efb54ff052cf0';
const stationId = 'ITARAC2';

// Функция для форматирования даты в строку формата YYYYMMDD
function formatDate(date) {
    return date.toISOString().split('T')[0].replace(/-/g, '');
}

// Функция для получения данных за указанный интервал дат с разбиением по месяцам
async function fetchMeteoDataForInterval(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let allData = [];

    while (start <= end) {
        let monthEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        if (monthEnd > end) monthEnd = end;

        const formattedStartDate = formatDate(start);
        const formattedEndDate = formatDate(monthEnd);

        try {
            const response = await fetch(
                `https://api.weather.com/v2/pws/history/daily?stationId=${stationId}&format=json&units=m&startDate=${formattedStartDate}&endDate=${formattedEndDate}&apiKey=${apiKey}`
            );
            const data = await response.json();
            allData = allData.concat(data.observations || []);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }

        start.setMonth(start.getMonth() + 1);
        start.setDate(1);
    }
    return allData;
}

// Функция для обновления таблицы метеоданных
function updateTable(data) {
    const tableBody = document.querySelector('#meteoTable tbody');
    tableBody.innerHTML = ''; // Очищаем таблицу

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8">Нет данных для отображения</td></tr>';
        return;
    }

    data.forEach(row => {
        const newRow = 
            `<tr>
                <td>${row.obsTimeLocal.split(' ')[0]}</td>
                <td>${Math.round(row.metric.tempHigh)} °C</td>
                <td>${Math.round(row.metric.tempLow)} °C</td>
                <td>${Math.round(row.metric.tempAvg)} °C</td>
                <td>${row.humidityAvg !== undefined ? Math.round(row.humidityAvg) : '—'} %</td>
                <td>${(row.metric.precipTotal || 0).toFixed(1)} мм</td>
                <td>${Math.round(row.metric.windspeedAvg)} км/ч</td>
                <td>${Math.round(row.metric.dewptHigh)} °C</td>
            </tr>`;
        tableBody.innerHTML += newRow;
    });
}

// Обработчик формы для выбора интервала дат и обновления таблицы
document.getElementById('dateRangeForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (new Date(startDate) > new Date(endDate)) {
        alert('Начальная дата не может быть позже конечной даты!');
        return;
    }

    const daysDifference = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (daysDifference > 365) { // Ограничение на год, чтобы не перегрузить API
        alert('Интервал дат не может превышать 1 год!');
        return;
    }

    const data = await fetchMeteoDataForInterval(startDate, endDate);
    updateTable(data);
});

// Загрузка данных за последние 10 дней при открытии страницы
window.onload = async function () {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 10);

    const data = await fetchMeteoDataForInterval(lastMonth, today);
    updateTable(data);
};