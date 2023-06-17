function displayTemperature(response){
 let currentTemperature = document.querySelector("#temperature");
 let currentCity = document.querySelector("#city");
let currentWeather = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
windSpeed.innerHTML = Math.round(response.data.wind.speed);
currentWeather.innerHTML = response.data.condition.description;
humidity.innerHTML = response.data.temperature.humidity;
currentCity.innerHTML = response.data.city;
currentTemperature.innerHTML = Math.round(response.data.temperature.current)
console.log(response.data);
}


let apiKey = "480227a74ed9efc4a37t55fo364bf60c";
let city = "London";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(url).then(displayTemperature);