import React, { useState } from 'react';
import PricingCard from '../src/components/PricingCard';
import './App.css';
import '../src/styles/sidebar.css';

function App() {
  const [showContentButtons, setShowContentButtons] = useState(false);
  const [showTitleOptions, setShowTitleOptions] = useState(false); // State to track if title button is clicked
  const [selectedOption, setSelectedOption] = useState(null);
  const [fontSize, setFontSize] = useState('16px'); // Default font size
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
    updateCustomStyle('1', { titleFontSize: e.target.value }); // Update font style for Basic template only
  };

  // Function to handle font style change
  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
    updateCustomStyle('1', { titleFontStyle: e.target.value }); // Update font style for Basic template only
  };

  // Function to handle font color change
  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
    updateCustomStyle('1', { titleFontColor: e.target.value }); // Update font style for Basic template only
  };

  // Function to update custom style for a specific template
  const updateCustomStyle = (templateId, style) => {
    setCustomStyles(prevStyles => {
      return prevStyles.map(template => {
        if (template.id === templateId) {
          return { ...template, ...style };
        } else {
          return template;
        }
      });
    });
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-brand">Pricifiers</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item" onClick={() => handleOptionSelect('Basic')}>BASIC</li>
            <li className="nav-item" onClick={() => handleOptionSelect('Advance')}>ADVANCE</li>
            <li className="nav-item" onClick={() => handleOptionSelect('Premium')}>PREMIUM</li>
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
                <label htmlFor="fontSize">Font Size: </label>
                <select id="fontSize" value={fontSize} onChange={handleFontSizeChange} style={{marginLeft:'16px'}}>
                  <option value="10px">10px</option>
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="22px">22px</option>
                  <option value="24px">24px</option>
                  <option value="26px">26px</option>
                  <option value="28px">28px</option>
                  <option value="30px">30px</option>
                  <option value="32px">32px</option>
                  <option value="34px">34px</option>
                  <option value="36px">36px</option>
                  <option value="38px">38px</option>
                  <option value="40px">40px</option>

                  {/* Add more options as needed */}
                </select>
                <br />
                <label htmlFor="fontStyle">Font Style: </label>
                <select id="fontStyle" value={fontStyle} onChange={handleFontStyleChange} style={{marginLeft:'12px'}}>
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </select>
                <br />
                <label htmlFor="fontColor">Font Color: </label>
                <input 
                  type="color" 
                  id="fontColor" 
                  value={fontColor} 
                  onChange={handleFontColorChange} style={{marginLeft:'10px'}}
                />
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
                  {customStyles.map((style) => (
                    <PricingCard 
                      className="card" 
                      key={style.id}
                      {...style}
                      updateCustomStyle={(style) => updateCustomStyle('1', style)} // Pass the ID of the Basic template
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
