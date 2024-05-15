import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyPlaces.css";
import AddCity from "../Add/Index";

const API_KEY = "7bb7d3b36d456fadf0a0956b1dfd752c";

function MyPlaces() {
  const [cities, setCities] = useState([]);
  const [editedCityIndex, setEditedCityIndex] = useState(null); 
  const [editedCityName, setEditedCityName] = useState(""); 
  const [showAddCity, setShowAddCity] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const { data } = response;
        const cityWeather = {
          name: cityName,
          temperature: data.list[0].main.temp,
          weatherDescription: data.list[0].weather[0].description,
          icon: getWeatherIcon(data.weather[0].main),
        };
        setCities((prevCities) => [...prevCities, cityWeather]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    cities.forEach((city) => fetchWeatherData(city));
  }, []);

  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case "Clear":
        return "src/images/sunny.png";
      case "Clouds":
        return "src/images/cloudy.png";
      case "Rain":
      case "Drizzle":
        return "src/images/rainy.png";
      case "Snow":
        return "src/images/snowy.png";
    }
  };

  const handleEdit = (index) => {
    setEditedCityIndex(index); 
    setEditedCityName(cities[index]); 
  };

  const handleSaveEdit = async () => {
    if (editedCityName.trim() !== "") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${editedCityName}&appid=${API_KEY}&units=metric`
        );
        const { data } = response;
        const updatedCity = {
          name: editedCityName,
          temperature: data.main.temp,
          weatherDescription: data.weather[0].description,
          icon: getWeatherIcon(data.weather[0].main),
        };
        const updatedCities = [...cities];
        updatedCities[editedCityIndex] = updatedCity; 
        setCities(updatedCities);
        setEditedCityIndex(null); 
        setEditedCityName(""); 
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditedCityIndex(null); 
    setEditedCityName(""); 
  };

  const handleDelete = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  const handleAddCity = async (newCity) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${API_KEY}&units=metric`
      );
      const { data } = response;
      const cityWeather = {
        name: newCity,
        temperature: data.main.temp,
        weatherDescription: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].main),
      };
      setCities([...cities, cityWeather]);
      setShowAddCity(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      {cities.map((city, index) => (
        <div key={index} className="city-container">
          {editedCityIndex === index ? ( 
            <div>
              <input
                type="text"
                value={editedCityName}
                onChange={(e) => setEditedCityName(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>{city.name}</h2>
              <p>Temperature: {city.temperature}°C</p>
              <p>Weather: {city.weatherDescription}</p>
              <img 
                src={city.icon} 
                alt="Weather Icon" 
                className="weather-image-large" 
              />
            </div>
          )}
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
      {showAddCity && (
        <div>
          <AddCity onAddCity={handleAddCity} />
        </div>
      )}
      <button className="add-city-button" onClick={() => setShowAddCity(!showAddCity)}>
        {showAddCity ? "Cancel" : "Add City"}
      </button>
      {cities.length > 0}
    </div>
  );
}

export default MyPlaces;
