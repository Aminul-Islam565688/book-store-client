import React, { useEffect, useState } from "react";
import Book from "../Book/Book";
import "./Home.css";

const Home = () => {
  const [loadedBooks, setLoadedBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7897/getBooksData")
      .then((res) => res.json())
      .then((data) => setLoadedBooks(data));
  }, []);
  return (
    <div className="book-container">
      <div className="search-box">
        <h1>This is Search Component</h1>
      </div>
      {loadedBooks.map((book) => (
        <Book book={book}></Book>
      ))}
    </div>
  );
};

export default Home;
