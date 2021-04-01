import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";

const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const { bookName, authorName, price } = { ...loggedInUser };
  const [recentOrders, setRecentOrders] = useState([]);
  const onSubmit = (data) => {
    const orderDetails = {
      ...loggedInUser,
      orderTime: new Date(),
    };
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
          console.log(data);
        }
      });
  };
  useEffect(() => {
    fetch(`http://localhost:7897/recentOrders?email=${loggedInUser.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          defaultValue={loggedInUser.name}
          ref={register({ required: true })}
          placeholder="Your Name"
        />
        {errors.name && <span className="error">Name is required</span>}

        <input
          name="email"
          defaultValue={loggedInUser.email}
          ref={register({ required: true })}
          placeholder="Your Email"
        />
        {errors.email && <span className="error">Email is required</span>}

        <input
          name="address"
          ref={register({ required: true })}
          placeholder="Your Address"
        />
        {errors.address && <span className="error">Address is required</span>}

        <input
          name="phone"
          ref={register({ required: true })}
          placeholder="Your Phone Number"
        />
        {errors.phone && (
          <span className="error">Phone Number is required</span>
        )}
        <input type="submit" />
      </form>
      <p>
        <strong style={{ color: "red" }}>{loggedInUser.name}</strong> Recent
        Orders
      </p>
      <h1>You Have {recentOrders.length} Orders</h1>
      {recentOrders.map((orders) => (
        <div>
          <h4>Order Book Name:{orders.bookName}</h4>
          <h5>Price : {orders.price}</h5>
          <h5>
            Order Time : {new Date(orders.orderTime).toDateString("dd/MM/yyyy")}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default Orders;
