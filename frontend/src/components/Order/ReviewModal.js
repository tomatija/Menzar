import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { Rating } from "react-simple-star-rating";
import CloseButton from "react-bootstrap/CloseButton";

function ReviewModal(props) {
  const review = props.review;
  const reviewAvailable = props.review !== null;
  const orderID = props.orderID;
  const [comment, setComment] = useState(reviewAvailable ? review.comment : "");
  const [rating, setRating] = useState(reviewAvailable ? review.rating : 0);
  
  const apiAddUrl = "http://127.0.0.1:8000/api/v1/review/add/";
  
  const ratingChangeHandler = (rate) => {
    rate = rate / 20;//TODO: fix
    setRating(rate);
  };

  function commentChangeHandler(e) {
    setComment(e.target.value);
  }

  function submitReview() {
    const apiURL = apiAddUrl;
    
    let data = {
      "comment": comment,
      "rating": rating,
      "order": orderID,
    };
    
    if (reviewAvailable)
    {
      data.reviewID = review.id;
    }
    
    fetch(apiURL,
      {
        method: "POST",
        headers: {
          "Content-type" : "application/json",
          "Authorization": "Token " + props.auth.token,
        },
        body: JSON.stringify(data)
      })
      .then((result) => {
        props.closeModal(false);
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
              allowHalfIcon={true}
              onClick={ratingChangeHandler}
              ratingValue={parseFloat(rating)}
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
