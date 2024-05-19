import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FullScreen.css";
import { useLocation, Link } from "react-router-dom";

const API_KEY = "7bb7d3b36d456fadf0a0956b1dfd752c";

const FullScreenForecast = ({  onBack }) => {
  const [forecastData, setForecastData] = useState(null);
  const location = useLocation()
  const {cityName} = location.state


  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        setForecastData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [cityName]);

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "/images/sunny.png";
      case "Clouds":
        return "/images/cloudy.png";
      case "Rain":
      case "Drizzle":
        return "/images/rainy.png";
      case "Snow":
        return "/images/snowy.png";
      case "Wind":
        return "/images/windy.png";
      default:
        return "/images/default.png";
    }
  };

  return (
    <div className="full-screen-container">
      <Link to="/myplaces">
      <button className="back-button">Back</button>
      </Link>
      {forecastData && (
        <div>
          <h2 className="city-name">{cityName}</h2>
          <div className="forecast-container">
            {forecastData.list.slice(0, 7).map((forecast, index) => (
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

export default FullScreenForecast;
