function darkTheme() {
let body = document.querySelector("body");
  let hour = (new Date).getHours();
  if (hour >= 16) {
  body.classList.add('dark');
  }
};

function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
  hours = `0${hours}`
}
let minutes = date.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;}

function displayTemperature(response){
let currentTemperature = document.querySelector("#temperature");
let currentCity = document.querySelector("#city");
let currentWeather = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let currentDate = document.querySelector("#date");
let emoji = document.querySelector("#icon");
emoji.setAttribute("src",(response.data.condition.icon_url));
emoji.setAttribute("alt",(response.data.condition.icon));
currentDate.innerHTML = formatDate(response.data.time*1000);
windSpeed.innerHTML = Math.round(response.data.wind.speed);
currentWeather.innerHTML = response.data.condition.description;
humidity.innerHTML = response.data.temperature.humidity;
currentCity.innerHTML = response.data.city;
currentTemperature.innerHTML = Math.round(response.data.temperature.current);
celsiusTemp = Math.round(response.data.temperature.current);
}

function search(city){
let apiKey = "480227a74ed9efc4a37t55fo364bf60c";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(url).then(displayTemperature);
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event){
event.preventDefault();
let changeCity = document.querySelector("#citySearch");
search(changeCity.value);
}

function formatTimestamp(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
 let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

  return days[day];
}

function showForecast(response){
  let forecasting = response.data.daily;
  let forecast = document.querySelector("#forecast");
   let forecastHTML = `<div class = "row">`
  forecasting.forEach(function(forecastingDay, index){if (index < 6)
    {forecastHTML = forecastHTML + `<div class="col-2">
  <div class="day">
  ${formatTimestamp(forecastingDay.time)}
</div>
<img src="${forecastingDay.condition.icon_url}" alt="#" width = "39">
<br/>
<span class="max-temperature">${Math.round(forecastingDay.temperature.maximum)}°</span>
<span class="min-temperature">${Math.round(forecastingDay.temperature.minimum)}°</span>
</div>`;
  }})
forecastHTML = forecastHTML + `</div>`
forecast.innerHTML = forecastHTML;
}

search("Edinburgh");
darkTheme();

let searchBar = document.querySelector("#selfSearch");
searchBar.addEventListener("submit", handleSubmit);