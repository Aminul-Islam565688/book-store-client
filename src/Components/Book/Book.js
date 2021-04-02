import React from "react";
import { useHistory } from "react-router-dom";
import "./Book.css";

const Book = ({ book }) => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/checkout");
    sessionStorage.setItem("book-item", JSON.stringify(book));
  };
  // sessionStorage.clear();
  console.log(book.imgURL);
  return (
    <div className="book-cart">
      <div className="book-cart-img">
        <img src={book.imgURL} alt="" />
      </div>
      <div className="book-cart-name">
        <h4>{book.bookName}</h4>
        <h5>{book.authorName}</h5>
      </div>
      <div className="book-cart-price-btn">
        <h1>${book.price}</h1>
        <button onClick={handleClick} className="buy-btn">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Book;
