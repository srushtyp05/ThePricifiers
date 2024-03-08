import React from 'react';
import '../styles/temp1.css';
import { slide as Menu } from 'react-burger-menu';

const Sidebar = ({ updateCustomStyle, customStyles }) => {
  const handleChange = (index, key, value) => {
    const updatedStyle = { ...customStyles[index], [key]: value };
    updateCustomStyle(index, updatedStyle);
    console.log(updatedStyle);
  };

  return (
    <Menu className="sidebar">
      {customStyles.map((style, index) => (
        <div key={index} className="template">
          <p>CSS Styles for Card {style.id}</p>
          <hr/>
          {/* <div>
            <label>Font Size</label>
            <input type="number" value={style.fontSize} onChange={(e) => handleChange(index, 'fontSize', parseInt(e.target.value))} />
            <br />
          </div> */}
          {/* <div>
              <label>Font Color: </label>
              <input type="color" value={style.fontColor} onChange={(e) => handleChange(index, 'fontColor', e.target.value)} />
          </div> */}
          <div className='d-flex gap-2 rounded'>
            <label>Font Style for Card {style.id} </label>
            <div>
            <select value={style.fontStyle} onChange={(e) => handleChange(index, 'fontStyle', e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                {/* <option value="bold">Fantasy</option> */}
            </select>
            </div>
          </div>
          {/* <div>
            <label>Font Family: </label>
            <select value={style.fontFamily} onChange={(e) => handleChange(index, 'fontFamily', e.target.value)}>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Calibri">Calibri</option>
              <option value="Arial">Arial</option>
            </select>
          </div> */}
          <br />
          {/* <label>Template Size: </label>
          <input type="number" value={style.templateSize} onChange={(e) => handleChange(index, 'templateSize', e.target.value)} /> 
          <br />*/}
          <div className='d-flex gap-5'>
            <label>Template Color</label>
            <div>
              <input type="color" value={style.templateColor} onChange={(e) => handleChange(index, 'templateColor', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </Menu>
  );
};

export default Sidebar;
