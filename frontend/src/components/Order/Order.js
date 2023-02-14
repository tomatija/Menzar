import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";

const Order = (props) => {
    const diner = props.order.menu.diner.display_name;
    const menu = props.order.menu;
    const dish = menu.dish.name;
    const soup = menu.soup.name;
    const id = props.order.pk;
    const accordionID = props.accordionID.toString();
    const date = menu.date.split("-").reverse().join(".");
    function deleteOrder() {
        const apiURL = "http://127.0.0.1:8000/api/v1/order/remove/" + id + "/";
        fetch(apiURL).then(props.refreshParent);
    }
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey={accordionID}>
                    Naročilo <b>{date}</b> v <b>{diner}</b>
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
