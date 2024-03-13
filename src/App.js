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
      features: ['5 GB Space', '2 Domain Names', '5 Email Address', 'No Live Support'],
      imageUrl: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1060&t=st=1710317931~exp=1710318531~hmac=ab0111dadc71484ae748827ad12df06cc63f944c5583db11b001423b06ebac89'
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
      features: ['10 GB Space', '5 Domain Names', '10 Email Address', 'Email Support Only'],
      imageUrl: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1060&t=st=1710317931~exp=1710318531~hmac=ab0111dadc71484ae748827ad12df06cc63f944c5583db11b001423b06ebac89'
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
      features: ['15 GB Space', '10 Domain Name', '20 Email Address', '24/7 Live Support'],
      imageUrl: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1060&t=st=1710317931~exp=1710318531~hmac=ab0111dadc71484ae748827ad12df06cc63f944c5583db11b001423b06ebac89'
    }
  ]);

  // Function to handle selection of an option
  const handleOptionSelect = (option) => {
    if (option === 'Add New Template') {
      const premiumTemplate = customStyles.find(template => template.title === 'PREMIUM');
      let newTemplate;
      if (premiumTemplate) {
        newTemplate = { ...premiumTemplate, id: (parseInt(customStyles[customStyles.length - 1].id) + 1).toString(), title: 'New Template' };
      } else {
        const advancedTemplate = customStyles.find(template => template.title === 'ADVANCED');
        if (advancedTemplate) {
          newTemplate = { ...advancedTemplate, id: (parseInt(customStyles[customStyles.length - 1].id) + 1).toString(), title: 'New Template' };
        } else {
          const basicTemplate = customStyles.find(template => template.title === 'BASIC');
          newTemplate = { ...basicTemplate, id: (parseInt(customStyles[customStyles.length - 1].id) + 1).toString(), title: 'New Template' };
        }
      }
      setCustomStyles(prevStyles => [...prevStyles, newTemplate]);
    } else {
      setSelectedOption(option);
      setShowContentButtons(option === 'Basic'); // Show content buttons only when Basic is selected
      setShowTitleOptions(false); // Hide title options initially
    }
  };

  // Function to handle title button click
  const handleTitleButtonClick = () => {
    setShowTitleOptions(true); // Show title options when title button is clicked
  };

  // Function to handle font size change
  const handleFontSizeChange = (value) => {
    setFontSize(value);
    updateCustomStyle('1', { titleFontSize: value }); // Update font style for Basic template only
  };

  // Function to handle font style change
  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
    updateCustomStyle('1', { titleFontStyle: e.target.value }); // Update font style for Basic template only
  };

  // Function to handle font color change
  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
    const updateCustomStyle = (templateId, style) => {
    updateCustomStyle('1', { titleFontColor: e.target.value }); // Update font style for Basic template only
  };

  // Function to update custom style for a specific template
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

  // Function to remove image of a template
const removeImage = (id) => {
  setCustomStyles(prevStyles => {
    return prevStyles.map(template => {
      if (template.id === id) {
        return { ...template, imageUrl: '' };
      } else {
        return template;
      }
    });
  });
};



  // Function to delete a template
  const deleteTemplate = () => {
    const indexOfNewTemplate = customStyles.findIndex(template => template.title === 'New Template');
    const indexOfPremium = customStyles.findIndex(template => template.title === 'PREMIUM');
    const indexOfAdvance = customStyles.findIndex(template => template.title === 'ADVANCE');
    const indexOfBasic = customStyles.findIndex(template => template.title === 'BASIC');

    if (indexOfNewTemplate !== -1) {
      setCustomStyles(prevStyles => prevStyles.filter(template => template.title !== 'New Template'));
    } else if (indexOfPremium !== -1) {
      setCustomStyles(prevStyles => prevStyles.filter(template => template.title !== 'PREMIUM'));
    } else if (indexOfAdvance !== -1) {
      setCustomStyles(prevStyles => prevStyles.filter(template => template.title !== 'ADVANCE'));
    } else if (indexOfBasic !== -1) {
      setCustomStyles(prevStyles => prevStyles.filter(template => template.title !== 'BASIC'));
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
          </ul>
        </nav>
        <nav>
          <li className="nav-item" onClick={() => handleOptionSelect('Add New Template')}>Add New Template</li>
          <li className="nav-item" onClick={deleteTemplate}>Delete Template</li>
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
                      removeImage={() => removeImage(style.id)} // Pass the removeImage function
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
