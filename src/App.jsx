import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Index"; 
import Footer from "./components/Footer/Index"; 

import Homepage from "./pages/Homepage/Index";
import MyPlaces from "./pages/MyPlaces/Index";
import Add from "./pages/Add/Index";
import About from "./pages/About/Index";


function App() {

  return(
    <div>
    <Header className="header"/>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/MyPlaces" element={<MyPlaces/>} />
      <Route path="/Add" element={<Add/>} />
      <Route path="/About" element={<About/>} />
    </Routes>
    <Footer className="footer"/>
    </div>
  );
}

export default App;
