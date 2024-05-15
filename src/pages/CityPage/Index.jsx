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
    window.location.href = "./MyPlaces";
  };

  const handleAddCity = () => {
    setCities(prevCities => [...prevCities, newCityName]);
    setNewCityName(""); 
  };

  return (
    <div>
      <h2>{cityName}</h2>
    </div>
  );
}

export default CityPage;
