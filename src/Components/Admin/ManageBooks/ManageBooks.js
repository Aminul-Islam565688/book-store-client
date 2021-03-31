import React, { useEffect, useState } from "react";
import "./ManageBooks.css";

const ManageBooks = ({ books }) => {
  const [booksDetails, setBooksDetails] = useState([]);
  const [isDeleted, setDeleted] = useState(false);
  useEffect(() => {
    fetch("http://localhost:7897/getBooksData")
      .then((res) => res.json())
      .then((data) => setBooksDetails(data));
  }, []);
  const handleDeleteItem = (id) => {
    console.log(id);
    fetch(`http://localhost:7897/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setDeleted(data));
  };
  return (
    <div>
      <h2>This is Manage Books Component</h2>
      {booksDetails.map((book) => (
        <div className="book-items">
          <h4>Book Name: {book.bookName}</h4>
          <p>Author Name :{book.authorName}</p>
          <p>BookPrice : ${book.price}</p>
          <button onClick={() => handleDeleteItem(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageBooks;
