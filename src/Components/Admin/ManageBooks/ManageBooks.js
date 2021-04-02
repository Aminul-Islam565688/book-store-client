import React, { useEffect, useState } from "react";
import editImg from "../../../icons/Group 307.png";
import deleteImg from "../../../icons/Group 33150.png";
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
      <h2 className="manage-books-title">Manage Books</h2>
      <table className="book-items-table">
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <tr>
          <th>
            <h5>Book Name</h5>
          </th>
          <th>
            <h5>Author Name</h5>
          </th>
          <th>
            <h5>Price</h5>
          </th>
          <th>
            <h5>Action</h5>
          </th>
        </tr>
        {booksDetails.map((book) => (
          <tr>
            <td>
              <h5>{book.bookName}</h5>
            </td>
            <td>
              <p>{book.authorName}</p>
            </td>
            <td>
              <h5>${book.price}</h5>
            </td>
            <td>
              <img
                src={editImg}
                style={{ width: "40px", marginRight: "7px" }}
                alt=""
              />
              <img
                style={{ width: "40px" }}
                src={deleteImg}
                onClick={() => handleDeleteItem(book._id)}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ManageBooks;
