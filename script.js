const searchBtn = document.getElementById('searchBtn');

const APIkey = '056e9bf8b8aa6eeeaf13178eaab49e66';
const cityURL0 = 'https://api.openweathermap.org/data/2.5/weather?q=';
const cityURL1 = '&appid=';
const uvURL0 = 'https://api.openweathermap.org/data/2.5/uvi?lat=';
const uvURL1 = '&lon=';
const uvURL2 = '&appid=';
const dayURL0 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const dayURL1 = '&appid=';
const imperial = '&units=imperial';

var citySearch = [];

function renderCityHistory(){
    var searchHistory = document.getElementById('searchHistory');
    searchHistory.innerHTML = "";
    
    for (var i = 0; i < citySearch.length; i++){
        var history = citySearch[i];
        var li = document.createElement("li");
        li.textContent = history;
        li.setAttribute("lastSearch", i);

        searchHistory.appendChild(li);
    }
}

function storeCityHistory(){
    localStorage.setItem('citySearch', JSON.stringify(citySearch))
}

//function that checks if input is already stored in localStorage

function init(){
    var storedCities = JSON.parse(localStorage.getItem('citySearch'));

    if (storedCities !== null){
        citySearch = storedCities;
    }

    renderCityHistory();
}

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;

    citySearch.push(searchInput);
    searchInput.value = "";

    currentWeather(searchInput);
    fiveDayForecast(searchInput);
    storeCityHistory();
    renderCityHistory();
});

function currentWeather(city){
    var url = cityURL0 + city + cityURL1 + APIkey + imperial;
    console.log(url);

    fetch(url)
        .then(function(data){
            return data.json();
        })

        .then(function(response){
            console.log(response);
            document.getElementById('cityTitle').textContent = response.name;
            document.getElementById('temp').textContent = "Temperature: " + response.main.temp + "F";
            document.getElementById('humidity').textContent = "Humidity: " + response.main.humidity + "%";
            document.getElementById('windSpeed').textContent = "Wind Speed: " + response.wind.speed + "mph";
            uvIndex(response.coord.lat, response.coord.lon);
        })
}

function uvIndex (lat, lon){
    var url = uvURL0 + lat + uvURL1 + lon + uvURL2 + APIkey;
    console.log(url)
    fetch(url)
        .then(function(data){
            return data.json();
        })

        .then(function(response){
            console.log(response)
            document.getElementById('UVIndex').textContent = "UV Index: " + response.value
        })
}

//Need to finish fiveDayForecast
function fiveDayForecast(city){
    var url = dayURL0 + city + dayURL1 + APIkey + imperial;
    console.log(url);
    fetch(url)
        .then(function(data){
            return data.json();
        })

        .then(function(response){
            console.log(response)
            for(i = 0; i < 40; i+=8){
                document.getElementById("date" + i).textContent = "Date: " + response.list[i].dt_txt.split(' ')[0];
                document.getElementById("temp" + i).textContent = "Temp: " + response.list[i].main.temp + "F";
                document.getElementById("hum" + i).textContent = "Humidity: " + response.list[i].main.humidity + "%";
            }
        })
}

init()