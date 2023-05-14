function formatDate(now) {
  let h3 = document.querySelector("h3");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = now.getDate();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  h3.innerHTML = ` ${day} ${month} ${date}, ${year}`;
}
function searchTemp(response) {
  console.log(response);
  document.querySelector("h2").innerHTML = response.data.name;
  let temp = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(`${response.data.main.humidity}`);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(`${response.data.wind.speed}`);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input");
  city.innerHTML = `${city.value}`;
  let apiKey = "559d8dfd4e0451eaa6c405eb9092a204";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(searchTemp);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", search);
let date = document.querySelector(".date");
let dateElement = new Date();
dateElement.innerHTML = formatDate(dateElement);

function searchLocation(position) {
  let apiKey = "559d8dfd4e0451eaa6c405eb9092a204";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(searchTemp);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
