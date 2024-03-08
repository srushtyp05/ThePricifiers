import React from 'react';

const PricingCard = ({ iconClass, title, price, features, fontColor, fontSize, fontFamily, fontStyle, templateSize, templateColor }) => {
  return (
    <div className="col-sm-4" style={{ color: fontColor, fontSize: fontSize, fontFamily: fontFamily, fontStyle: fontStyle }}>
      <div className="card text-center" style={{ width: templateSize, background: templateColor }}>
        <div className="title">
          <i className={`fa ${iconClass}`} aria-hidden="true"></i>
          <h2>{title}</h2>
        </div>
        <div className="price">
          <h4><sup>$</sup>{price}</h4>
        </div>
        <div className="option">
          <ul>
            {features.map((feature, index) => (
              <li key={index}><i className="fa fa-check" aria-hidden="true"></i>{feature}</li>
            ))}
          </ul>
        </div>
        <a href="#">Order Now</a>
      </div>
    </div>
  );
};

export default PricingCard;
