import React, { useEffect, useState } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import ReviewModal from "../Dashboard/reviewModal";

import { Rating } from "react-simple-star-rating";

const Order = (props) => {
  const diner = props.order.diner;
  const dish = props.order.dish;
  const soup = props.order.soup;
  const id = props.order.id;
  const comment = props.order.comment;
  const rating = props.order.rating;
  const reviewID = props.order.reviewID;
  const accordionID = props.accordionID.toString();


  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalEditMode, setModalEditMode] = useState(false);

  function refreshOrder(){
    setShowReviewModal(false);
  }

  function deleteOrder() {
    const apiURL = "http://127.0.0.1:8000/api/v1/order/remove/" + id + "/";
    fetch(apiURL).then(props.refreshParent);
  }

  const reviewButton = (
    <Button onClick={() => setShowReviewModal(true)}>Oceni kosilo</Button>
  );

  const review = (
    <div
      style={{
        border: "3px solid rgba(0, 0, 0,0.1)",
        maxWidth: "fit-content",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <p>{comment}</p>
      <Rating allowFraction={true} readonly={true} initialValue={rating} />
      <br></br>
      <Button
        onClick={() => {
          setModalEditMode(true);
          setShowReviewModal(true);
        }}
      >
        Uredi
      </Button>
    </div>
  );

  return (
    <Card>
      <ReviewModal
        show={showReviewModal}
        closeModal={refreshOrder}
        orderID={id}
        auth={props.auth}
        comment={comment}
        rating={rating}
        edit={modalEditMode}
        reviewID={reviewID}
      />
      <Card.Header>
        <Accordion.Toggle as={Button} variant="light" eventKey={accordionID}>
          Naročilo v {diner}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={accordionID}>
        <Card.Body>
          <p>{soup}</p>
          <p>{dish}</p>

          {comment === "" ? reviewButton : review}
          <Button className="float-right" onClick={() => deleteOrder()}>
            Izbriši naročilo
          </Button>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
export default Order;
