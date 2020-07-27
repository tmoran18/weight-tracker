import React, { useState, useEffect } from "react";

const Input = ({ onChange, title }) => {
  return (
    <div>
      <label htmlFor="title">{title}</label>
      <input
        type="text"
        name="weight"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
