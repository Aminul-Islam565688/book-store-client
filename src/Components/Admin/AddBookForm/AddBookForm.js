import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import upload from "../../../icons/cloud-upload-outline 1.png";
import "./AddBookForm.css";

const AddBookForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imgURL, setImgURL] = useState(null);
  const onSubmit = (data) => {
    if (imgURL) {
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
    } else {
      alert("img link isn't ready");
    }
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
        console.log(response.data.data.display_url);
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
      <h1 style={{ margin: "25px" }}>Add Book</h1>
      <div className="form-container">
        <form className="addBooks-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3>Book Name</h3>
            <input
              placeholder="Enter Book Name"
              name="bookName"
              defaultValue=""
              ref={register}
            />
          </div>

          <div>
            <h3>Author Name</h3>
            <input
              placeholder="Enter Author Name"
              name="authorName"
              ref={register}
            />
          </div>
          <div>
            <h3>Add Price</h3>
            <input placeholder="Enter Price" name="addPrice" ref={register} />
          </div>
          <div>
            <h3>Add Book Cover Photo</h3>
            <input
              className="custom-file-upload"
              type="file"
              onChange={handleUploadimg}
              name="exampleRequired"
              accept="image/*"
              id="file"
            />
            <label className="input-file" for="file">
              <img src={upload} alt="" />
              <h5>Upload Photo</h5>
            </label>
          </div>
          {/* <input className="submit-btn" type="submit" /> */}
          <button className="submit-btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
