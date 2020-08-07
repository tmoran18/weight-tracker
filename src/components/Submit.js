import React from "react";

const Submit = ({ handleSubmit }) => {
  return (
    <div className="submit_btn_container">
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Submit;
