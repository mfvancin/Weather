import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CityPage.css"; 

function CityPage({ cities, setCities }) {
  const { cityName } = useParams(); 
  const [newCityName, setNewCityName] = useState(""); 

  const handleEdit = () => {
    console.log("Edit city:", cityName);
  };

  const handleDelete = () => {
    const updatedCities = cities.filter(city => city !== cityName);
    setCities(updatedCities);
    window.location.href = "/my-places";
  };

  const handleAddCity = () => {
    setCities(prevCities => [...prevCities, newCityName]);
    setNewCityName(""); 
  };

  return (
    <div>
      <h2>{cityName}</h2>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <div>
        <input
          type="text"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          placeholder="Enter new city name"
        />
        <button onClick={handleAddCity}>Add City</button>
      </div>
    </div>
  );
}

export default CityPage;
