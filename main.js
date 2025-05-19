const apiKey = "bbbfca42067213863708af64da4275bd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.getElementsByClassName("body");

// Logic to dynamically update background image;
const updateBackgroundImage = (city) => {
    const cityImages = {
        "Chile": "./bg-chile.jpg",
        "England": "./bg-England.jpg",
        "Italy": "./bg-Italy.jpg",
        "Polynesia": "./bg-Polynesia.jpg",
        "Finland": "./bg-finland.jpg"
    };
    document.body.style.backgroundImage = `url(${cityImages[city] || "./bg-finland.jpg"})`;
}


// Fetching weather data from an external API(openWeatherMap);
async function checkWeather(city){
    try{
        
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
     
    const iconCode = data.weather[0].icon;
    if(data.weather[0].main == "Clear"){
        weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png"
    }
    else if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "https://openweathermap.org/img/wn/02d@2x.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png"
    }else{
        checkWeather(city)
    }

    // animation added to have a modern looking UI;

    document.querySelector(".temp").style.transform = "scale(1.1)";
    setTimeout(() =>{
        document.querySelector(".temp").style.transform = "scale(1)"
    }, 300)

    updateBackgroundImage(data.name);

    // Error Handling;
}catch(error){
        console.error(error)
        document.querySelector(".city").innerHTML = "City not found!";

        document.querySelector(".temp").innerHTML = `<span class="error">--</span>`;
        document.querySelector(".city").innerHTML = "City not found!";
        document.querySelector(".humidity").innerHTML = `<span class="error">--</span>`;
        document.querySelector(".wind").innerHTML = `<span class="error">--</span>`;
    }

}
searchBtn.addEventListener("click", () =>{
    checkWeather(searchInput.value)
})

checkWeather("Finland");











