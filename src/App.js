import React, { useState } from 'react';
import PricingCard from '../src/components/PricingCard';
import './App.css';
import '../src/styles/sidebar.css';

function App() {
  const [showContentButtons, setShowContentButtons] = useState(false);
  const [showContentButtons1, setShowContentButtons1] = useState(false);
  const [showTitleOptions, setShowTitleOptions] = useState(false); // State to track if title button is clicked
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fontSize, setFontSize] = useState('16px'); // Default font size
  const [fontStyle, setFontStyle] = useState('normal'); // Default font style
  const [fontColor, setFontColor] = useState('#000000'); // Default font color
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif'); // Default font family
  const [customStyles, setCustomStyles] = useState([
    {
      id: '1',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'normal',
      fontFamily: 'Arial, sans-serif',
      templateSize: '350px',
      templateColor: 'linear-gradient(-45deg,#35546d,#35546d)',
      iconClass: 'fa-paper-plane',
      title: 'BASIC',
      price: '25',
      features: ['5 GB Space', '5 Email Address', 'No Live Support'],
      imageUrl: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1060&t=st=1710317931~exp=1710318531~hmac=ab0111dadc71484ae748827ad12df06cc63f944c5583db11b001423b06ebac89'
    },
    {
      id: '2',
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      templateSize: '350px',
      fontStyle: 'normal',
      templateColor: 'linear-gradient(-45deg,#773143,#773143)',
      iconClass: 'fa-car',
      title: 'ADVANCE',
      price: '30',
      features: ['10 GB Space', '10 Email Address', 'Email Support Only'],
      imageUrl: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1060&t=st=1710317931~exp=1710318531~hmac=ab0111dadc71484ae748827ad12df06cc63f944c5583db11b001423b06ebac89'
    },
    {
      id: '3',
      fontSize: '22px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      templateSize: '350px',
      fontStyle: 'normal',
      templateColor: 'linear-gradient(-45deg,#7b4874,#7b4874)',
      iconClass: 'fa-bicycle',
      title: 'PREMIUM',
      price: '20',
      features: ['15 GB Space', '10 Domain Name', '20 Email Address', '24/7 Live Support'],
      imageUrl: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1060&t=st=1710317931~exp=1710318531~hmac=ab0111dadc71484ae748827ad12df06cc63f944c5583db11b001423b06ebac89'
    }
  ]);

  // Function to handle selection of an option
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowContentButtons(option !== 'Add New Template'); // Hide content buttons when 'Add New Template' is selected
    setShowContentButtons1(option !== 'Add New Template');
    setShowTitleOptions(option === 'Title'); // Show title options only when 'Title' is selected
    setShowPriceOptions(option === 'Price'); 
  };

  // Function to handle title button click
  const handleTitleButtonClick = () => {
    setShowContentButtons(true);
    setShowTitleOptions(true);
    setShowPriceOptions(false); // Hide price options when title button is clicked
  };

  const handlePriceButtonClick = () => {
    setShowContentButtons(true);
    setShowPriceOptions(true); // Show price options when price button is clicked
    setShowTitleOptions(false); // Hide title options when price button is clicked
  };
  


  // Function to handle font size change
  // Function to handle font size change
// Function to handle font size change
const handleFontSizeChange = (value) => {
  setFontSize(value);
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', { titleFontSize: value });
};

// Function to handle font style change
const handleFontStyleChange = (e) => {
  const style = e.target.value;
  setFontStyle(style);
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', { titleFontStyle: style });
};

// Function to handle font color change
const handleFontColorChange = (e) => {
  const color = e.target.value;
  setFontColor(color);
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', { titleFontColor: color });
};

// Function to handle font family change
const handleFontFamilyChange = (e) => {
  const family = e.target.value;
  setFontFamily(family);
  updateCustomStyle(selectedOption === 'Basic' ? '1' : selectedOption === 'Advance' ? '2' : '3', { titleFontFamily: family });
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

  // Function to remove image from the Basic template
  const removeImage = (templateId) => {
    setCustomStyles(prevStyles => {
      return prevStyles.map(template => {
        if (template.id === templateId) {
          return { ...template, imageUrl: null };
        } else {
          return template;
        }
      });
    });
  };

  // Function to delete the last template
  const deleteLastTemplate = () => {
    setCustomStyles(prevStyles => prevStyles.slice(0, -1));
  };

  // Function to delete a template
  const deleteTemplate = () => {
    const lastTemplate = customStyles[customStyles.length - 1];
    if (lastTemplate) {
      setCustomStyles(prevStyles => prevStyles.filter(template => template.id !== lastTemplate.id));
    }
  };

  // Function to add a new template
const addNewTemplate = () => {
  const lastTemplate = customStyles[customStyles.length - 1];
  const newTemplateId = customStyles.length + 1;
  
  if (lastTemplate) {
    const newTemplate = {
      id: newTemplateId.toString(),
      fontSize: lastTemplate.fontSize,
      color: lastTemplate.color,
      fontStyle: lastTemplate.fontStyle,
      fontFamily: lastTemplate.fontFamily,
      templateSize: lastTemplate.templateSize,
      templateColor: lastTemplate.templateColor,
      iconClass: lastTemplate.iconClass,
      title: 'New Template',
      price: '0',
      features: lastTemplate.features.map(feature => feature), // Copy features array
      imageUrl: lastTemplate.imageUrl
    };

    setCustomStyles([...customStyles, newTemplate]);
  } else {
    // If there's no last template, create a default one
    const newTemplate = {
      id: newTemplateId.toString(),
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'normal',
      fontFamily: 'Arial, sans-serif',
      templateSize: '350px',
      templateColor: 'linear-gradient(-45deg,#35546d,#35546d)',
      iconClass: 'fa-new-template', // Change this to a suitable icon class
      title: 'New Template',
      price: '0',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      imageUrl: null
    };

    setCustomStyles([...customStyles, newTemplate]);
  }
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
            <li className="nav-item" onClick={addNewTemplate}>ADD TEMPLATE</li>
            <li className="nav-item" onClick={deleteLastTemplate}>DELETE TEMPLATE</li>
          </ul>
        </nav>
      </header>
      <div className="subheader">
        {/* Render content buttons */}
        {showContentButtons && (
          <div className="subheader-options">
            <button className="content-button" onClick={handleTitleButtonClick}>Title</button>
            <button className="content-button"onClick={handlePriceButtonClick} >Price</button>
            <button className="content-button">Features</button> <br/> <br/>
            {/* Render title options */}
            {showTitleOptions && (
              <div>
                <label htmlFor="fontSize">Font Size: </label>
                <input 
                  type="range" 
                  id="fontSize" 
                  min="10" 
                  max="40" 
                  step="2" 
                  value={fontSize.replace('px', '')} 
                  onChange={(e) => handleFontSizeChange(e.target.value + 'px')} 
                  style={{marginLeft:'16px'}}
                />
                <span>{fontSize}</span>
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
                <br />
                <label htmlFor="fontFamily">Font Family: </label>
                <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange} style={{marginLeft:'5px'}}>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Times New Roman, serif">Times New Roman</option>
                  <option value="Courier New, monospace">Courier New</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                </select>
              </div>
            )}
            
            {showPriceOptions && (
              <div>
                <label htmlFor="fontSize">Font Size: </label>
                <input 
                  type="range" 
                  id="fontSize" 
                  min="10" 
                  max="40" 
                  step="2" 
                  value={fontSize.replace('px', '')} 
                  onChange={(e) => handleFontSizeChange(e.target.value + 'px')} 
                  style={{marginLeft:'16px'}}
                />
                <span>{fontSize}</span>
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
                <br />
                <label htmlFor="fontFamily">Font Family: </label>
                <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange} style={{marginLeft:'5px'}}>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Times New Roman, serif">Times New Roman</option>
                  <option value="Courier New, monospace">Courier New</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                </select>
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
                      updateCustomStyle={(style) => updateCustomStyle(style.id, style)}
                      removeImage={() => removeImage(style.id)}
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

export default App;
