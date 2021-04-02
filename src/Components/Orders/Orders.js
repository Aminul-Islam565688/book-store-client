import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Orders.css";

const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const { bookName, authorName, price } = { ...loggedInUser };
  const [recentOrders, setRecentOrders] = useState([]);
  const onSubmit = (data) => {
    const orderDetails = {
      ...loggedInUser,
      orderTime: new Date(),
      phone: data.phone,
      address: data.address,
    };
    console.log(data.phone);
    fetch("http://localhost:7897/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("thank you for shopping with us");
        }
      });
  };
  useEffect(() => {
    fetch(`http://localhost:7897/recentOrders?email=${loggedInUser.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRecentOrders(data));
  }, []);
  console.log(loggedInUser.email);
  return (
    <div>
      <h1>{bookName}</h1>
      <h3>{authorName}</h3>
      <p>{price}</p>
      <div className="orders-form-wrapper">
        <h2 style={{ color: "#6946F4", textAlign: "center" }}>
          Please Submit Your Address Below
        </h2>
        <form className="orders-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={loggedInUser.name}
            ref={register({ required: true })}
            placeholder="Your Name"
          />
          <br />
          {errors.name && (
            <span style={{ color: "red" }} className="error">
              ***Name is required***
            </span>
          )}
          <br />
          <input
            name="email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
            placeholder="Your Email"
          />
          <br />
          {errors.email && (
            <span style={{ color: "red" }} className="error">
              ***Email is required***
            </span>
          )}
          <br />
          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your Address"
          />
          <br />
          {errors.address && (
            <span style={{ color: "red" }} className="error">
              ***Address is required***
            </span>
          )}
          <br />
          <input
            name="phone"
            ref={register({ required: true })}
            placeholder="Your Phone Number"
          />
          <br />
          {errors.phone && (
            <span style={{ color: "red" }} className="error">
              ***Phone Number is required***
            </span>
          )}
          <br />
          <input
            style={{ background: "#6946F4", color: "white" }}
            type="submit"
          />
        </form>
      </div>
      <h4 style={{ textAlign: "center", margin: "30px 0px" }}>
        <strong style={{ color: "red" }}>{loggedInUser.name}</strong> Recent
        Orders
      </h4>
      <table className="order-table">
        <tr>
          <th>Order Book Name</th>
          <th>Order Price</th>
          <th>Order Time</th>
        </tr>
        {recentOrders.map((orders) => (
          <tr>
            <td>
              <h4>{orders.bookName}</h4>
            </td>
            <td>
              <h5>{orders.price}</h5>
            </td>
            <td>
              <h5> {new Date(orders.orderTime).toDateString("dd/MM/yyyy")}</h5>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Orders;
