// Inside PricingCard.js

import React, { useState, useEffect, useRef } from 'react';
import '../styles/pricingCard.css';

const PricingCard = ({ id, title, price, features = [], titleFontSize, titleFontColor, titleFontStyle, updateCustomStyle, removeImage, imageUrl, templateSize, ...style }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
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

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setEditedPrice(newPrice);
    updateCustomStyle(id - 1, { price: newPrice });
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
    removeImage(id); // Call the function to remove the image with the id of the template
    setSelectedImage(null); // Clear the selected image
  };

  const handleAddImageButtonClick = () => {
    fileInputRef.current.click(); // Trigger click on file input when "Add Image" button is clicked
  };

  return (
    <div className="pricing-card" style={{ ...style, width: templateSize }}>
      {selectedImage && (
        <div className="image-container" style={{ width: templateSize, height: templateSize, textAlign: 'left' }}>
          <img src={selectedImage} alt="Selected Image" className="template-image" style={{ width: '80%', height: '85%' }} />
          <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
        </div>
      )}
      {!selectedImage && imageUrl && (
        <div className="image-container" style={{ width: templateSize, height: templateSize, textAlign: 'left' }}>
          <img src={imageUrl} alt="Template Image" className="template-image" style={{ width: '80%', height: '85%' }} />
          <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
        </div>
      )}
      <div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        <button className="add-image-button" onClick={handleAddImageButtonClick}>Add Image</button>
      </div>
      <h2 style={{ textAlign: 'center', fontSize: titleFontSize, color: titleFontColor, fontStyle: titleFontStyle, marginTop: '2px' }}>
        <input type="text" value={editedTitle} style={{ textAlign: 'center', fontSize: titleFontSize, color: titleFontColor }} onChange={handleTitleChange} />
      </h2>
      <h3>
        $<input type="text" style={{ width: "20%", fontSize: "25px" }} value={editedPrice} onChange={handlePriceChange} /> /month
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
  );
};

export default PricingCard;
