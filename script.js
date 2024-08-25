const apiKey = '14843efb54ff452c843efb54ff052cf0';
const stationId = 'ITARAC2';

// Функция для округления числа до целого
function roundToInteger(value) {
    return Math.round(value);
}

// Функция для получения метео данных за последний месяц
async function fetchMeteoDataForMonth() {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30); // Начальная дата - 30 дней назад

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = today.toISOString().split('T')[0];

    const response = await fetch(`https://api.weather.com/v2/pws/history/daily?stationId=${stationId}&format=json&units=m&date=${formattedStartDate}&endDate=${formattedEndDate}&apiKey=${apiKey}`);
    const data = await response.json();
    return data.observations;
}

// Функция для обновления таблицы
function updateTable(data) {
    const tableBody = document.querySelector('#meteoTable tbody');
    tableBody.innerHTML = '';  // Очищаем таблицу

    data.forEach(row => {
        const newRow = `
            <tr>
                <td>${row.obsTimeLocal.split(' ')[0]}</td>
                <td>${roundToInteger(row.metric.tempHigh)} °C</td>
                <td>${roundToInteger(row.metric.tempLow)} °C</td>
                <td>${roundToInteger(row.metric.tempAvg)} °C</td>
                <td>${roundToInteger(row.metric.windspeedAvg)} км/ч</td>
                <td>${roundToInteger(row.metric.dewptHigh)} °C</td>
                <td>${roundToInteger(row.metric.humidityAvg)} %
                <td>${roundToInteger(row.metric.precipTotal)} мм</td>
            </tr>
        `;
        tableBody.innerHTML += newRow;
    });
}

// Инициализация данных при загрузке страницы
window.onload = function() {
    loadWeeklyData();

    // Обработчики событий для выбора дат
    document.getElementById('startDate').addEventListener('change', updateTableByDateRange);
    document.getElementById('endDate').addEventListener('change', updateTableByDateRange);
};

document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    let imageFile = document.getElementById('imageUpload').files[0];
    if (!imageFile) {
        document.getElementById('result').innerHTML = 'Пожалуйста, выберите изображение для загрузки.';
        return;
    }

    let formData = new FormData();
    formData.append('image', imageFile);

    // Здесь вы можете использовать любой из предложенных ранее API
    const apiKey = 'YOUR_API_KEY'; // Вставьте сюда ваш API ключ
    const apiUrl = 'https://api.plant.id/v2/identify'; // Замените на URL вашего API

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });

        let result = await response.json();
        if (result.suggestions && result.suggestions.length > 0) {
            let pestName = result.suggestions[0].plant_name;
            document.getElementById('result').innerHTML = 'Обнаружен: ' + pestName;
        } else {
            document.getElementById('result').innerHTML = 'Не удалось определить вредителя или болезнь.';
        }
    } catch (error) {
        document.getElementById('result').innerHTML = 'Произошла ошибка при определении.';
        console.error('Error:', error);
    }
});
