import React, { useState } from "react";
const Order = (props) => {
  const diner = props.order.diner;
  const dish = props.order.dish;
  const soup = props.order.soup;
  const id = props.order.id;

  function deleteOrder() {
    const apiURL = "http://127.0.0.1:8000/api/v1/order/remove/" + id + "/";
    fetch(apiURL).then(
      (result) => {props.refreshParent();}
    );
  }

  return (
    <div>
      <h3>{diner}</h3>
      <p>{soup}</p>
      <p>{dish}</p>
      <button onClick={() => deleteOrder()}>Delete</button>
      <hr></hr>
    </div>
  );
};
export default Order;
