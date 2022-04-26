let weather = {
  apiKey: "3cbc00091f15563c987508a76341b977",
  fetchWeather: function (city){
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&appid=" 
      + this.apiKey
  )
    .then((Response) => Response.json())
    .then((data) => this.DisplayWeather(data));
  },
  DisplayWeather: function(data) {
    const {name} = data;
    const { icon, description} = data.weather[0];
    const { temp, humidity} = data.main;
    const { speed } = data.wind;
    
    /*
    const { visibility} = data.visibility;
    */
    console.log(name, icon, description, temp, humidity, speed)
    
    document.querySelector(".city").innerText = "Weather in " + name;
    
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
    
    document.querySelector(".description").innerText = description;
    
    document.querySelector(".temp").innerText = Math. round(temp-273) + "°C";
    
    /*
    document.querySelector(".temp").innerText = temp_min + "°C";
    */
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "m/s";
    
    /*
    document.querySelector(".visibility").innerText = "Visibility: " + speed + "km";
    */
    document.querySelector(".weather").classList.remove("loading");
    
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Varanasi");