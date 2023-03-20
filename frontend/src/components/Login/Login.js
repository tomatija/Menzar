import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // new import
import { connect } from "react-redux"; // new import
import PropTypes from "prop-types"; // new import
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import { login } from "./LoginActions.js"; // new import

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onLoginClick = () => {
        const userData = {
            username: this.state.username,
            password: this.state.password,
        };
        this.props.login(userData, "/dashboard"); // <--- login request
    };
    render() {
        return (
            <Container>
                <Row>
                    <Col md="4">
                        <h1>Prijava</h1>
                        <Form>
                            <Form.Group controlId="usernameId">
                                <Form.Label>Uporabniško ime</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Vstavite uporabniško ime"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="passwordId">
                                <Form.Label>Vaše geslo</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Vstavite geslo"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                        </Form>
                        <Button color="primary" onClick={this.onLoginClick}>
                            Prijavi
                        </Button>
                        <p className="mt-2">
                            Nimate računa? <Link to="/signup">Ustvarite račun</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

// connect action and store and component
Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    login,
})(withRouter(Login));
