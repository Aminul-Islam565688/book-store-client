import React from "react";
import "./CheckOut.css";

const CheckOut = () => {
  return (
    <div className="checkout-main">
      <h1>Checkout</h1>
      <div className="checkout-box">
        <div className="checkout-header">
          <h4>Description</h4>
          <h4>Quantity</h4>
          <h4>Price</h4>
        </div>
        <hr />
        <div className="checkout-items">
          <h4>Description</h4>
          <h4>Quantity</h4>
          <h4>Price</h4>
        </div>
        <hr />
        <div className="checkout-total">
          <h4>Description</h4>
          <h4>Quantity</h4>
          <h4>Price</h4>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
