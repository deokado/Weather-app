function getWeather() {
   const apiKey = '89b42f15998ab0646b24eb36ae0a157a';
   const city = document.getElementById('city').value;

   if (!city) {
       alert('Please enter your city');
       return;
   }

   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

   fetch(currentWeatherUrl)
       .then(response => response.json())
       .then(data => {
           displayWeather(data);
       })
       .catch(error => {
           console.error('Error fetching current weather data:', error);
           alert('Error fetching current weather data. Please try again.');
       });

   fetch(forecastUrl)
       .then(response => response.json())
       .then(data => {
           displayHourlyForecast(data.list);
       })
       .catch(error => {
           console.error('Error fetching hourly forecast data:', error);
           alert('Error fetching hourly forecast data. Please try again.');
       });
}

function displayWeather(data) {
   const tempDivInfo = document.getElementById('mean__temp');
   const weatherInfoDiv = document.getElementById('weather__info');
   const weatherIcon = document.getElementById('weather__icon');
   const hourlyForecastDiv = document.getElementById('hourly__forecasting');

   // Clear previous contents
   weatherInfoDiv.innerHTML = '';
   tempDivInfo.innerHTML = '';
   hourlyForecastDiv.innerHTML = '';

   if (data.cod === '404') {
       weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
   } else {
       const cityname = data.name;
       const temperature = Math.round(data.main.temp - 273.15);
       const description = data.weather[0].description;
       const iconCode = data.weather[0].icon;
       const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

       const temperatureHTML = `<p>${temperature}°C</p>`;
       const weatherHTML = `<p>${cityname}</p><p>${description}</p>`;

       tempDivInfo.innerHTML = temperatureHTML;
       weatherInfoDiv.innerHTML = weatherHTML;
       weatherIcon.src = iconUrl;
       weatherIcon.alt = description;
       weatherIcon.style.display = 'block';
   }
}

function displayHourlyForecast(hourlyData) {
   const hourlyForecastDiv = document.getElementById('hourly__forecasting');
   const next24Hours = hourlyData.slice(0, 8);

   next24Hours.forEach(item => {
       const dateTime = new Date(item.dt * 1000);
       const hour = dateTime.getHours();
       const temperature = Math.round(item.main.temp - 273.15);
       const iconCode = item.weather[0].icon;
       const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

       const hourlyItemHtml = `
           <div class="hourly__item">
               <span>${hour}:00</span>
               <img src="${iconUrl}" alt="Hourly Weather Icon">
               <span>${temperature}°C</span>
           </div>`;
       hourlyForecastDiv.innerHTML += hourlyItemHtml;
   });
}
