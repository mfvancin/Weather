import React, { useState, useEffect } from 'react';
import './City.css'; 

const City = ({ cityName }) => {
  const [temperature, setTemperature] = useState(null);
  const API_KEY = "7bb7d3b36d456fadf0a0956b1dfd752c"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        const data = await response.json();
        setTemperature(data.temperature);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cityName]);

  return (
    <div className="city-container">
      <h2 className="city-name">{cityName}</h2>
      {temperature !== null ? <p className="temperature">Temperature: {temperature}°C</p> : <p>Loading...</p>}
    </div>
  );
};

export default City;
