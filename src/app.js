/* app.js */

const API_KEY = "2e7bdc741e08b8849666468a83a0040c";
let lat = 37.5683;
let lon = 126.9778;
let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
let API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
let API_URL3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

function getWeatherData(lat = "37.5683", lon = "126.9778") {
  API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
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
      // console.log(data2);
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

function showWeatherData2(data2) {
  /* let dtNow = Math.floor(new Date().getTime() / 1000);
  let td = 9 * 60 * 60;
  let dtKr = dtNow + td; */

  // 시간별 예보
  // 시간정보
  let timeData = [
    data2.list[3].dt_txt.slice(11, 13),
    data2.list[4].dt_txt.slice(11, 13),
    data2.list[5].dt_txt.slice(11, 13),
    data2.list[6].dt_txt.slice(11, 13),
    data2.list[7].dt_txt.slice(11, 13),
    data2.list[8].dt_txt.slice(11, 13),
  ];

  let time1El = document.querySelector(".content1 .time");
  let time2El = document.querySelector(".content2 .time");
  let time3El = document.querySelector(".content3 .time");
  let time4El = document.querySelector(".content4 .time");
  let time5El = document.querySelector(".content5 .time");
  let time6El = document.querySelector(".content6 .time");

  time1El.innerHTML = timeData[0] + "시";
  time2El.innerHTML = timeData[1] + "시";
  time3El.innerHTML = timeData[2] + "시";
  time4El.innerHTML = timeData[3] + "시";
  time5El.innerHTML = timeData[4] + "시";
  time6El.innerHTML = timeData[5] + "시";

  // 시간별 아이콘
  let iconData = [
    data2.list[3].weather[0].icon,
    data2.list[4].weather[0].icon,
    data2.list[5].weather[0].icon,
    data2.list[6].weather[0].icon,
    data2.list[7].weather[0].icon,
    data2.list[8].weather[0].icon,
  ];
  let icon1El = document.querySelector(".content1 img");
  let icon2El = document.querySelector(".content2 img");
  let icon3El = document.querySelector(".content3 img");
  let icon4El = document.querySelector(".content4 img");
  let icon5El = document.querySelector(".content5 img");
  let icon6El = document.querySelector(".content6 img");

  icon1El.setAttribute("src", `./src/images/weather-icons/${iconData[0]}.svg`);
  icon2El.setAttribute("src", `./src/images/weather-icons/${iconData[1]}.svg`);
  icon3El.setAttribute("src", `./src/images/weather-icons/${iconData[2]}.svg`);
  icon4El.setAttribute("src", `./src/images/weather-icons/${iconData[3]}.svg`);
  icon5El.setAttribute("src", `./src/images/weather-icons/${iconData[4]}.svg`);
  icon6El.setAttribute("src", `./src/images/weather-icons/${iconData[5]}.svg`);

  // 시간별 온도
  let tempCastData = [
    Math.round((data2.list[3].main.temp - 273.15) * 10) / 10,
    Math.round((data2.list[4].main.temp - 273.15) * 10) / 10,
    Math.round((data2.list[5].main.temp - 273.15) * 10) / 10,
    Math.round((data2.list[6].main.temp - 273.15) * 10) / 10,
    Math.round((data2.list[7].main.temp - 273.15) * 10) / 10,
    Math.round((data2.list[8].main.temp - 273.15) * 10) / 10,
  ];

  let temp1El = document.querySelector(".content1 .temp-cast");
  let temp2El = document.querySelector(".content2 .temp-cast");
  let temp3El = document.querySelector(".content3 .temp-cast");
  let temp4El = document.querySelector(".content4 .temp-cast");
  let temp5El = document.querySelector(".content5 .temp-cast");
  let temp6El = document.querySelector(".content6 .temp-cast");

  temp1El.innerHTML = `${tempCastData[0]}&deg;c`;
  temp2El.innerHTML = `${tempCastData[1]}&deg;c`;
  temp3El.innerHTML = `${tempCastData[2]}&deg;c`;
  temp4El.innerHTML = `${tempCastData[3]}&deg;c`;
  temp5El.innerHTML = `${tempCastData[4]}&deg;c`;
  temp6El.innerHTML = `${tempCastData[5]}&deg;c`;

  // 주간 날씨
  let wIconData = [
    data2.list[10].weather[0].icon,
    data2.list[18].weather[0].icon,
    data2.list[26].weather[0].icon,
  ];

  let wIcon1El = document.querySelector(".w-icon1 img");
  let wIcon2El = document.querySelector(".w-icon2 img");
  let wIcon3El = document.querySelector(".w-icon3 img");

  wIcon1El.setAttribute(
    "src",
    `./src/images/weather-icons/${wIconData[0]}.svg`
  );
  wIcon2El.setAttribute(
    "src",
    `./src/images/weather-icons/${wIconData[1]}.svg`
  );
  wIcon3El.setAttribute(
    "src",
    `./src/images/weather-icons/${wIconData[2]}.svg`
  );

  // 주간 기온&체감
  let wTempData = [
    Math.round(data2.list[10].main.temp - 273.15),
    Math.round(data2.list[18].main.temp - 273.15),
    Math.round(data2.list[26].main.temp - 273.15),
  ];
  let wFeelTempData = [
    Math.round(data2.list[10].main.feels_like - 273.15),
    Math.round(data2.list[18].main.feels_like - 273.15),
    Math.round(data2.list[26].main.feels_like - 273.15),
  ];

  let wTemp1El = document.querySelector(".w-temp1");
  let wTemp2El = document.querySelector(".w-temp2");
  let wTemp3El = document.querySelector(".w-temp3");

  wTemp1El.innerHTML = `${wTempData[0]}/${wFeelTempData[0]}&deg;c`;
  wTemp2El.innerHTML = `${wTempData[1]}/${wFeelTempData[1]}&deg;c`;
  wTemp3El.innerHTML = `${wTempData[2]}/${wFeelTempData[2]}&deg;c`;

  // 주간 강수확률
  let wPopData = [
    Math.round(data2.list[10].pop * 100 * 100) / 100,
    Math.round(data2.list[18].pop * 100 * 100) / 100,
    Math.round(data2.list[26].pop * 100 * 100) / 100,
  ];

  let wPop1El = document.querySelector(".w-pop1");
  let wPop2El = document.querySelector(".w-pop2");
  let wPop3El = document.querySelector(".w-pop3");

  wPop1El.innerHTML = `${wPopData[0]}<small>%</small>`;
  wPop2El.innerHTML = `${wPopData[1]}<small>%</small>`;
  wPop3El.innerHTML = `${wPopData[2]}<small>%</small>`;
}

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

// 날짜정보
let today = new Date();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();
let hh = today.getHours();
let mm = today.getMinutes();

let dayTxt = ["일", "월", "화", "수", "목", "금", "토"];

if (hh < 10) {
  hh = "0" + hh;
}
if (mm < 10) {
  mm = "0" + mm;
}

const dateEl = document.querySelector("#date");
const timeEl = document.querySelector("#time");

dateEl.innerHTML = `${month}.${date}(${dayTxt[day]})`;
timeEl.innerHTML = `${hh}:${mm}`;

// 주간예보 날짜정보
const date1El = document.querySelector(".week-table .date1");
const date2El = document.querySelector(".week-table .date2");
const date3El = document.querySelector(".week-table .date3");

let dayNum1 = day + 1;
let dayNum2 = day + 2;
let dayNum3 = day + 3;

if (dayNum1 >= 7) {
  dayNum1 = dayNum1 - 7;
}
if (dayNum2 >= 7) {
  dayNum2 = dayNum2 - 7;
}
if (dayNum3 >= 7) {
  dayNum3 = dayNum3 - 7;
}

date1El.innerHTML = `${month}.${date + 1}(${dayTxt[dayNum1]})`;
date2El.innerHTML = `${month}.${date + 2}(${dayTxt[dayNum2]})`;
date3El.innerHTML = `${month}.${date + 3}(${dayTxt[dayNum3]})`;

// 도시 선택하기
const select = document.getElementById("city-list");
let citySelect = "seoul";

select.addEventListener("change", function (e) {
  // console.log("목록변경", this.value);
  citySelect = e.target.value;
  if (citySelect == "this-position") {
    getLocation();
  } else if (citySelect == "seoul") {
    lat = 37.5683;
    lon = 126.9778;
  } else if (citySelect == "incheon") {
    lat = 37.45;
    lon = 126.4161;
  } else if (citySelect == "busan") {
    lat = 35.1028;
    lon = 129.0403;
  } else if (citySelect == "daegu") {
    lat = 35.8;
    lon = 128.55;
  } else if (citySelect == "gwangju") {
    lat = 35.155;
    lon = 126.916;
  } else if (citySelect == "daejeon") {
    lat = 36.3333;
    lon = 127.41678;
  } else if (citySelect == "jeju") {
    lat = 33.5097;
    lon = 126.5219;
  }
  getWeatherData(lat, lon);
});

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
  lat = pos.lat;
  lon = pos.lon;

  getWeatherData(lat, lon);
}

getLocation();
