import React from "react";
import "./City.css";

function City({ cityName, onEdit, onDelete }) {
  return (
    <div className="city">
      <span>{cityName}</span>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default City;
