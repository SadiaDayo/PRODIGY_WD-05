document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('button-search').addEventListener('click', function() {
       
        const cityName = document.getElementById('search-input').value.trim();
        
        if (cityName !== '') {
            fetchWeather(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });
});

async function fetchWeather(cityName) {
    const apiKey = 'ad15c6c089msh518df5432aa4f64p16e00fjsne3f3e1831f2c'; 
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); 
        console.log(result);

        const weatherData = {
            temp: result.temp,
            feels_like: result.feels_like,
            humidity: result.humidity,
            max_temp: result.max_temp,
            min_temp: result.min_temp,
            wind_speed: result.wind_speed,
            cloud_pct: result.cloud_pct,
            sunrise: result.sunrise,
            sunset: result.sunset
        };

        updateWeatherInfo(weatherData);
    } catch (error) {
        console.error(error);
    }
}

function updateWeatherInfo(weatherData) {
    document.getElementById("temperature").textContent = weatherData.temp;
    document.getElementById("feels-like").textContent = weatherData.feels_like;
    document.getElementById("humidity").textContent = weatherData.humidity;
    document.getElementById("max-temp").textContent = weatherData.max_temp;
    document.getElementById("min-temp").textContent = weatherData.min_temp;
    document.getElementById("wind-speed").textContent = weatherData.wind_speed;
    document.getElementById("cloud-cover").textContent = weatherData.cloud_pct;
    document.getElementById("sunrise-time").textContent = formatTime(weatherData.sunrise);
    document.getElementById("sunset-time").textContent = formatTime(weatherData.sunset);
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000); 
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`;
}
