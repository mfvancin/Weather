import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Add.css";

const AddCity = ({ onAddCity }) => {
  const [cityName, setCityName] = useState("");

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCity(cityName);
  };

  useEffect(() => {
    if (cityName) {}
  }, [cityName]);

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
          <Link to="/MyPlaces">Add</Link>
        </button>
      </form>
    </div>
  );
};

export default AddCity;
