import React, { useState } from 'react';
import '../styles/sidebar.css'

const Sidebar = ({ handleTitleClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSubheaderClick = () => {
    setShowOptions(!showOptions);
  };

  const handleClick = (title) => {
    console.log('Clicked title:', title); // Log the clicked title
    handleTitleClick(title); // Call handleTitleClick with the title
  };


  return (
    <div className="sidebar">
      {/* Options for font size and font color */}
      {showOptions && (
        <div className="options">
          <label htmlFor="fontSize">Font Size:</label>
          <input type="text" id="fontSize" />
          <label htmlFor="fontColor">Font Color:</label>
          <input type="text" id="fontColor" />
        </div>
      )}

      {/* Navigation items */}
      <nav>
        <ul className="nav">
          
          <li className="nav-item" onClick={() => handleClick('Title')}>
            Title
          </li>
          <li className="nav-item" >Price</li>
          <li className="nav-item">Feature</li>
        </ul>
      </nav>
    </div>
  );
};


const Sidebar1 = ({ handlePriceClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSubheaderClick = () => {
    setShowOptions(!showOptions);
  };

  const handleClick1 = (price) => {
    console.log('Clicked price:', price); // Log the clicked price
    handlePriceClick(price); // Call handleTitleClick with the price
  };

  return (
    <div className="sidebar1">
      {/* Options for font size and font color */}
      {showOptions && (
        <div className="options">
          <label htmlFor="fontSize">Font Size:</label>
          <input type="text" id="fontSize" />
          <label htmlFor="fontColor">Font Color:</label>
          <input type="text" id="fontColor" />
        </div>
      )}

      {/* Navigation items */}
      <nav>
        <ul className="nav">
          
          <li className="nav-item">
            Title
          </li>
          <li className="nav-item" onClick={() => handleClick1('Price')}>Price</li>
          <li className="nav-item">Feature</li>
        </ul>
      </nav>
    </div>
  );
};


export default {Sidebar,Sidebar1};

