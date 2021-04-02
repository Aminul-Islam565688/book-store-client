import React from "react";
import construction from "../../../books/construction.jpg";

const EditBooks = () => {
  const imgWrapper = {
    width: "946px",
    height: "620px",
    overflow: "hidden",
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <div style={imgWrapper}>
      <img style={imgStyle} src={construction} alt="" />
    </div>
  );
};

export default EditBooks;
