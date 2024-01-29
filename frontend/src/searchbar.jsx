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

// export default SearchBar;
// // 

// import React, { Component } from 'react';

// class SearchBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchTerm: '',
//       suggestions: [],
//     };
//   }

//   handleSearchChange = (e) => {
//     const searchTerm = e.target.value;
//     // Here you can make an API call to get suggestions based on the search term
//     // For this example, I'll use a simple array of suggestions.
//     const suggestions = [
//       'Apple',
//       'Banana',
//       'Cherry',
//       'Durian',
//       'Elderberry',
//       'Fig',
//       'Grape',
//       'Honeydew',
//       'Kiwi',
//       'Lemon',
//     ].filter(suggestion =>
//       suggestion.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     this.setState({ searchTerm, suggestions });
//   };

//   render() {
//     return (
//       <div>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={this.state.searchTerm}
//           onChange={this.handleSearchChange}
//         />
//         <ul>
//           {this.state.suggestions.map((suggestion, index) => (
//             <li key={index}>{suggestion}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default SearchBar;
