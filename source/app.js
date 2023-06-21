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
return `${day} ${hours}:${minutes}`;
}

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
currentTemperature.innerHTML = Math.round(response.data.temperature.current)
celsiusTemp = Math.round(response.data.temperature.current)
}

function search(city){
  let apiKey = "480227a74ed9efc4a37t55fo364bf60c";
   let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
  showForecast();
}

function handleSubmit(event){
  event.preventDefault();
let changeCity = document.querySelector("#citySearch");
search(changeCity.value);

}

function convertCelcius(event){
  event.preventDefault();
  celcius.classList.add("active");
  fahren.classList.remove("active");
   let currentTemperature = document.querySelector("#temperature");
 currentTemperature.innerHTML = Math.round(celsiusTemp)
}

function convertFahren(event){
  event.preventDefault();
  celcius.classList.remove("active");
  fahren.classList.add("active");
  let fahrenTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = fahrenTemp
}

function showForecast(){
  let forecast = document.querySelector("#forecast");
   let days = ["Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
   let forecastHTML = `<div class = "row">`
  days. forEach(function(day){  forecastHTML = forecastHTML + `<div class="col-2">
  <div class="day">
  ${day}
</div>
<img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt="" width = "42">
<span class="max-temperature">23°</span>
<span class="min-temperature">15°</span>
</div>`;
  })
forecastHTML = forecastHTML + `</div>`
forecast.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let fahren = document.querySelector("#fahren");
fahren.addEventListener("click",convertFahren);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click",convertCelcius);

search("Edinburgh");

let searchBar = document.querySelector("#selfSearch");
searchBar.addEventListener("submit", handleSubmit);

