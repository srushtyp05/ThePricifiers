import React, { useState, useEffect } from 'react';
import '../styles/pricingCard.css';

const PricingCard = ({ id, title, price, features = [], titleFontSize, titleFontColor, titleFontStyle, updateCustomStyle, removeImage, imageUrl, templateSize, ...style }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedFeatures, setEditedFeatures] = useState(features);

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

  const handleSubmit = () => {
    // Perform any actions needed when the submit button is clicked
    console.log('Submit button clicked');
  };

  const handleRemoveImage = () => {
    removeImage(); // Call the function to remove the image
  };

  return (
    <div className="pricing-card" style={{ ...style, width: templateSize }}>
      {imageUrl && ( // Render image only if imageUrl exists
        <div className="image-container" style={{ width: templateSize, height: templateSize, textAlign: 'left' }}>
          <img src={imageUrl} alt="Template Image" className="template-image" style={{ width: '80%', height: '85%' }} />
          <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button> {/* Add button to remove image */}
        </div>
      )}
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
