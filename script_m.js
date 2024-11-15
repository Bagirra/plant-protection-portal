const apiKey = '14843efb54ff452c843efb54ff052cf0';
        const stationId = 'ITARAC2';
    
        // Функция для округления числа до целого
        function roundToInteger(value) {
            return value !== undefined && !isNaN(value) ? Math.round(value) : 0;
        }
        
        // Функция для округления числа до десятых
        function roundToTenths(value) {
            return value !== undefined && !isNaN(value) ? Math.round(value * 10) / 10 : 0;
        }
    
        // Функция для форматирования даты в строку формата YYYYMMDD
        function formatDate(date) {
            return date.toISOString().split('T')[0].replace(/-/g, '');
        }
    
        // Функция для получения метео данных за последний месяц
        async function fetchMeteoDataForMonth() {
            const today = new Date();
            const startDate = new Date();
            startDate.setDate(today.getDate() - 30); // Начальная дата - 30 дней назад
    
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(today);
    
            const response = await fetch(`https://api.weather.com/v2/pws/history/daily?stationId=${stationId}&format=json&units=m&startDate=${formattedStartDate}&endDate=${formattedEndDate}&apiKey=${apiKey}`);
            const data = await response.json();
            console.log('API response:', data);  // Логирование ответа API для отладки
            return data.observations;
        }
    
        // Функция для обновления таблицы
        function updateTable(data) {
            const tableBody = document.querySelector('#meteoTable tbody');
            tableBody.innerHTML = '';  // Очищаем таблицу
    
            data.forEach(row => {
                // Логирование значений для отладки
                console.log('Row data:', row);
    
                // Проверка существования данных для влажности
                const humidity = row.humidityAvg !== undefined ? roundToInteger(row.humidityAvg) : '—';
                console.log('Humidity value:', row.humidityAvg);
    
                const newRow = `
                    <tr>
                        <td>${row.obsTimeLocal.split(' ')[0]}</td>
                        <td>${roundToInteger(row.metric.tempHigh)} °C</td>
                        <td>${roundToInteger(row.metric.tempLow)} °C</td>
                        <td>${roundToInteger(row.metric.tempAvg)} °C</td>
                        <td>${roundToInteger(row.metric.windspeedAvg)} км/ч</td>
                        <td>${roundToInteger(row.metric.dewptHigh)} °C</td>
                        <td>${humidity} %</td>
                        <td>${roundToTenths(row.metric.precipTotal)} мм</td>
                    </tr> 
                `;
    
                tableBody.innerHTML += newRow;
            });
        }
    
        // Инициализация данных при загрузке страницы
        window.onload = async function() {
            const data = await fetchMeteoDataForMonth();
            updateTable(data);
        };