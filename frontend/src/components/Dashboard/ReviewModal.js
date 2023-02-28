import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import CloseButton from "react-bootstrap/CloseButton";

function ReviewModal(props) {
  const apiAddUrl = "http://127.0.0.1:8000/api/v1/review/add/";
  const defaultReview = { "rating": 0, "comment": "" };
  
  const order = props.data.order_id;
  const reviewAvailable = props.data.review != null;
  let review = reviewAvailable ? props.data.review : defaultReview;
  const [rating , setRating] = useState(parseFloat(review.rating));

  useEffect(() => {
    setRating(parseFloat(review.rating));
  }, [review.rating]);
  
  function commentChangeHandler(e) {
    setReview({ ...review, comment: e.target.value });
  }
  
  function setReview(newReview) {
    review = reviewAvailable ? props.data.review : defaultReview;
  }
  
  function submitReview() {
    const apiURL = apiAddUrl;
    
    let data = {
      "comment": review.comment,
      "rating": review.rating,
      "order": order,
      "review": reviewAvailable ? review.id : null
    };
    
    const headers = {
      "Content-type": "application/json",
      "Authorization": "Token " + props.data.auth.token,
    } 
    
    fetch(apiURL,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      })
      .then((result) => {
        props.closeModal();
      });
  }

  return (
    <Modal show={props.show} onHide={() => {props.closeModal()}}>
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
              name="simple-controlled"
              value={rating}
              size="large"
              onChange={(event, newValue) => {
                setRating(parseFloat(newValue));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Komentar</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Vpišite komentar"
              onChange={commentChangeHandler}
              defaultValue={review.comment}
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
