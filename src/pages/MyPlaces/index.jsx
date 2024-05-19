import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "./MyPlaces.css";
import AddCity from "../Add";
import FullScreenForecast from "../../components/FullScreen";

const API_KEY = "7bb7d3b36d456fadf0a0956b1dfd752c";

function MyPlaces() {
  const [cities, setCities] = useState([]);
  const [editedCityIndex, setEditedCityIndex] = useState(null);
  const [editedCityName, setEditedCityName] = useState("");
  const [showAddCity, setShowAddCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityProps, setCityProps] = useState("")

  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const  data  = response.data
        const cityWeather = {
          name: data.city.name,
          temperature: data.list[0].main.temp,
          weatherDescription: data.list[0].weather[0].description,
          icon: getWeatherIcon(data.list[0].weather[0].main),
        };
        setCities((prevCities) => [...prevCities, cityWeather]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    cities.forEach((city) => fetchWeatherData(city.name));
  }, []);

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return "public/images/sunny.png";
      case "Clouds":
        return "public/images/cloudy.png";
      case "Rain":
      case "Drizzle":
        return "public/images/rainy.png";
      case "Snow":
        return "public/images/snowy.png";
      case "Wind":
        return "public/images/windy.png";
      default:
        return "public/images/default.png";
    }
  };

  const handleEdit = (index) => {
    setEditedCityIndex(index);
    setEditedCityName(""); 
  };

  const handleSaveEdit = async () => {
    if (editedCityName.trim() !== "") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${editedCityName}&appid=${API_KEY}&units=metric`
        );
        const { data } = response;
        const updatedCities = cities.map((city, index) => {
          if (index === editedCityIndex) {
            return {
              ...city,
              name: editedCityName,
              temperature: data.main.temp,
              weatherDescription: data.weather[0].description,
              icon: getWeatherIcon(data.weather[0].main),
            };
          }
          return city;
        });
        setCities(updatedCities);
        localStorage.setItem("cities", JSON.stringify(updatedCities));
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
    localStorage.setItem("cities", JSON.stringify(newCities));
  };
  
  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    setCities(storedCities);
  }, []);
  
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
      setCityProps(newCity);
      const updatedCities = [...cities, cityWeather];
      setCities(updatedCities);
      localStorage.setItem("cities", JSON.stringify(updatedCities));
      setShowAddCity(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  
  return (
    <div>
        <div>
          {cities.map((city, index) => (
            <div key={index} className="city-container">
              {editedCityIndex === index ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter city name"
                    value={editedCityName}
                    onChange={(e) => setEditedCityName(e.target.value)}
                  />
                  <button className="save-cancel-button" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button className="save-cancel-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <h2>
                <Link to={`/forecast/${city.name}`} state={{ cityName: city.name }}>{city.name}</Link>
                </h2>
              )}
              {editedCityIndex !== index && (
                <div>
                  <img src={city.icon} alt="Weather Icon" className="weather-image-large" />
                  <p>Temperature: {city.temperature}°C</p>
                  <p>Weather: {city.weatherDescription}</p>
                  <button className="edit-delete-button" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="edit-delete-button" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          {showAddCity && <AddCity onAddCity={handleAddCity} />}
          <button className="add-city-button" onClick={() => setShowAddCity(!showAddCity)}>
            {showAddCity ? "Cancel" : "Add City"}
          </button>
        </div>

    </div>
  );
}

export default MyPlaces;
