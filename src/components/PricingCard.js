import React, { useState, useEffect, useRef } from 'react';
import '../styles/pricingCard.css';

const PricingCard = ({ id, title, price, features = [], titleFontSize, titleFontColor, titleFontStyle, titleFontFamily, priceFontSize, priceFontColor, priceFontStyle, priceFontFamily, featuresFontSize, featuresFontColor, featuresFontStyle, featuresFontFamily, templateSize, templateColor, updateCustomStyle, removeImage, imageUrl, ...style }) => {
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

  const handleFeaturesChange = (e, index) => {
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
    <div className="pricing-card" style={{ ...style, width: templateSize, background: templateColor  }}>
      {selectedImage && (
        <div className="image-container" style={{ width: templateSize, height: templateSize, textAlign: 'left' }}>
          <img src={selectedImage} alt="Selected Image" className="template-image" style={{ width: '88%', height: '85%' }} />
          <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
        </div>
      )}

      {!selectedImage && imageUrl && (

        <div className='d-flex flex-column'>
          <div className="image-container" style={{ width: templateSize, height: templateSize, textAlign: 'left' }}>
            <img src={imageUrl} alt="Template Image" className="template-image" style={{ width: '88%', height: '85%' }} />
            <button onClick={handleRemoveImage} className="remove-image-button mt-2">Remove Image</button>
          </div>
          <div style={{ position: 'absolute', top: '40%', right: '10px' }}>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <button className="add-image-button" onClick={handleAddImageButtonClick}>Add Image</button>
          </div>
        </div>


      )}

      <h2 style={{ textAlign: 'center', fontSize: titleFontSize, color: titleFontColor, fontStyle: titleFontStyle, fontFamily: titleFontFamily, marginTop: '2px' }}>
        <input type="text" value={editedTitle} style={{ textAlign: 'center', fontSize: titleFontSize, color: titleFontColor }} onChange={handleTitleChange} />
      </h2>

      <h2 style={{ textAlign: 'center', fontSize: priceFontSize, color: priceFontColor, fontStyle: priceFontStyle, fontFamily: priceFontFamily, marginTop: '2px' }}>
        $<input type="text" value={editedPrice} style={{ textAlign: 'center', fontSize: priceFontSize, color: priceFontColor }} onChange={handlePriceChange} />
      </h2>



{/* <h3>
        $<input type="text" style={{ width: "20%", fontSize: "25px" }} value={editedPrice} onChange={handlePriceChange} /> /month
      </h3> */}
      <ul>
        {editedFeatures.map((feature, index) => (
          <li key={index}>
                  <h2 style={{ textAlign: 'center', fontSize: featuresFontSize, color: featuresFontColor, fontStyle: featuresFontStyle, fontFamily: featuresFontFamily, marginTop: '2px' }}>
        <input type="text" value={editedFeatures} style={{ textAlign: 'center', fontSize: featuresFontSize, color: featuresFontColor }} onChange={handleFeaturesChange} />
      </h2>
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

export default PricingCard;