import React, { useState, useEffect, useRef } from 'react';
import '../styles/pricingCard.css';

const PricingCard = ({ id, title, price, features = [], titleFontSize, titleFontColor, titleFontStyle, titleFontFamily, updateCustomStyle, removeImage, imageUrl, templateSize, ...style }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCurrency, setEditedCurrency] = useState("$");
  const [editedMonth, setEditedMonth] = useState("month");
  const [editedFeatures, setEditedFeatures] = useState(features);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setEditedFeatures(features);
  }, [features]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setEditedTitle(newTitle);
    updateCustomStyle(id - 1, { title: newTitle });
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setEditedCurrency(newCurrency);
  };
  const handlePriceChange = (e) => {
    const newValue = e.target.value;
    setEditedPrice(newValue);
    updateCustomStyle(id - 1, { price: newValue });
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setEditedMonth(newMonth);
  };


  const handleFeatureChange = (e, index) => {
    const updatedFeatures = [...editedFeatures];
    updatedFeatures[index] = e.target.value;
    setEditedFeatures(updatedFeatures);
    updateCustomStyle(id - 1, { features: updatedFeatures });
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

  const handleSubmit = () => {
    // Perform any actions needed when the submit button is clicked
    console.log('Submit button clicked');
  };

  const handleRemoveImage = () => {
    removeImage(id);
    setSelectedImage(null);
  };

  const handleAddImageButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="pricing-card" style={{ ...style, width: '300px' }}>
      {selectedImage && (
        <div className="image-container" style={{ width: '250px', height: '300px', textAlign: 'left' }}>
          <img src={selectedImage} alt="Selected Image" className="template-image" style={{ width: '100%', height: '50%' }} />
          <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
        </div>
      )}

      {imageUrl && !selectedImage && (
        <div className='d-flex flex-column position-relative'>
          <div className="image-container" style={{ width: '250px', height: 'auto', textAlign: 'left'}}>
            <img src={imageUrl} alt="Template Image" className="template-image" style={{ width: '100%', height: '50%' }} />
            <button onClick={handleRemoveImage} className="remove-image-button mt-2" style={{width:'auto', marginRight:'10%', fontSize: '10px'}}>Remove Image</button>
          </div>
          <div style={{ position: 'absolute', top: '51.5%', left: '72%' }}>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <button className="add-image-button" onClick={handleAddImageButtonClick} style={{width:'auto', fontSize: '10px'}}>Add Image</button>
          </div>
        </div>
      )}

      <div className='' style={{fontSize: '10px'}}>
        <h2 style={{ textAlign: 'center', fontSize: titleFontSize, color: titleFontColor, fontStyle: titleFontStyle, fontFamily: titleFontFamily, marginTop: '0px' }}>
          <input type="text" value={editedTitle} style={{ textAlign: 'center', fontSize: titleFontSize, color: titleFontColor }} onChange={handleTitleChange} />
        </h2>
        <h3 style={{fontSize: "1.2rem"}}>
          <input type="text" style={{ width: "20%", fontSize: "1.2rem", textAlign:'center' }} value={editedCurrency} onChange={handleCurrencyChange} />
          <input type="text" style={{ width: "25%", fontSize: "1.2rem", textAlign:'center' }} value={editedPrice} onChange={handlePriceChange} />
          <input type="text" style={{ width: "45%", fontSize: "1.2rem", marginLeft:'5%', textAlign:'center' }} value={editedMonth} onChange={handleMonthChange} />
        </h3>
        <ul>
          {editedFeatures.map((feature, index) => (
            <li key={index}>
              <input type="text" value={feature} onChange={(e) => handleFeatureChange(e, index)} />
            </li>
          ))}

          <li>
            <button onClick={addNewFeature}>+</button>
          </li>
        </ul>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );
};

export default PricingCard;
