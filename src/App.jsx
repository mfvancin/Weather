import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import FullScreenForecast from "./components/FullScreen";

import Homepage from "./pages/Homepage";
import MyPlaces from "./pages/MyPlaces";
import Add from "./pages/Add";
import About from "./pages/About";

function App() {

  return(
    <div>
    <Header className="header"/>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/MyPlaces" element={<MyPlaces/>} />
      <Route path="/forecast/:cityName" element={<FullScreenForecast />} />
      <Route path="/Add" element={<Add/>} />
      <Route path="/About" element={<About/>} />
    </Routes>
    <Footer className="footer"/>
    </div>
  );
}

export default App;
