import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import RadioGroupRating from "./SmileyRating";

function ReviewModal(props) {
    const apiAddUrl = "review/add/";
    const defaultReview = { rating: 0, comment: "" };
    const data = props.data;
    const order = data.order;
    const reviewAvailable = data.review != null;
    const review = reviewAvailable ? data.review : defaultReview;

    function changeComment(newComment) {
        props.refresh({
            ...data,
            review: {
                ...review,
                comment: newComment,
            },
        });
    }

    function changeRating(newRating) {
        props.refresh({
            ...data,
            review: {
                ...review,
                rating: newRating,
            },
        });
    }

    function submitReview() {
        const apiURL = apiAddUrl;

        const requestData = {
            ...review,
            order_id: order.pk,
            review: reviewAvailable ? review.id : null,
            order_date: reviewAvailable ? order.menu.date : null
        };
        axios.post(apiURL, requestData).then((result) => {
            props.close();
        }).then((response) => {
            toast.success("Success");
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(JSON.stringify(error.response.data));
            } else if (error.message) {
                // the error message is available,
                // let's display it on error toast
                toast.error(JSON.stringify(error.message));
            } else {
                // strange error, just show it
                toast.error(JSON.stringify(error));
            }
        });;
    }

    return (
        <Modal
            show={props.show}
            onHide={() => {
                props.close();
            }}
        >
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
