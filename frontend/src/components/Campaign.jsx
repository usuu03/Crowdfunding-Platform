import React from "react";

const Campaign = ({ title, description }) => {
  return (
    <div className="campaign-box">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Campaign;
