import React,{useState} from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import ReviewModal from "../Dashboard/reviewModal";



const Order = (props) => {
  const diner = props.order.diner;
  const dish = props.order.dish;
  const soup = props.order.soup;
  const id = props.order.id;
  const accordionID = props.accordionID.toString();
  console.log(accordionID);

  const [showReviewModal, setShowReviewModal] = useState(false);


  function deleteOrder() {
    const apiURL = "http://127.0.0.1:8000/api/v1/order/remove/" + id + "/";
    fetch(apiURL).then(props.refreshParent);
  }
  return (
    <Card>
      <ReviewModal show={showReviewModal} closeModal = {() => setShowReviewModal()}/>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="light" eventKey={accordionID}>
          Naročilo v {diner}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={accordionID}>
        <Card.Body>
          <p>{soup}</p>
          <p>{dish}</p>

          <Button className="float-right" onClick={() => deleteOrder()}>
            Delete
          </Button>
          <Button onClick={() => setShowReviewModal(true)}>Review</Button>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
export default Order;
