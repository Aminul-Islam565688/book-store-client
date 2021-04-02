import React from "react";
import construction from "../../books/construction.jpg";

const Deals = () => {
  const imgWrapper = {
    width: "1280px",
    height: "552px",
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

export default Deals;
