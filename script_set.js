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
        const data = await response.json();
        return data.observations || [];
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}

// Функция для вычисления суммы эффективных температур (СЭТ) по заданному интервалу
async function calculateSET() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const baseTemp = parseFloat(document.getElementById('baseTempInput').value) || 0;

    if (!startDate || !endDate) {
        alert('Выберите начальную и конечную дату!');
        return;
    }

    const meteoData = await fetchMeteoDataForInterval(startDate, endDate);
    
    let sumEffectiveTemp = 0;
    meteoData.forEach(day => {
        const avgTemp = day.metric.tempAvg;
        if (avgTemp > baseTemp) {
            sumEffectiveTemp += avgTemp - baseTemp;
        }
    });

    document.getElementById('setResult').innerText = `СЭТ за период с ${startDate} по ${endDate} (порог ${baseTemp}°C): ${sumEffectiveTemp.toFixed(2)}°C`;
}

// Функция для вычисления суммы активных температур (САТ) по заданному интервалу
async function calculateSAT() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const thresholdTemp = parseFloat(document.getElementById('thresholdTempInput').value) || 0;

    if (!startDate || !endDate) {
        alert('Выберите начальную и конечную дату!');
        return;
    }

    const meteoData = await fetchMeteoDataForInterval(startDate, endDate);
    
    let sumActiveTemp = 0;
    meteoData.forEach(day => {
        const avgTemp = day.metric.tempAvg;
        if (avgTemp > thresholdTemp) {
            sumActiveTemp += avgTemp;
        }
    });

    document.getElementById('satResult').innerText = `САТ за период с ${startDate} по ${endDate} (порог ${thresholdTemp}°C): ${sumActiveTemp.toFixed(2)}°C`;
}

// Функция для вычисления суммы осадков за выбранный интервал
async function calculatePrecipitation() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Выберите начальную и конечную дату!');
        return;
    }

    const meteoData = await fetchMeteoDataForInterval(startDate, endDate);
    
    let totalPrecipitation = 0;
    meteoData.forEach(day => {
        const precipitation = day.metric.precipTotal || 0;
        totalPrecipitation += precipitation;
    });

    document.getElementById('precipitationResult').innerText = `Сумма осадков за период с ${startDate} по ${endDate}: ${totalPrecipitation.toFixed(2)} мм`;
}

// Обработчик события для кнопки расчета СЭТ
document.getElementById('calculateSETButton').addEventListener('click', () => {
    calculateSET();
});

// Обработчик события для кнопки расчета САТ
document.getElementById('calculateSATButton').addEventListener('click', () => {
    calculateSAT();
});

// Обработчик события для кнопки расчета осадков
document.getElementById('calculatePrecipitationButton').addEventListener('click', () => {
    calculatePrecipitation();
});
