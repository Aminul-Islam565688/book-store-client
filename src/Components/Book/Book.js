import React from "react";
import { useHistory } from "react-router-dom";
import "./Book.css";

const Book = ({ book }) => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/checkout");
  };
  return (
    <div className="book-cart">
      <img src={book.imgURL} alt="" />
      <h4 className="name">{book.bookName}</h4>
      <h1 className="price">${book.price}</h1>
      <button onClick={handleClick} className="buy-btn">
        Buy Now
      </button>
    </div>
  );
};

export default Book;
