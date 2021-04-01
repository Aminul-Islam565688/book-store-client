import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import loading from "../../icons/Group 33149.png";
import Book from "../Book/Book";
import "./Home.css";

const Home = () => {
  const [loadedBooks, setLoadedBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7897/getBooksData")
      .then((res) => res.json())
      .then((data) => setLoadedBooks(data));
  }, []);
  console.log(loadedBooks);
  return (
    <div>
      <div className="search-box">
        <form
          className="example"
          action="/action_page.php"
          style={{ maxWidth: "500px" }}
        >
          <input type="text" placeholder="Search.." name="search2" />
          <button type="submit">
            <SearchIcon style={{ fontSize: "30px" }}></SearchIcon>
          </button>
        </form>
      </div>
      {loadedBooks.length === 0 && (
        <img className="loading-icon" src={loading} alt="" />
      )}
      <div className="book-container">
        {loadedBooks.map((book) => (
          <Book book={book} key={book._id}></Book>
        ))}
      </div>
    </div>
  );
};

export default Home;
