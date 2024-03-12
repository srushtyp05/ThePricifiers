import React from "react";

const PricingCard = ({
  iconClass,
  title,
  price,
  features,
  fontColor,
  fontSize,
  fontFamily,
  fontStyle,
  templateSize,
  templateColor,
  orderButtonProperties, // New prop for order button customization
}) => {
  const cardContentStyle = {
    color: fontColor,
    fontSize: `${fontSize}px`, // Apply the font size to the whole card content
    fontFamily: fontFamily,
    fontStyle: fontStyle,
  };

  const orderButtonStyle = {
    borderRadius: orderButtonProperties.shape === "round" ? "50px" : "0", // Apply roundness based on shape property
    background: orderButtonProperties.color,
    color: orderButtonProperties.textColor,
    fontSize: `${fontSize}px`,
  };

  return (
    <div className="col-sm-4">
      <div
        className="card text-center"
        style={{ width: templateSize, background: templateColor }}
      >
        <div className="card-content" style={cardContentStyle}>
          <div className="title">
            <i className={`fa ${iconClass}`} aria-hidden="true"></i>
            <h2 style={{ fontSize: `${fontSize * 1.2}px`, color: fontColor }}>
              {title}
            </h2>{" "}
            {/* Apply font size to title */}
          </div>
          <div
            className="price"
            style={{ fontSize: `${fontSize * 1.5}px`, color: fontColor }}
          >
            {" "}
            {/* Apply font size to price */}
            <h4>
              <sup>$</sup>
              {price}
            </h4>
          </div>
          <div className="option">
            <ul>
              {features.map((feature, index) => (
                <li
                  key={index}
                  style={{ fontSize: `${fontSize}px`, color: fontColor }}
                >
                  {" "}
                  {/* Apply font size to features */}
                  <i className="fa fa-check" aria-hidden="true"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <a href="#" style={orderButtonStyle}>
            {orderButtonProperties.text}
          </a>{" "}
          {/* Apply font size to link */}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
