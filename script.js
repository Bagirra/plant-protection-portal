const apiKey = '14843efb54ff452c843efb54ff052cf0';
const stationId = 'ITARAC2';

// Функция для округления числа до целого
function roundToInteger(value) {
    return Math.round(value);
}

// Функция для получения метео данных
async function fetchMeteoData() {
    const response = await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`);
    const data = await response.json();
    return data;
}

// Функция для обновления таблицы
function updateTable(data) {
    const tableBody = document.querySelector('#meteoTable tbody');
    tableBody.innerHTML = '';  // Очищаем таблицу

    data.forEach(row => {
        const newRow = `
            <tr>
                <td>${row.date}</td>
                <td>${roundToInteger(row.max_temperature)} °C</td>
                <td>${roundToInteger(row.min_temperature)} °C</td>
                <td>${roundToInteger(row.avg_temperature)} °C</td>
                <td>${roundToInteger(row.wind_speed)} км/ч</td>
                <td>${roundToInteger(row.dew_point)} °C</td>
                <td>${roundToInteger(row.humidity)} %</td>
                <td>${roundToInteger(row.precipitation)} мм</td>
            </tr>
        `;
        tableBody.innerHTML += newRow;
    });
}

// Функция для получения данных за последнюю неделю
async function loadWeeklyData() {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);  // Начальная дата - 7 дней назад

    // Здесь должна быть функция для получения данных за каждую дату в интервале
    // Для примера создадим фиктивные данные
    const weeklyData = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const formattedDate = date.toISOString().split('T')[0];
        weeklyData.push({
            date: formattedDate,
            max_temperature: Math.random() * 30,
            min_temperature: Math.random() * 30,
            avg_temperature: Math.random() * 30,
            wind_speed: Math.random() * 10,
            dew_point: Math.random() * 30,
            humidity: Math.random() * 100,
            precipitation: Math.random() * 10
        });
    }
    updateTable(weeklyData);
}

// Функция для проверки, попадает ли дата в интервал
function isDateInRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
}

// Функция для обновления таблицы по выбранному интервалу
function updateTableByDateRange() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    // Проверка, чтобы конечная дата не была раньше начальной
    if (endDate < startDate) {
        alert('Конечная дата не может быть раньше начальной даты.');
        return;
    }

    // Проверка интервала в один месяц
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах
    if ((endDate - startDate) > oneMonth) {
        alert('Интервал не может превышать один месяц.');
        return;
    }

    // Фильтрация данных по выбранному интервалу
    const tableRows = document.querySelectorAll('#meteoTable tbody tr');
    tableRows.forEach(row => {
        const rowDate = new Date(row.children[0].innerText);
        if (isDateInRange(rowDate, startDate, endDate)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
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
