import Search from "./SearchForm/Search";
import { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = (cityName, clearInput) => {
    const apiKey = "bf67762e3da7cc23b0d4605cdc37120e";
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    fetch(apiUrl + cityName + `&appid=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid city name,please enter the valid one");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(null);
        clearInput();
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
        setWeatherData(null);
      });
  };
  // 根據天氣情況返回相應的圖片路徑
  const getWeatherImage = (weather) => {
    switch (weather) {
      case "Clear":
        return "/images/clear.png";
      case "Clouds":
        return "/images/clouds.png";
      case "Rain":
        return "/images/rain.png";
      case "Snow":
        return "/images/snow.png";
      case "Thunderstorm":
        return "/images/thunderstorm.png";
      case "Drizzle":
        return "/images/drizzle.png";
      default:
        return "/images/default.png";
    }
  };
  return (
    <div className="card">
      <Search handleSubmit={handleSubmit} />
      {error && <p className="error"> {error} </p>}
      {weatherData && (
        <div className="weather">
          <img
            className="weather-image"
            src={getWeatherImage(weatherData.weather[0].main)}
            alt="weather image"
          />
          <h1 className="temp"> {Math.round(weatherData.main.temp)}°C </h1>
          <h2 className="city"> {weatherData.name} </h2>
          <div className="details">
            <div className="box">
              <img src="/images/humidity.png" alt="humidity image" />
              <div>
                <p className="humidity"> {weatherData.main.humidity} % </p>
                <p> Humidity </p>
              </div>
            </div>
            <div className="box">
              <img src="/images/wind.png" alt="wind speed image" />
              <div>
                <p className="wind-speed">
                  {weatherData.wind.speed}
                  km / h
                </p>
                <p> Wind speed </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
