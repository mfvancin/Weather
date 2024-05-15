import React, { useState } from "react";
import axios from "axios";
import "./Homepage.css";

const API_KEY = "7bb7d3b36d456fadf0a0956b1dfd752c"

export default function Homepage() {
  const [cityName, setCityName] = useState("Lisboa");
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  React.useEffect(() => {
    axios.get(`${API_URL}`).then((response) => {
      setCityName(response.data);
      console.log(response.data)
    });
}, []);

  return (
    <div className="home-wrapper">
        <h1>Weather App</h1>
    </div>
  );
}