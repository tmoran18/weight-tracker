import React, { useState, useEffect } from "react";
import "../App.css";

const Input = ({ onChange, title, value, placeholder }) => {
  return (
    <div className="input_container">
      <label className="blue" htmlFor="title">
        {title}
      </label>
      <input
        type="text"
        name="weight"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        required
      />
      <span className="input_placeholder">{placeholder}</span>
    </div>
  );
};

export default Input;
