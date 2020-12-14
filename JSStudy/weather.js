const weather = document.querySelector(".js-weather");

const API_KEY = "241051bf13976dd3ddadw41241231e";
const COORDS = "coords";

// 자바스크립트에서 요청을 보내고 정보를 받을 수 있다.

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5.weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // key 와 value 변수명이 같은 경우 아래와 같이 표현 가능
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoors() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null) {
        askForCoors();
    } else {
        // getWeather
        const parseCoords = JSON.parse(loadedCords)
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();