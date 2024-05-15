import React, { useState } from "react";
import { Link } from "react-router-dom";
import CityPage from "../CityPage/Index";
import "./MyPlaces.css";

import "../Add/Index.jsx"

function MyPlaces() {
  const [cities, setCities] = useState(["Lisbon", "São Paulo", "Tokyo"]);

  const handleEdit = (index) => {
    console.log("Edit city:", cities[index]);
  };

  const handleDelete = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  return (
    <div>
      {cities.map((index) => (
        <div key={index} className="city-container">
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
      <div>
      <Link to="/Add" className="add-city-button">
          Add City
      </Link>
      </div>
    </div>
  );
}

export default MyPlaces;
