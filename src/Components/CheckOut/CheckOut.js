import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./CheckOut.css";

const CheckOut = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const order = JSON.parse(sessionStorage.getItem("book-item"));
  let history = useHistory();
  const { bookName, authorName, price } = order;
  console.log(bookName, authorName, price);
  console.log({ ...loggedInUser });
  const handleClick = () => {
    history.push("/orders");
    const checkOut = {
      ...loggedInUser,
      bookName: bookName,
      authorName: authorName,
      price: price,
    };
    setLoggedInUser(checkOut);
  };
  console.log({ ...loggedInUser });
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
          <h4>{bookName}</h4>
          <h4>1</h4>
          <h4>${price}</h4>
        </div>
        <hr />
        <div className="checkout-total">
          <h4>Total</h4>
          <h4>${price}</h4>
        </div>
      </div>
      <button onClick={handleClick}>CheckOut</button>
    </div>
  );
};

export default CheckOut;
