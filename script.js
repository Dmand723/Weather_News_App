//Current Weather section
const curImg = document.querySelector(".currentImg");
const WeatherURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=40.5308&lon=-112.2983&appid=4d85c440e2dfb127bd150565f7d3d3a5&units=imperial";

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
fetch(WeatherURL)
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
let date = document.querySelector(".cur-date");
let curYear = new Date().getFullYear();
let year = document.querySelector(".cur-year");
date.textContent = currentDate;
year.textContent = curYear;
//

//News Section
const NewsURL =
  "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2742b3432ae844eaac2a7b6aeaededd4";
fetch(NewsURL)
  .then((response) => response.json())
  .then((jsObject) => {
    const articles = jsObject.articles;
    const mainArticle = document.querySelector("#main-article");
    //create main article image
    let mainImg = document.createElement("img");
    mainImg.setAttribute("src", articles[0].urlToImage);
    mainImg.setAttribute("alt", "article 1 image");
    mainArticle.appendChild(mainImg);
    //create main article header
    let mainHeader = document.createElement("h2");
    let mainHeaderLink = document.createElement("a");
    mainHeaderLink.setAttribute("href", articles[0].url);
    mainHeaderLink.textContent = articles[0].title;
    mainHeader.appendChild(mainHeaderLink);
    mainArticle.appendChild(mainHeader);
    //create main article desc
    let mainDesc = document.createElement("p");
    mainDesc.textContent = articles[0].description;
    mainArticle.appendChild(mainDesc);

    //create other articles
    for (let i = 1; i < 7; i++) {
      const arcive = document.querySelector(".archive");
      let article = document.createElement("article");
      article.classList.add("article");
      //create article image
      let img = document.createElement("img");
      img.setAttribute("src", articles[i].urlToImage);
      img.setAttribute("alt", `article ${i + 1} image`);
      img.setAttribute("width", 300);
      article.appendChild(img);
      //create article header
      let header = document.createElement("h3");
      let headerLink = document.createElement("a");
      headerLink.setAttribute("href", articles[i].url);
      headerLink.textContent = articles[0].title;
      header.appendChild(headerLink);
      article.appendChild(header);
      //create article desc
      let desc = document.createElement("p");
      if (articles[i].description != null) {
        desc.textContent = articles[i].description;
      } else {
        desc.textContent = "No article Description";
      }

      article.appendChild(desc);
      arcive.appendChild(article);
    }
  });
