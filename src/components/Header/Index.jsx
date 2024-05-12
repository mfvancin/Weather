import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Importando o arquivo de estilos CSS

function Header() {
  return (
    <header className="header">
      <div className="header-container container">
        <h1 className="header-title">The Weather Page</h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/MyPlaces" className="nav-link">
                My Places
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
