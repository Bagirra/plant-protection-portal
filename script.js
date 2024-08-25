const apiKey = '14843efb54ff452c843efb54ff052cf0';
const stationId = 'ITARAC2';

// Функция для округления числа до целого
function roundToInteger(value) {
    return Math.round(value);
}

// Функция для получения данных о текущей погоде
async function fetchCurrentWeather() {
    const response = await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}`);
    const data = await response.json();
    console.log('Current Weather Data:', data); // Логируем данные для проверки
    return data.observations[0];
}

// Функция для получения прогноза погоды
async function fetchWeatherForecast() {
    const response = await fetch(`https://api.weather.com/v3/wx/forecast/daily/5day?geocode=45.886972,28.645906&format=json&units=m&language=en-US&apiKey=${apiKey}`);
    const data = await response.json();
    console.log('Weather Forecast Data:', data); // Логируем данные для проверки
    return data;
}

// Функция для отображения текущих данных о погоде
function displayCurrentWeather(data) {
    console.log('Displaying Current Weather:', data); // Логируем данные для проверки

    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const dewPoint = document.getElementById('dewPoint');
    const precipitation = document.getElementById('precipitation');

    // Проверяем, что данные существуют перед их отображением
    const temp = data.temp ? roundToInteger(data.temp) : '—';
    const humidityValue = data.humidity ? data.humidity : '—';
    const windSpeedValue = data.windspeed ? roundToInteger(data.windspeed) : '—';
    const dewPointValue = data.dewpoint ? roundToInteger(data.dewpoint) : '—';
    const precipitationValue = data.precipitation ? roundToInteger(data.precipitation) : '—';

    // Обновляем элементы на странице
    weatherIcon.src = data.icon ? `https://www.weather.com/icons/${data.icon}.png` : ''; // Замените на URL иконок, соответствующих вашей погодной службе
    temperature.textContent = `${temp} °C`;
    humidity.textContent = `Влажность: ${humidityValue} %`;
    windSpeed.textContent = `Скорость ветра: ${windSpeedValue} км/ч`;
    dewPoint.textContent = `Точка росы: ${dewPointValue} °C`;
    precipitation.textContent = `Осадки: ${precipitationValue} мм`;
}

// Функция для отображения прогноза погоды
function displayWeatherForecast(forecast) {
    console.log('Displaying Weather Forecast:', forecast); // Логируем данные для проверки

    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';  // Очищаем контейнер

    forecast.daily.forecast.forEach(day => {
        const forecastItem = `
            <div class="forecast-item">
                <h3>${new Date(day.fcst_valid_local).toLocaleDateString()}</h3>
                <p>Макс. температура: ${roundToInteger(day.temp_max)} °C</p>
                <p>Мин. температура: ${roundToInteger(day.temp_min)} °C</p>
                <p>Условие: ${day.narrative}</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastItem;
    });
}

// Инициализация данных при загрузке страницы
window.onload = async function() {
    try {
        const currentWeather = await fetchCurrentWeather();
        displayCurrentWeather(currentWeather);

        const weatherForecast = await fetchWeatherForecast();
        displayWeatherForecast(weatherForecast);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};
