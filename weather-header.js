let lon = "-112.2983";
let lat = "40.5308";
let appid = "4d85c440e2dfb127bd150565f7d3d3a5";
let units = "imperial";

const curImg = document.querySelector(".currentImg");
const URL =
  "https://api.openweathermap.org/data/2.5/weather?lat=40.5308&lon=-112.2983&appid=4d85c440e2dfb127bd150565f7d3d3a5&units=imperial";

//Current Weather section
function getWindDir(windDeg) {
  if (windDeg == 0) {
    return "N";
  } else if (windDeg <= 89) {
    return "NE";
  } else if (windDeg == 90) {
    return "E";
  } else if (windDeg <= 179) {
    return "SE";
  } else if (windDeg == 180) {
    return "S";
  } else if (windDeg <= 169) {
    return "SW";
  } else if (windDeg == 270) {
    return "W";
  } else {
    return "NW";
  }
}
function getImg(desc) {
  if (desc == "Clear") {
    return "./img/Sunny.jpg";
  } else if (desc == "Snow") {
    return "./img/snowy.jpg";
  } else if (desc == "Clouds") {
    return "./img/overcast.jpg";
  } else if (desc == "Rain") {
    return "./img/Umbrella.jpg";
  } else if (desc == "Wind") {
    return "./img/Windy.jpg";
  } else {
    return "./img/partlyCloudy.jpg";
  }
}
fetch(URL)
  .then((response) => response.json())
  .then((jsObject) => {
    let weather = jsObject.weather[0];
    let main = jsObject.main;
    let wind = jsObject.wind;
    document.getElementById("cur-desc").textContent = weather.description;
    document.getElementById("cur-temp").textContent = main.temp;
    document.getElementById("cur-feels").textContent = main.feels_like;
    document.getElementById("cur-humidity").textContent = main.humidity;
    let windDir = getWindDir(wind.deg);
    document.getElementById(
      "cur-speed"
    ).textContent = `${wind.speed} mph ${windDir}`;
    curImg.setAttribute("src", getImg(weather.main));
  });
//

//footer section
let currentDate = new Date().toLocaleDateString();
let date = document.querySelector("#cur-date");
let curYear = new Date().getFullYear();
let year = document.querySelector("#cur-year");
date.textContent = currentDate;
year.textContent = curYear;
