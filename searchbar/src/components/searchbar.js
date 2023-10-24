// src/SearchBar.js
import React, { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // Initially, no option is selected

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <div className="dropdown">
        <button className="dropbtn" onClick={() => handleOptionSelect('')}>
          {selectedOption || 'Select an option'}
        </button>
        <div className={`dropdown-content ${selectedOption ? 'show' : ''}`}>
          <a href="#" onClick={() => handleOptionSelect('Option 1')}>Option 1</a>
          <a href="#" onClick={() => handleOptionSelect('Option 2')}>Option 2</a>
          <a href="#" onClick={() => handleOptionSelect('Option 3')}>Option 3</a>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
