import React from "react";
import "./About.css";

function About() {
  return (
    <div className="container">
      <h2>Meet The Dev</h2>
      <div>
        <a
          href="https://github.com/mfvancin"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/manuele-vancin-80793b2b1"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default About;
