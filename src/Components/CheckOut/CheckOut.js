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
      <h1 className="checkout-title">Checkout</h1>
      <table className="checkout-box">
        <tr className="checkout-header">
          <th>
            <h4>Description</h4>
          </th>
          <th style={{ textAlign: "center" }}>
            <h4>Quantity</h4>
          </th>
          <th style={{ textAlign: "center" }}>
            <h4>Price</h4>
          </th>
        </tr>
        <tr className="checkout-items">
          <td>
            {" "}
            <h4>{bookName}</h4>
          </td>
          <td style={{ textAlign: "center" }}>
            <h4>1</h4>
          </td>
          <td style={{ textAlign: "center" }}>
            <h4>${price}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4>Total</h4>
          </td>
          <td>
            <h4></h4>
          </td>
          <td style={{ textAlign: "center" }}>
            <h4>${price}</h4>
          </td>
        </tr>
      </table>
      <button className="checkout-btn" onClick={handleClick}>
        CheckOut
      </button>
    </div>
  );
};

export default CheckOut;
