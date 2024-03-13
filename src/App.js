import React, { useState } from 'react';
import PricingCard from '../src/components/PricingCard';
import './App.css';
import '../src/styles/sidebar.css';

function App() {
  const [showContentButtons, setShowContentButtons] = useState(false);
  const [showTitleOptions, setShowTitleOptions] = useState(false); // State to track if title button is clicked
  const [selectedOption, setSelectedOption] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [fontStyle, setFontStyle] = useState('normal'); // Default font style
  const [fontColor, setFontColor] = useState('#000000'); // Default font color
  const [customStyles, setCustomStyles] = useState([
    {
      id: '1',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'normal',
      templateSize: '300px',
      templateColor: 'linear-gradient(-45deg,#35546d,#35546d)',
      iconClass: 'fa-paper-plane',
      title: 'BASIC',
      price: '25',
      features: ['5 GB Space', '2 Domain Names', '5 Email Address', 'No Live Support']
    },
    {
      id: '2',
      fontSize: '18px',
      color: '#ffffff',
      templateSize: '300px',
      fontStyle: 'normal',
      templateColor: 'linear-gradient(-45deg,#773143,#773143)',
      iconClass: 'fa-car',
      title: 'ADVANCE',
      price: '30',
      features: ['10 GB Space', '5 Domain Names', '10 Email Address', 'Email Support Only']
    },
    {
      id: '3',
      fontSize: '22px',
      color: '#ffffff',
      templateSize: '300px',
      fontStyle: 'normal',
      templateColor: 'linear-gradient(-45deg,#7b4874,#7b4874)',
      iconClass: 'fa-bicycle',
      title: 'PREMIUM',
      price: '20',
      features: ['15 GB Space', '10 Domain Name', '20 Email Address', '24/7 Live Support']
    }
  ]);

  // Function to handle selection of an option
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowContentButtons(option === 'Basic'); // Show content buttons only when Basic is selected
    setShowTitleOptions(false); // Hide title options initially
  };

  // Function to handle title button click
  const handleTitleButtonClick = () => {
    setShowTitleOptions(true); // Show title options when title button is clicked
  };

  // Function to handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    updateCustomStyle({ titleFontSize: e.target.value, titleFontColor: fontColor, titleFontStyle: fontStyle }); // Update font size for all templates
  };

  // Function to handle font style change
  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
    updateCustomStyle({ titleFontSize: fontSize, titleFontColor: fontColor, titleFontStyle: e.target.value }); // Update font style for all templates
  };

  // Function to handle font color change
  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
    updateCustomStyle({ titleFontSize: fontSize, titleFontColor: e.target.value, titleFontStyle: fontStyle }); // Update font color for all templates
  };

  // Function to update custom style
  const updateCustomStyle = (style) => {
    setCustomStyles(prevStyles => {
      return prevStyles.map(template => {
        return { ...template, ...style };
      });
    });
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-brand">Pricifiers</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item" onClick={() => handleOptionSelect('Basic')}>Basic</li>
            <li className="nav-item" onClick={() => handleOptionSelect('Advance')}>Advance</li>
            <li className="nav-item" onClick={() => handleOptionSelect('Premium')}>Premium</li>
          </ul>
        </nav>
      </header>
      <div className="subheader">
        {/* Render content buttons only when Basic is selected */}
        {showContentButtons && (
          <div className="subheader-options">
            <button className="content-button" onClick={handleTitleButtonClick}>Title</button>
            <button className="content-button">Price</button>
            <button className="content-button">Features</button> <br/> <br/>
            {/* Render title options when title button is clicked */}
            {showTitleOptions && (
              <div>
                {/* <label htmlFor="fontSize">Font Size (px): </label>
                <input 
                  type="number" 
                  id="fontSize" 
                  value={fontSize} 
                  onChange={handleFontSizeChange} 
                /> */}
                <br />
                <label htmlFor="fontStyle">Font Style: </label>
                <select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange}>
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </select>
                <br />
                {/* <label htmlFor="fontColor">Font Color: </label>
                <input 
                  type="color" 
                  id="fontColor" 
                  value={fontColor} 
                  onChange={handleFontColorChange} 
                /> */}
              </div>
            )}
          </div>
        )}
      </div>
      <section>
        <div>
          <div className="container-fluid">
            <div className="container">
              <div className="row">
                <div className='menu col-sm-12 d-flex justify-content-center'>
                  {customStyles.map((style, index) => (
                    <PricingCard 
                      className="card" 
                      key={index}
                      index={index}
                      {...style}
                      id= {style.id}
                      features={style.features}
                      color={style.color}
                      fontSize={style.fontSize}
                      fontFamily={style.fontFamily}
                      fontStyle={style.fontStyle}
                      templateSize={style.templateSize}
                      templateColor={style.templateColor}
                      titleFontSize={style.titleFontSize} 
                      titleFontColor={style.titleFontColor}
                      titleFontStyle={style.titleFontStyle}
                      updateCustomStyle={updateCustomStyle} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        {/* Add your footer content here */}
      </footer>
    </div>
  );
}

export default App;
