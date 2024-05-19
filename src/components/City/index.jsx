import React, { useState, useEffect } from "react";
import axios from "axios";
import "./City.css";
import Sunny from "../../../public/images/sunny.png";
import Cloudy from "../../../public/images/cloudy.png";
import Rainy from "../../../public/images/rainy.png";
import Snowy from "../../../public/images/snowy.png";
import Windy from "../../../public/images/windy.png";
import Default from "../../../public/images/default.png";

const API_KEY = "7bb7d3b36d456fadf0a0956b1dfd752c";

const City = ({ cityName }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [cityName]);

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return Sunny;
      case "Clouds":
        return Cloudy;
      case "Rain":
      case "Drizzle":
        return Rainy;
      case "Snow":
        return Snowy;
        case "Wind":
          return Windy;
        default:
          return Default;
    }
  };

  return (
    <div className="city-container">
      {forecastData && (
        <div>
          <h2 className="city-name">{cityName}</h2>
          <div className="forecast-container">
            {forecastData.list.slice(0, 8).map((forecast, index) => (
              <div key={index} className="forecast-item">
                <img
                  src={getWeatherImage(forecast.weather[0].main)}
                  alt="Weather"
                  className="weather-image-large"
                />
                <p>Date: {forecast.dt_txt}</p>
                <p>Temperature: {forecast.main.temp}°C</p>
                <p>Weather: {forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default City;
