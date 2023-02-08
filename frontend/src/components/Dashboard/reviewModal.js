import React, { useState } from "react";
import { Modal, Button, Form, Select } from "react-bootstrap";

function ReviewModal(props) {
  function closeModal() {
    props.show = false;
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
            <Form.Control as="select" size="lg" className="mb-3">
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
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          Oddaj komentar
        </Button>
        <Button onClick={() => props.closeModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ReviewModal;
