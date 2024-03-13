import React, { useState, useEffect } from 'react';
import '../styles/pricingCard.css';

const PricingCard = ({ id, title, price, features = [], titleFontSize, titleFontColor, titleFontStyle, updateCustomStyle, ...style }) => {
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

  const handleSubmit = () => {
    // Perform any actions needed when the submit button is clicked
    console.log('Submit button clicked');
  };

  return (
    <div className="pricing-card" style={{ ...style }}>
      <h2 style={{ textAlign: 'center', fontSize: titleFontSize, color: titleFontColor, fontStyle: titleFontStyle }}>
        <input type="text" value={editedTitle} style={{ textAlign: 'center', fontSize: '1.5rem' }} onChange={handleTitleChange} />
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
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PricingCard;
