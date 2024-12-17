const apiKey = '14843efb54ff452c843efb54ff052cf0';
const stationId = 'ITARAC2';

// Функция для форматирования даты в строку формата YYYYMMDD
function formatDate(date) {
    return date.toISOString().split('T')[0].replace(/-/g, '');
}

// Функция для получения данных за указанный интервал дат
async function fetchMeteoDataForInterval(startDate, endDate) {
    const formattedStartDate = formatDate(new Date(startDate));
    const formattedEndDate = formatDate(new Date(endDate));

    try {
        const response = await fetch(
            `https://api.weather.com/v2/pws/history/daily?stationId=${stationId}&format=json&units=m&startDate=${formattedStartDate}&endDate=${formattedEndDate}&apiKey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data); // Для отладки
        return data.observations || [];
    } catch (error) {
        console.error('Ошибка:', error);
        return [];
    }
}

// Функция для обновления таблицы
function updateTable(data) {
    const tableBody = document.querySelector('#meteoTable tbody');
    tableBody.innerHTML = ''; // Очищаем таблицу

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8">Нет данных для отображения</td></tr>';
        return;
    }

    data.forEach(row => {
        const newRow = `
            <tr>
                <td>${row.obsTimeLocal.split(' ')[0]}</td>
                <td>${Math.round(row.metric.tempHigh)} °C</td>
                <td>${Math.round(row.metric.tempLow)} °C</td>
                <td>${Math.round(row.metric.tempAvg)} °C</td>
                <td>${row.humidityAvg !== undefined ? Math.round(row.humidityAvg) : '—'} %</td>
                <td>${(row.metric.precipTotal || 0).toFixed(1)} мм</td>
                <td>${Math.round(row.metric.windspeedAvg)} км/ч</td>
                <td>${Math.round(row.metric.dewptHigh)} °C</td>
                
            </tr> 
        `;

        tableBody.innerHTML += newRow;
    });
}

// Обработчик формы для выбора интервала дат
document.getElementById('dateRangeForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (new Date(startDate) > new Date(endDate)) {
        alert('Начальная дата не может быть позже конечной даты!');
        return;
    }

    const daysDifference = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (daysDifference > 30) {
        alert('Интервал дат не может превышать 30 дней!');
        return;
    }

    const data = await fetchMeteoDataForInterval(startDate, endDate);
    updateTable(data);
});

// Загрузка данных за 10 дней при открытии страницы
window.onload = async function () {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 10);

    const data = await fetchMeteoDataForInterval(lastMonth, today);
    updateTable(data);
};
