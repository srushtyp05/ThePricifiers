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

  

  // const handleSubmit = () => {
  //   // Perform any actions needed when the submit button is clicked
  //   console.log('Submit button clicked');
  // };




  // const handleSubmit = () => {
  //   console.log("hello");
  //   // Generate embedded code
  //   const code = generateEmbeddedCode();
  //   setEmbeddedCode(code);
  // };

  
  
  



// const generateEmbeddedCode = () => {
//   let code = `<div class="pricing-card" style="width: ${templateSize}; background: ${templateColor};">`;

//   // Add image if selected or use default imageUrl
//   if (selectedImage) {
//     code += `<img src="${selectedImage}" alt="Selected Image" class="template-image" style="width: 88%; height: 85%;" />`;
//   } else if (imageUrl) {
//     code += `<img src="${imageUrl}" alt="Template Image" class="template-image" style="width: 88%; height: 85%;" />`;
//   }

//   // Add title with styles
//   code += `<h2 class="title" style="text-align: center; font-size: ${titleFontSize}; color: ${titleFontColor}; font-style: ${titleFontStyle}; font-family: ${titleFontFamily}; margin-top: 2px;">${editedTitle}</h2>`;

//   // Add price with styles
//   code += `<h2 class="price" style="text-align: center; font-size: ${priceFontSize}; color: ${priceFontColor}; font-style: ${priceFontStyle}; font-family: ${priceFontFamily}; margin-top: 2px;">$${editedPrice}</h2>`;

//   // Add features with styles
//   editedFeatures.forEach((feature) => {
//     code += `<h2 class="feature" style="text-align: center; font-size: ${featuresFontSize}; color: ${featuresFontColor}; font-style: ${featuresFontStyle}; font-family: ${featuresFontFamily}; margin-top: 2px;">${feature}</h2>`;
//   });

//   // Close the <div> tag
//   code += '</div>';

//   return code;
// };

  
  
  
  
  
  // const generateEmbeddedCode = (templates) => {
  //   let code = '';
  
  //   // Loop through all templates and generate embedded code for each
  //   for (let i = 0; i < templates.length; i++) {
  //     const { title, price, features, imageUrl, templateSize, templateColor, titleFontSize, titleFontColor, titleFontStyle, titleFontFamily, priceFontSize, priceFontColor, priceFontStyle, priceFontFamily, featuresFontSize, featuresFontColor, featuresFontStyle, featuresFontFamily } = templates[i];
      
  //     // Generate embedded code for each template
  //     code += <div style="width: ${templateSize}; background: ${templateColor};">;
      
  //     // Add image if selected
  //     if (imageUrl) {
  //       code += <img src="${imageUrl}" alt="Template Image" style="width: 100%; height: auto;" /><br>;
  //     }
      
  //     // Add title and price
  //     code += <h2 style="text-align: center; font-size: ${titleFontSize}; color: ${titleFontColor}; font-style: ${titleFontStyle}; font-family: ${titleFontFamily}; margin-top: 2px;">${title}</h2><h2 style="text-align: center; font-size: ${priceFontSize}; color: ${priceFontColor}; font-style: ${priceFontStyle}; font-family: ${priceFontFamily}; margin-top: 2px;">$${price}</h2>;
      
  //     // Add features
  //     features.forEach((feature) => {
  //       code += <h2 style="text-align: center; font-size: ${featuresFontSize}; color: ${featuresFontColor}; font-style: ${featuresFontStyle}; font-family: ${featuresFontFamily}; margin-top: 2px;">${feature}</h2>;
  //     });
      
  //     // Close the <div> tag for this template
  //     code += '</div>';
  //   }
  
  //   return code;
  // };
  



  // // Add these functions to handle feature changes and removal
  // const handleFeatureChange = (e, index) => {
  //   const updatedFeatures = [...editedFeatures];
  //   updatedFeatures[index] = e.target.textContent; // Use textContent to get the edited content
  //   setEditedFeatures(updatedFeatures);
  // };
  


  

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
    <div className="pricing-card" style={{ ...style, width: templateSize, background: templateColor }}>

      {selectedImage && (
        <div className="image-container" style={{ width: templateSize, textAlign: 'left' }}>
          <img src={selectedImage} alt="Selected Image" className="template-image" style={{ width: '88%', height: 'auto' }} />
          <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
        </div>
      )}

      {!selectedImage && imageUrl && (

        <div className='d-flex flex-column'>
          <div className="image-container" style={{ width: templateSize, textAlign: 'left' }}>
            <img src={imageUrl} alt="Template Image" className="template-image" style={{ width: '88%', height: 'auto' }} />
            <button onClick={handleRemoveImage} className="remove-image-button mt-2">Remove Image</button>
          </div>
          <div style={{ position: 'absolute', top: '29%', right: '20px' }}>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            <button className="add-image-button" onClick={handleAddImageButtonClick}>Add Image</button>
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
    marginTop: '2px' 
  }}
>
  {editedTitle}
</h2>

<h2 style={{ textAlign: 'center', fontSize: priceFontSize, color: priceFontColor, fontStyle: priceFontStyle, fontFamily: priceFontFamily, marginTop: '2px' }}>
  <span>$</span><span contentEditable onInput={(e) => handlePriceChange(e)}>{editedPrice}</span>
</h2>





{/* <h3>
        $<input type="text" style={{ width: "20%", fontSize: "25px" }} value={editedPrice} onChange={handlePriceChange} /> /month
      </h3> */}
      <ul>
      {editedFeatures.map((feature, index) => (
// d-flex gap gap-5 justify-between
<li key={index} className=''>
    <div 
      contentEditable 
      onInput={(e) => handleFeatureChange(e, index)} // Updated event handler
      style={{ 
        textAlign: 'center', 
        fontSize: featuresFontSize, 
        color: featuresFontColor, 
        fontStyle: featuresFontStyle, 
        fontFamily: featuresFontFamily, 
        marginTop: '2px' 
      }}
    >
      {feature}
    </div>
    <button onClick={() => removeFeature(index)}>-</button>
  </li>
))}



        <li>
          <button onClick={addNewFeature}>+</button>
        </li>



        
      </ul>
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

export default PricingCard;