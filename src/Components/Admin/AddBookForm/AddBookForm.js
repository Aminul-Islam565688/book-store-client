import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddBookForm.css";

const AddBookForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imgURL, setImgURL] = useState("");
  // const [bookData, setBookData] = useState({});
  const onSubmit = (data) => {
    // let bookNewData = { ...bookData, ...imgURL };
    const bookData = {
      bookName: data.bookName,
      authorName: data.authorName,
      price: data.addPrice,
      imgURL: imgURL,
    };
    // setBookData(bookData);
    console.log(bookData);
    const url = "http://localhost:7897/addBooksData";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    }).then((res) => console.log(res));
  };

  const handleUploadimg = (e) => {
    console.log(e.target.files[0]);
    const imgData = new FormData();
    imgData.set("key", "42614fd13642e1d7d77b28ec9f5d8ffc");
    imgData.append("image", e.target.files[0]);
    console.log(imgData);
    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then(function (response) {
        setImgURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const handleSubmitBtn = () => {
  // let bookNewData = { ...bookData, ...imgURL };
  // bookNewData = {
  //   bookName: "",
  //   authorName: "",
  //   price: "",
  //   imgURL: "",
  // };
  // setBookData(bookNewData);
  // };

  return (
    <div>
      <h1>Add Boodk</h1>
      <div className="form-container">
        <form className="addBooks-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            <h3>Book Name</h3>
            <input
              placeholder="Enter Book Name"
              name="bookName"
              defaultValue=""
              ref={register}
            />
          </label>

          <label htmlFor="">
            <h3>Author Name</h3>
            <input
              placeholder="Enter Author Name"
              name="authorName"
              ref={register}
            />
          </label>
          <label htmlFor="">
            <h3>Add Price</h3>
            <input placeholder="Enter Price" name="addPrice" ref={register} />
          </label>
          <label htmlFor="">
            <h3>Add Book Cover Photo</h3>
            <input
              type="file"
              onChange={handleUploadimg}
              name="exampleRequired"
            />
          </label>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
