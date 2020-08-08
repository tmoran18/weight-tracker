import React from "react";

const Stats = ({ weeklyLoss }) => {
  return (
    <div className="stats">
      <div>
        <span>Weekly Loss: </span>
        {Math.sign(weeklyLoss) === -1 ? (
          <span className="red" role="img" aria-label="sad emoji face">
            {`+${weeklyLoss.toString().substr(1)}KG`} 😢
          </span>
        ) : (
          <span className="green" role="img" aria-label="smiling emoji face">
            {`-${weeklyLoss}KG`} 😃
          </span>
        )}
        <span className="red"></span>
      </div>
    </div>
  );
};

export default Stats;
