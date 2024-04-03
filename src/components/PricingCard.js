import React, { useState, useEffect, useRef } from 'react';
import '../styles/pricingCard.css';

const PricingCard = ({ id, title, price, features = [], titleFontSize, titleFontColor, titleFontStyle, titleFontFamily, priceFontSize, priceFontColor, priceFontStyle, priceFontFamily, featuresFontSize, featuresFontColor, featuresFontStyle, featuresFontFamily, templateSize, templateColor, updateCustomStyle, removeImage, imageUrl, ...style }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedFeatures, setEditedFeatures] = useState(features);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [embeddedCode, setEmbeddedCode] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setEditedFeatures(features);
  }, [features]);

  const handleTitleChange = (e) => {
    const newText = e.target.textContent;
    const cursorPosition = getCaretCharacterOffsetWithin(e.target);
    setEditedTitle(newText);
    updateCustomStyle(id - 1, { title: newText });
    restoreCursorPosition(e.target, cursorPosition);
  };
  
  const handlePriceChange = (e) => {
    const newText = e.target.textContent;
    const cursorPosition = getCaretCharacterOffsetWithin(e.target);
    setEditedPrice(newText);
    updateCustomStyle(id - 1, { price: newText });
    restoreCursorPosition(e.target, cursorPosition);
  };
  
  const handleFeatureChange = (e, index) => {
    const newText = e.target.textContent;
    const cursorPosition = getCaretCharacterOffsetWithin(e.target);
    const updatedFeatures = [...editedFeatures];
    updatedFeatures[index] = newText;
    setEditedFeatures(updatedFeatures);
    updateCustomStyle(id - 1, { features: updatedFeatures });
    restoreCursorPosition(e.target, cursorPosition);
  };
  

// Get the cursor position within a contenteditable element
const getCaretCharacterOffsetWithin = (element) => {
  let caretOffset = 0;
  const range = window.getSelection().getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  caretOffset = preCaretRange.toString().length;
  return caretOffset;
};

const restoreCursorPosition = (element, cursorOffset) => {
  const textNode = element.firstChild;
  const length = textNode.textContent.length;
  const adjustedOffset = Math.min(cursorOffset, length); // Ensure cursorOffset doesn't exceed text length
  const range = document.createRange();
  const selection = window.getSelection();
  range.setStart(textNode, adjustedOffset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

  const addNewFeature = () => {
    setEditedFeatures([...editedFeatures, '']);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      updateCustomStyle(id - 1, { imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
 

const removeFeature = (index) => {
  const updatedFeatures = [...editedFeatures];
  updatedFeatures.splice(index, 1);
  setEditedFeatures(updatedFeatures);
};

  const handleRemoveImage = () => {
    removeImage(id);
    setSelectedImage(null);
  };

  const handleAddImageButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="pricing-card" style={{ ...style, width: templateSize, background: templateColor, marginTop: 50, marginBottom: 50 }}>

      {selectedImage && (
        <div className="image-container" style={{ width: templateSize, textAlign: 'left' }}>
          <img src={selectedImage} alt="Selected Image" className="template-image" style={{ width: '88%', height: 'auto' }} />
          <button onClick={handleRemoveImage} className="remove-image-button" >Remove Image</button>
        </div>
      )}

      {!selectedImage && imageUrl && (

        <div className='d-flex flex-column'>
          <div className="image-container" style={{ width: templateSize, textAlign: 'left' }}>
            <img src={imageUrl} alt="Template Image" className="template-image" style={{ width: '88%', height: '200px' }} />
            <button onClick={handleRemoveImage} className="remove-image-button mt-2" style={{color:'white', backgroundColor:'#2C2C54'}} >Remove Image</button>
          </div>
          <div style={{ position: 'absolute', top: '42%', right: '18px', }}>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <button className="add-image-button" onClick={handleAddImageButtonClick} style={{color:'white', backgroundColor:'#2C2C54'}}>Add Image</button>
          </div>
        </div>


      )}

        <h2 
        contentEditable 
        onInput={(e) => handleTitleChange(e)} // Updated event handler
        style={{ 
          textAlign: 'center', 
          fontSize: titleFontSize, 
          color: titleFontColor, 
          fontStyle: titleFontStyle, 
          fontFamily: titleFontFamily, 
          marginTop: '30px',
          width: '100%' 
        }}
      >
        {editedTitle}
      </h2>

      <h2 style={{width: '100%', textAlign: 'center', fontSize: priceFontSize, color: priceFontColor, fontStyle: priceFontStyle, fontFamily: priceFontFamily, marginTop: '2px' }}>
        <span>$</span><span contentEditable onInput={(e) => handlePriceChange(e)}>{editedPrice}</span>
      </h2>

{/* <h3>
        $<input type="text" style={{ width: "20%", fontSize: "25px" }} value={editedPrice} onChange={handlePriceChange} /> /month
      </h3> */}
      <div style={{position: 'relative', padding: '0 25px 0 20px', marginRight: '20px'}}>
        <ul>
        {editedFeatures.map((feature, index) => (
        <li key={index} className='features'>
        <div contentEditable  onInput={(e) => handleFeatureChange(e, index)}
        style={{ 
          fontSize: featuresFontSize, 
          color: featuresFontColor, 
          fontStyle: featuresFontStyle, 
          fontFamily: featuresFontFamily, 
          width: '80%',
          padding: '5px',
          borderRadius: '20px',
        }}
      >
        {feature}
      </div>
      <button onClick={() => removeFeature(index)} style={{color:'white', backgroundColor:'#2C2C54',}}>-</button>
    </li>
  ))}
        <li>
            <button onClick={addNewFeature} style={{color:'white', backgroundColor:'#2C2C54',}}>+</button>
          </li>        
        </ul>
      </div>
      {/* <button onClick={handleSubmit}>Generate Embedded Code</button>
      {embeddedCode && (
        <div>
          <h3>Embedded Code:</h3>
          <textarea rows="5" cols="50" value={embeddedCode} readOnly />
        </div> */}
      {/* )} */}
    </div>
  );
};

export default PricingCard;
