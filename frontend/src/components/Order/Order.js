import React, { useState } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import ReviewModal from "../Dashboard/ReviewModal";

import { Rating } from "react-simple-star-rating";

const Order = (props) => {
    const order = props.order;
    const menu = order.menu;
    const diner = menu.diner.display_name;
    const dish = menu.dish.name;
    const soup = menu.soup.name;
    const review = order.review;
    const reviewAvailable = review !== null;
    const openModal = props.openModal;
    
    const accordionID = props.accordionID.toString();

    function deleteOrder() {
        const apiURL = "http://127.0.0.1:8000/api/v1/order/remove/" + order.pk + "/";
        fetch(apiURL).then(props.refreshParent);
    }

    const reviewButton = (
        <Button onClick={() => openModal(order)}>Oceni kosilo</Button>
    );
    
    const reviewElement =!reviewAvailable ? reviewButton :(
        <div>
            <p>{review.comment}</p>
            <Rating allowHalfIcon={true} readonly={true} ratingValue={parseFloat(review.rating)} />
            <br></br>
            <Button>
                Uredi
            </Button>
        </div>
    );
    
    return (
        <Card>
            
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey={accordionID}>
                    {menu.date.split("-").reverse().join(".")} - Naročilo v {diner}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={accordionID}>
                <Card.Body>         
                    <p>{soup}</p>
                    <p>{dish}</p>
                    {reviewElement}
                    <Button className="float-right mb-2" onClick={() => deleteOrder()}>
                        Izbriši naročilo
                    </Button>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};
export default Order;
