let now = new Date();

let todayDay = document.querySelector("#day");
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
let day = days[now.getDay()];
todayDay.innerHTML = `${day}`;

let todayMonth = document.querySelector("#month");
let months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
let month = months[now.getMonth()];
todayMonth.innerHTML = `${month} `;

let todayDate = document.querySelector("#date");
let date = now.getDate();
todayDate.innerHTML = `${date}`;

let todayHour = document.querySelector("#hour");
let hours = now.getHours();
let ampm = "am";
if (hours > 12) {
  ampm = "pm";
  hours = hours - 12;
}
todayHour.innerHTML = `${hours}`;

let todayMinute = document.querySelector("#minute");
let minutes = now.getMinutes();
todayMinute.innerHTML = `${minutes} ${ampm}`;

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  celsiusTemperature = response.data.temperature.current; //storing the current temp

  cityElement.innerHTML = response.data.city;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `Humidity ${Math.round(
    response.data.temperature.humidity
  )}%`;
  windSpeedElement.innerHTML = `Wind Speed ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

//let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}`;
function search(city) {
  let apiKey = "fc1b832b8095ff408d9652d0tb44f7oa";
  let encoded = encodeURI(city);
  let url = `https://api.shecodes.io/weather/v1/current?query=${encoded}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Current Loction
//Get current position

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "fc1b832b8095ff408d9652d0tb44f7oa";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(url).then(displayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityBtn = document.querySelector("#locationBtn");
currentCityBtn.addEventListener("click", getCurrentPosition);

//Farenheit coversion

function displayFarenheitTemperature(event) {
  event.preventDefault();
  //add or remove active class
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  //add or remove active class
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null; //global variable that can be accessed by other functions

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
// end

//start forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"]; //array of days

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    //for each day inject a new column of html
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2 daily-forecast">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
          id="forecast-icon"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`; //close the div for class "row"
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
//end forecast
search("Atlanta"); //search on load
displayForecast();
