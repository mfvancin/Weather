import React, { useState } from "react";
import { Link } from "react-router-dom";
import CityPage from "../CityPage/Index";
import "./MyPlaces.css";

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
      <h2>My Favorite Weather Cities</h2>
      {cities.map((city, index) => (
        <Link key={index} to={"../CityPage/Index"} className="city-link">
          <CityPage
            cityName={city}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        </Link>
      ))}
    </div>
  );
}

export default MyPlaces;
