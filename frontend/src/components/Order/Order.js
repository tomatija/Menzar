import React, { useState } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import ReviewModal from "./ReviewModal";

import { Rating } from "react-simple-star-rating";

const Order = (props) => {
    const menu = props.order.menu;
    const diner = menu.diner.display_name;
    const dish = menu.dish.name;
    const soup = menu.soup.name;
    const id = props.order.pk;
    const review = props.review;
    const accordionID = props.accordionID.toString();

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [modalEditMode, setModalEditMode] = useState(false);

    function refreshOrder() {
        setShowReviewModal(false);
    }

    function deleteOrder() {
        const apiURL = "http://127.0.0.1:8000/api/v1/order/remove/" + id + "/";
        fetch(apiURL).then(props.refreshParent);
    }

    const reviewButton = (
        <Button onClick={() => setShowReviewModal(true)}>Oceni kosilo</Button>
    );

    const reviewElement = review === undefined ? reviewButton : (
        <div
            style={{
                border: "3px solid rgba(0, 0, 0,0.1)",
                maxWidth: "fit-content",
                borderRadius: "10px",
                padding: "20px",
            }}
        >
            <p>{review === undefined ? "Naročila niste ocenili" : review.comment}</p>
            <Rating allowFraction={true} readonly={true} initialValue={review.rating} />
            <br></br>
            <Button
                onClick={() => {
                    setModalEditMode(true);
                    setShowReviewModal(true);
                }}
            >
                Uredi
            </Button>
        </div>
    );
    return (
        <Card>
            <ReviewModal
                show={showReviewModal}
                closeModal={refreshOrder}
                orderID={id}
                auth={props.auth}
                review={review}
                edit={modalEditMode}
            />
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey={accordionID}>
                    Naročilo v {diner}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={accordionID}>
                <Card.Body>
                    <p>{soup}</p>
                    <p>{dish}</p>
                    {reviewElement}

                    <Button className="float-right" onClick={() => deleteOrder()}>
                        Izbriši naročilo
                    </Button>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};
export default Order;
