/* app.js */

const API_KEY = "2e7bdc741e08b8849666468a83a0040c";
let city_name = "seoul";
let lat = 37.5683;
let lon = 126.9778;
let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
let API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_KEY}`;
let API_URL3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

function getWeatherData(cityName = "seoul") {
  city_name = cityName;
  API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
  API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_KEY}`;
  API_URL3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(API_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data);
      showWeatherData(data); // data 외부로 분리
    });

  fetch(API_URL2)
    .then(function (res2) {
      return res2.json();
    })
    .then(function (data2) {
      // console.log(data);
      showWeatherData2(data2);
    });

  fetch(API_URL3)
    .then(function (res3) {
      return res3.json();
    })
    .then(function (data3) {
      // console.log(data3);
      showAirpollution(data3);
    });
}

// 날씨함수 호출 (호출하지 않으면 화면 로딩시 자동 호출되지 않음)
getWeatherData();

function showWeatherData(data) {
  /* 날씨정보 */
  const name = data.name;
  const desc = data.weather[0].main;
  const icon = data.weather[0].icon;
  const temp = Math.round((data.main.temp - 273.15) * 10) / 10;
  const feelTemp = Math.round((data.main.feels_like - 273.15) * 10) / 10;
  const wind = Math.round(data.wind.speed * 10) / 10;
  const windDirection = data.wind.deg;
  const humidity = data.main.humidity;
  // const rainfall = data.snow["1h"];
  // console.log(rainfall);

  /* 날씨정보 재가공 */
  let iconurl = `./src/images/weather-icons/${icon}.svg`;
  let wDrectionTxt = "서풍";
  if (windDirection >= 23 && windDirection < 68) {
    wDrectionTxt = "남서풍";
  } else if (windDirection >= 68 && windDirection < 113) {
    wDrectionTxt = "남풍";
  } else if (windDirection >= 113 && windDirection < 158) {
    wDrectionTxt = "남동풍";
  } else if (windDirection >= 158 && windDirection < 203) {
    wDrectionTxt = "동풍";
  } else if (windDirection >= 203 && windDirection < 248) {
    wDrectionTxt = "북동풍";
  } else if (windDirection >= 248 && windDirection < 293) {
    wDrectionTxt = "북풍";
  } else if (windDirection >= 293 && windDirection < 338) {
    wDrectionTxt = "북서풍";
  } else {
    wDrectionTxt = "서풍";
  }

  /* DOM El */
  const nameEl = document.querySelector(".city_name");
  const descEl = document.querySelector(".desc");
  const iconEl = document.querySelector(".icon");
  const tempEl = document.querySelector(".temp");
  const feelTempEl = document.querySelector(".feel-temp");
  const windEl = document.querySelector(".w-speed");
  const wDirectionEl = document.querySelector(".w-direction");
  const humidityEl = document.querySelector(".humidity");

  /* DOM요소 조작 */
  nameEl.innerHTML = name;
  descEl.innerHTML = desc;
  iconEl.innerHTML = `<img src="${iconurl}" alt="아이콘">`;
  tempEl.innerHTML = `${temp} &deg;c`;
  feelTempEl.innerHTML = `체감온도 : ${feelTemp} &deg;c`;
  windEl.innerHTML = `${wind} <small>m/s</small>`;
  wDirectionEl.innerHTML = wDrectionTxt;
  humidityEl.innerHTML = `${humidity} <small>%</small>`;

  /* 배경 동영상 변경 */
  const bgEl = document.querySelector("video");
  let bgSrc = "./src/videos/snow-bg.mp4";
  if (icon == "01d") {
    bgSrc = "./src/videos/clean-d-bg.mp4";
  } else if (icon == "01n") {
    bgSrc = "./src/videos/clean-n-bg.mp4";
  } else if (icon == "02d" || icon == "03d" || icon == "04d") {
    bgSrc = "./src/videos/cloud-d-bg.mp4";
  } else if (icon == "02n" || icon == "03n" || icon == "04n") {
    bgSrc = "./src/videos/cloud-n-bg.mp4";
  } else if (
    icon == "09d" ||
    icon == "09n" ||
    icon == "10d" ||
    icon == "10n" ||
    icon == "11d" ||
    icon == "11n"
  ) {
    bgSrc = "./src/videos/rain-bg.mp4";
  } else if (icon == "13d" || icon == "13n") {
    bgSrc = "./src/videos/snow-bg.mp4";
  } else if (icon == "50d" || icon == "50n") {
    bgSrc = "./src/videos/mist-bg.mp4";
  } else {
    bgSrc = "./src/videos/clean-d-bg.mp4";
  }

  bgEl.setAttribute("src", bgSrc);
}

function showWeatherData2(data2) {}

function showAirpollution(data3) {
  const pm10 = Math.round(data3.list[0].components.pm10 * 10) / 10;
  const pm2_5 = Math.round(data3.list[0].components.pm2_5 * 10) / 10;

  const pm10El = document.querySelector(".pm10");
  const pm2_5El = document.querySelector(".pm2-5");

  pm10El.innerHTML = `${pm10} <small>㎍/㎥</small>`;
  pm2_5El.innerHTML = `${pm2_5} <small>㎍/㎥</small>`;

  /* 미세먼지 이미지 변경 */
  const pm10ImgEl = document.querySelector(".pm10-img");
  const pm2_5ImgEl = document.querySelector(".pm2-5-img");
  let pm10ImgSrc = "./src/images/good-icon.svg";
  let pm2_5ImgSrc = "./src/images/good-icon.svg";

  if (pm10 <= 30) {
    pm10ImgSrc = "./src/images/good-icon.svg";
  } else if (pm10 > 30 && pm10 <= 80) {
    pm10ImgSrc = "./src/images/normal-icon.svg";
  } else if (pm10 > 80 && pm10 <= 150) {
    pm10ImgSrc = "./src/images/bad-icon.svg";
  } else if (pm10 > 150) {
    pm10ImgSrc = "./src/images/very-bad-icon.svg";
  } else {
    pm10ImgSrc = "./src/images/good-icon.svg";
  }

  if (pm2_5 <= 15) {
    pm2_5ImgSrc = "./src/images/good-icon.svg";
  } else if (pm2_5 > 15 && pm2_5 <= 35) {
    pm2_5ImgSrc = "./src/images/normal-icon.svg";
  } else if (pm2_5 > 35 && pm2_5 <= 75) {
    pm2_5ImgSrc = "./src/images/bad-icon.svg";
  } else if (pm2_5 > 75) {
    pm2_5ImgSrc = "./src/images/very-bad-icon.svg";
  } else {
    pm2_5ImgSrc = "./src/images/good-icon.svg";
  }

  pm10ImgEl.setAttribute("src", pm10ImgSrc);
  pm2_5ImgEl.setAttribute("src", pm2_5ImgSrc);
}

// 현재위치
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  let pos = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  getCurrentWeatherData(pos.lat, pos.lon);
}

function getCurrentWeatherData(lat, lon) {
  // 도시명 업데이트
  API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  API_URL3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(API_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      showWeatherData(data);
    });
  fetch(API_URL2)
    .then(function (res) {
      return res.json();
    })
    .then(function (data2) {
      console.log(data2);
      showWeatherData2(data2);
    });
  fetch(API_URL3)
    .then(function (res) {
      return res.json();
    })
    .then(function (data3) {
      console.log(data3);
      showAirpollution(data3);
    });
} // getCurrentWeatherData

getLocation();
