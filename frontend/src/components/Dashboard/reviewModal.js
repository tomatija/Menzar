import React, { useState } from "react";
import { Modal, Button, Form, Select } from "react-bootstrap";

function ReviewModal(props) {
  const [comment, setComment] = useState();
  const [rating, setRating] = useState(1);

  function ratingChangeHandler(e) {
    setRating(e.target.value);
  }

  function commentChangeHandler(e) {
    setComment(e.target.value);
  }

  function submitReview() {
    const apiURL = "http://127.0.0.1:8000/api/v1/review/add/";

    const data = { comment: comment, grade: rating, order: props.orderID };

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
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Ocena</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              className="mb-3"
              onChange={ratingChangeHandler}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Control>
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
        <Button onClick={() => props.closeModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ReviewModal;
