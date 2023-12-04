import React from "react";

const Campaign = ({ id, title, currentAmount, goal }) => {
  // Function to calculate the progress width
  const progressWidth = (current, goal) => {
    const progress = (current / goal) * 100;
    return `${progress}%`;
  };

  return (
    <div key={id} className="campaign-box">
      <div className="campaign-box-content">
        <div className="campaign-image">
          <img src="image-placeholder.jpg" alt="Campaign Image" />
        </div>
        <div id={`campaign-${id}`}>
          <h3>{title}</h3>
          <p>
            Raised: ${currentAmount} of ${goal}
          </p>
          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width: progressWidth(currentAmount, goal),
              }}
            ></div>
            <div className="btn-section">
              <button className="btn btn-light">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
