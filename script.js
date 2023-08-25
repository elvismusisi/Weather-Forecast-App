const API_KEY = '7be62da2b91436232540923615dc9e7d'; 
function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    
    if (!cityName) return;

    // Get current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${7be62da2b91436232540923615dc9e7d}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('currentWeather').innerHTML = `
            <h2>Current Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Description: ${data.weather[0].description}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching current weather:', error);
    });

    // Get 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${7be62da2b91436232540923615dc9e7d}`)
    .then(response => response.json())
    .then(data => {
        let forecastHTML = '<h2>5-Day Forecast</h2>';

        for (let i = 0; i < data.list.length; i += 8) { // data is given every 3 hours, so skipping 8 indexes gives us roughly daily data
            forecastHTML += `
                <div>
                    <h3>${data.list[i].dt_txt.split(' ')[0]}</h3>
                    <p>Temperature: ${data.list[i].main.temp}°C</p>
                    <p>Humidity: ${data.list[i].main.humidity}%</p>
                    <p>Description: ${data.list[i].weather[0].description}</p>
                </div>
            `;
        }

        document.getElementById('forecast').innerHTML = forecastHTML;
    })
    .catch(error => {
        console.error('Error fetching 5-day forecast:', error);
    });
}
