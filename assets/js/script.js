const search = document.querySelector('.weather__search');
const city = document.querySelector('.weather__city');
const capital = document.querySelector('.weather__capital');
const country = document.querySelector('.weather__country');
const date = document.querySelector('.weather__date');
const temperature = document.querySelector('.weather__temperature');
const value = document.querySelector('.value');
const desc = document.querySelector('.weather_desc');
const visibility = document.querySelector('.weather__visibility span');
const wind = document.querySelector('.weather__wind span');
const moisture = document.querySelector('.weather__moisture span');
const content = document.querySelector('.weather__content');
const body = document.querySelector('body');
async function changeWeather() {
    let capitalValue = search.value.trim();
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue}&appid=383b263b50fd9c78946b99be1c60afe8`
    let data = await fetch(apiURL).then(function (res) {
        return res.json();
    })
    if (data.cod == 200) {
        content.classList.remove('hide');
        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        moisture.innerText = data.main.humidity + '%';
        let currTemp = Math.round(data.main.temp - 273.15);
        value.innerText = currTemp + ' °C';
        desc.innerText = data.weather[0] ? data.weather[0].main : '';
        date.innerText = new Date().toLocaleString('vi');

        body.setAttribute('class', 'warm');

        if (currTemp < 20) {
            body.setAttribute('class', 'cold');
        } else if (currTemp > 20 && currTemp < 25) {
            body.setAttribute('class', 'cool');
        } else if (currTemp > 25 && currTemp < 30) {
            body.setAttribute('class', 'warm');
        } else if (currTemp > 30) {
            body.setAttribute('class', 'hot');
        }




    } else {
        content.classList.add('hide');
    }

}

search.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        changeWeather();
    }
})


