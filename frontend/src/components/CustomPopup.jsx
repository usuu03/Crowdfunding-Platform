import React from "react";

function CustomPopup({ closePopup }) {
  return (
    <div className="custom-popup-overlay">
      <div className="custom-popup">
        <p>
          On this page, you will encounter a range of categories to choose from
          to find the campaigns that matter to you. Make use of the dropdowns to
          filter between the available categories and regions available. Once
          you find the Campaign you are looking for, simply click on the box to
          find out more information!
        </p>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default CustomPopup;
