import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { logout } from "../Login/LoginActions";
import Order from "../Order/Order";

function Dashboard(props) {
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orders, setOrders] = useState([]);

  const apiUrl =
    "http://127.0.0.1:8000/api/v1/user/" +
    props.auth.user.username +
    "/orders/";

  var displayElement = null;

  function onLogout() {
    props.logout();
  }

  function getUserOrderData() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setOrders(result);
        },
        (error) => {
          setIsLoaded(false);
          setErrors(error);
        }
      );
  }

  useEffect(() => {
    getUserOrderData();
  }, []);

  const { user } = props.auth;
  if (errors) {
    displayElement = <div>Error: {errors.message}</div>;
  } else if (!isLoaded) {
    displayElement = <div>Loading...</div>;
  } else {
    displayElement = (
      <Row>
        <Col>
          <div className="d-grid gap-2">
            {orders.map((order, index) => (
              <Order
                key={index}
                order={order}
                refreshParent={getUserOrderData}
              />
            ))}
          </div>
        </Col>
      </Row>
    );
  }



  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            User: <b>{user.username}</b>
          </Navbar.Text>
          <Nav.Link onClick={onLogout}>Logout</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <Container>{displayElement}</Container>
    </div>
  );

}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(withRouter(Dashboard));