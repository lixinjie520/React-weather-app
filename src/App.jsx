import Search from "./SearchForm/Search";
import { useState } from "react";
import axios from "axios";
// import clear_img from "../public/images/clear.png";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function App() {
  // 儲存天氣資訊
  const [weatherData, setWeatherData] = useState(null);
  // 儲存錯誤資訊
  const [error, setError] = useState(null);

  const handleSubmit = (cityName, clearInput) => {
    if (!cityName.trim()) {
      setError("City name cannot be empty. Please enter a valid city name.");
      setWeatherData(null);
      return;
    }
    axios
      .get(`${apiUrl}${cityName}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
      .then((response) => {
        const data = response.data;
        setWeatherData(data);
        setError(null);
        // 清除input框
        clearInput();
        console.log(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Invalid city name, please enter a valid one");
        } else {
          setError("Error fetching the weather data");
        }
        setWeatherData(null);
      });
  };
  // 根據天氣情況返回相應的圖片路徑
  const getWeatherImage = (weather) => {
    const validWeatherTypes = [
      "clear",
      "clouds",
      "rain",
      "snow",
      "thunderstorm",
      "drizzle",
    ];

    const weatherIcon = `/images/${weather.toLowerCase()}.png`;

    return validWeatherTypes.includes(weather.toLowerCase())
      ? weatherIcon
      : "/images/clear.png";
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
                <p className="humidity"> {weatherData.main.humidity}%</p>
                <p> Humidity </p>
              </div>
            </div>
            <div className="box">
              <img src="/images/wind.png" alt="wind speed image" />
              <div>
                <p className="wind-speed">
                  {Math.floor(weatherData.wind.speed)}
                  km/h
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
