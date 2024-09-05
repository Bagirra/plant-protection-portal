const apiKey = '14843efb54ff452c843efb54ff052cf0';
const stationId = 'ITARAC2';

// Функция для получения текущих данных с метеостанции
async function fetchCurrentWeather() {
    const response = await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`);
    const data = await response.json();
    return data.observations[0];
}

// Функция для получения прогноза погоды на 5 дней
async function fetchWeatherForecast() {
    const response = await fetch(`https://api.weather.com/v3/wx/forecast/daily/5day?geocode=45.886972,28.645906&format=json&units=m&language=ru-RU&apiKey=${apiKey}`);
    const data = await response.json();
    return data;
}

// Функция для обновления текущих данных на экране
function updateCurrentWeather(data) {
    document.getElementById('weatherIcon').src = 'weather-icon.png'; // Заменить на нужную иконку
    document.getElementById('temperature').innerText = `${data.metric.temp} °C`;
    document.getElementById('humidity').innerText = `Влажность: ${data.humidity} %`;
    document.getElementById('windSpeed').innerText = `Ветер: ${data.metric.windSpeed} км/ч`;
}

// Функция для отображения прогноза погоды
function updateWeatherForecast(forecast) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';  // Очищаем контейнер

    for (let i = 0; i < forecast.calendarDayTemperatureMax.length; i++) {
        const dayForecast = `
            <div class="forecast-item">
                <img src="weather-icon.png" alt="Иконка погоды"> <!-- Заменить на реальную иконку -->
                <h3>${forecast.dayOfWeek[i]}</h3>
                <p>${forecast.calendarDayTemperatureMax[i]} °C</p>
                <p>${forecast.calendarDayTemperatureMin[i]} °C</p>
            </div>
        `;
        forecastContainer.innerHTML += dayForecast;
    }
}

// Инициализация данных при загрузке страницы
window.onload = async function() {
    try {
        const currentWeather = await fetchCurrentWeather();
        updateCurrentWeather(currentWeather);

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

