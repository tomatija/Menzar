import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";

const Order = (props) => {
    const diner = props.order.diner;
    const dish = props.order.dish;
    const soup = props.order.soup;
    const id = props.order.id;
    const accordionID = props.test.toString();
    console.log(accordionID);
    
    function deleteOrder() {
        const apiURL = "http://127.0.0.1:8000/api/v1/order/remove/" + id + "/";
        fetch(apiURL).then(props.refreshParent);
    }
    return (
    <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="light" eventKey={accordionID}>
        Naročilo v {diner}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={accordionID}>
                <Card.Body>
                <p>{soup}</p>
                <p>{dish}</p>
                    
                <Button
                    onClick={() => deleteOrder()}>
                    Delete
                    </Button>
                </Card.Body>
    </Accordion.Collapse>
        </Card>
    )
};
export default Order;
