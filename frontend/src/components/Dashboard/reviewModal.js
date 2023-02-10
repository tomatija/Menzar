import React, { useState } from "react";
import { Modal, Button, Form, Select } from "react-bootstrap";

import { Rating } from "react-simple-star-rating";
import CloseButton from "react-bootstrap/CloseButton";

function ReviewModal(props) {
  const [comment, setComment] = useState();
  const [rating, setRating] = useState(1);

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
    const apiURL = "http://127.0.0.1:8000/api/v1/review/add/";

    const data = { comment: comment, rating: rating, order: props.orderID };

    console.log(props.auth);
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + props.auth.token,
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
      props.closeModal();
    });
  }

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Oceni jed</Modal.Title>
        <CloseButton onClick={() => props.closeModal(false)} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Ocena</Form.Label>
            <br></br>
            <Rating
              allowFraction={true}
              onClick={ratingChangeHandler}
              initialValue={rating}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Komentar</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Vpišite komentar"
              onChange={commentChangeHandler}
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
