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

searchBtn.addEventListener('click', function(){
    const searchInput = document.getElementById('searchInput').value;
    console.log(searchInput);
    currentWeather(searchInput);
    fiveDayForecast(searchInput);
    renderCityHistory(searchInput);
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

function fiveDayForecast(city){
    var url = dayURL0 + city + dayURL1 + APIkey + imperial;
    console.log(url);
    fetch(url)
        .then(function(data){
            return data.json();
        })

        .then(function(response){
            console.log(response)
        })
}

function renderCityHistory(city){
    

    var searchHistory = document.getElementById('searchHistory');

    for (var i = 0; i < citySearch.length; i++){
        var history = citySearch[i];

        var li = document.createElement("li");
        li.textContent = history;
        li.setAttribute("lastSearch", i);

        li.appendChild(city)
        searchHistory.appendChild(li);
    }
}