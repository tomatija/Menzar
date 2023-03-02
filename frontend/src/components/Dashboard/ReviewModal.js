import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import CloseButton from "react-bootstrap/CloseButton";
import RadioGroupRating from "./SmileyRating";

function ReviewModal(props) {
  const apiAddUrl = "http://127.0.0.1:8000/api/v1/review/add/";
  const defaultReview = { "rating": 0, "comment": "" };
  const data = props.data;
  const order_id = data.order_id;
  
  const reviewAvailable = data.review != null;
  const review = reviewAvailable ? data.review : defaultReview;

  function changeComment(newComment) {
    props.refresh({
      ...data,
      review: {
        ...review,
        comment: newComment,
      }
    });
  }
  
  function changeRating(newRating) {
    props.refresh({
      ...data,
      review: {
        ...review,
        rating: newRating,
      }
    });
  }
  
  function submitReview() {
    const apiURL = apiAddUrl;

    const requestData = {
      ...review,
      "order": order_id,
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
        body: JSON.stringify(requestData)
      })
      .then((result) => {
        props.close();
      });
  }

  return (
    <Modal show={props.show} onHide={() => {props.close()}}>
      <Modal.Header>
        <Modal.Title>Oceni jed</Modal.Title>
        <CloseButton onClick={() => props.close()} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <RadioGroupRating
              value={parseInt(review.rating)}
              onChange={(event, newValue) => {
                changeRating(newValue);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Komentar</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Vpišite komentar"
              onChange={(e) => changeComment(e.target.value)}
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
