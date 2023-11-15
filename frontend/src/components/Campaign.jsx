import React from "react";

const Campaign = ({ id, title, description }) => {
  return (
    <div className="campaign-box" key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Campaign;
