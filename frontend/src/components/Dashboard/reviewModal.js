import React, { useState } from "react";
import { Modal, Button, Form, Select } from "react-bootstrap";

import { Rating } from "react-simple-star-rating";
import CloseButton from "react-bootstrap/CloseButton";

function ReviewModal(props) {
  const [comment, setComment] = useState(props.comment);
  const [rating, setRating] = useState(props.rating);
  const ratingChangeHandler = (rate) => {
    if (rate < 1) {
      rate = 1;
    }
    setRating(rate * 2); //rating is 1 - 10 on backend and 0.5 - 5 on frontend so i multiply it by 2
  };

  function commentChangeHandler(e) {
    setComment(e.target.value);
  }

  function submitReview() {
    var apiURL = "";
    var data = {};
    if (props.edit) {
      apiURL = "http://127.0.0.1:8000/api/v1/review/update/";
      data = { comment: comment, rating: rating, reviewID: props.reviewID, order: props.orderID };
    } else {
      apiURL = "http://127.0.0.1:8000/api/v1/review/add/";
      data = { comment: comment, rating: rating, order: props.orderID };
    }

    console.log(data);
    console.log(props.auth.token)
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + props.auth.token,
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
    });
    props.closeModal();
  }

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Oceni jed</Modal.Title>
        <CloseButton onClick={() => props.closeModal()} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Ocena</Form.Label>
            <br></br>
            <Rating
              allowFraction={true}
              onClick={ratingChangeHandler}
              initialValue={rating / 2}
              transition={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Komentar</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Vpišite komentar"
              onChange={commentChangeHandler}
              defaultValue={comment}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => submitReview()}>
          Oddaj komentar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ReviewModal;
