const apiKey = "0008afaa20761ce0b1af141f2a2bd2bc";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city){
    const resp = await fetch(url(city),{mode:"cors"});
    const respData = await resp.json();
    addWeatheToPage(respData);

}

function addWeatheToPage(data){
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div')
    weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small>${data.weather[0].main}</small>
    `;
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K){
    return Math.floor(K-273.15);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city = search.value;
    if(city){
        getWeatherByLocation(city)
    }
});