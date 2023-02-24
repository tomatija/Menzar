import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../Login/LoginActions";
import Order from "../Order/Order";
import Accordion from "react-bootstrap/Accordion";
import ReviewModal from "./ReviewModal";


function Dashboard(props) {
  const user = props.auth.user;
  const [errors, setErrors] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalReview, setReviewModalData] = useState({});

  const apiUrl =
    "http://127.0.0.1:8000/api/v1/user/" + user.username + "/orders/";

  var displayElement = null;

  function onLogout() {
    props.logout();
  }
  
  function openReviewModal(order) {
    setReviewModalData(order);
    setShowReviewModal(true);
  }
  
  function closeReviewModal() {
    setShowReviewModal(false);
    getUserOrderData();
  }
  
  function getUserOrderData() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then(
        (result) => {
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
  });

  if (errors)
  {
    displayElement = <div>Error: {errors.message}</div>;
  }
  else if (!isLoaded)
  {
    displayElement = <div>Loading...</div>;
  }
  else
  {
    displayElement = (
      <Accordion defaultActiveKey="0">
        {orders.map((order, index) => (
          <Order
            key={index}
            accordionID={index}
            order={order}
            auth={props.auth}
            openModal={openReviewModal}
            closeModal={closeReviewModal}
          />
        ))}
      </Accordion>
    );
  }

  return (
    <div>
      <ReviewModal
        show={showReviewModal}
        closeModal={closeReviewModal}
        data={modalReview}
      />
      <Navbar bg="light">
        <Navbar.Brand href="/">Domov</Navbar.Brand>
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
