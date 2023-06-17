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
}



let apiKey = "480227a74ed9efc4a37t55fo364bf60c";
let city = "London";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(url).then(displayTemperature);