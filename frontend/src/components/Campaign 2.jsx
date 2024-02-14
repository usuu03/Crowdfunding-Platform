import React from "react";

const Campaign = ({ id, title, currentAmount, goal, onDelete }) => {
  // Function to calculate the progress width
  const progressWidth = (current, goal) => {
    const progress = (current / goal) * 100;
    return `${progress}%`;
  };

  return (
    <div key={id} className="campaign">
      <div className="campaign-box-content">
        <div className="campaign-image">
          <img src="image-placeholder.jpg" alt="Campaign Image" />
        </div>
        <div id={`campaign-${id}`}>
          <h1>{id}</h1>
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
          </div>

          {/* <div className="btn-section">
            <button className="btn btn-warning" id="btn-edit">
              Edit
            </button>
            <button
              className="btn btn-danger"
              id="btn-delete"
              onClick={() => {
                console.log("Deleting campaign with ID:", id);
                onDelete();
              }}
            >
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Campaign;
