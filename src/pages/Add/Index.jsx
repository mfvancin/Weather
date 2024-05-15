import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Add.css";

const API_KEY = "7bb7d3b36d456fadf0a0956b1dfd752c"

function AddCity({ onAddCity }) {
    const [cityName, setCityName] = useState("");
    const [temperature, setTemperature] = useState(null);
  
    const handleChange = (e) => {
      setCityName(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
        );
        setTemperature(response.data.main.temp);
        onAddCity(cityName);
        setCityName("");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <div>
        <h2>New City</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={handleChange}
          />
          <button className="add-city-button" type="submit">
            Add
          </button>
        </form>
        {temperature !== null && (
          <p>Temperature in {cityName}: {temperature}F</p>
        )}
      </div>
    );
  }
  
  export default AddCity;