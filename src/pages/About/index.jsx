import React from "react";
import "./About.css";

function About() {
  return (
    <div className="container">
      <h2>Meet The Dev</h2>
      <div className="picture">
        <img className="picture" src="../../../../public/images/manu.jpeg"/>
        <a
          href="https://github.com/mfvancin"
          target="_blank"
          className="button"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/manuele-vancin/"
          target="_blank"
          className="button"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default About;
