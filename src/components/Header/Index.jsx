import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1><img className="header-image" src="src/images/WeatherLogo.png"/></h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/MyPlaces" className="nav-link">
                MY PLACES
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-link">
                ABOUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
