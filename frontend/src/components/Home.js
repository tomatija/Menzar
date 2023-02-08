import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";

const Home = (props) => {
  
    return (
      <Container>
        <h1>Home</h1>
            <Button
                className="m-2 col-5"
                href="/diners"
                variant="dark"
                size="lg"
            >
                Diners
            </Button>
            <Button
                className="m-2 col-5"
                href="/dashboard"
                variant="dark"
                size="lg"
            >
                Dashboard
            </Button>
            <Button
                className="m-2 col-5"
                href="/login"
                variant="dark"
                size="lg"
            >
            Login
            </Button>
            <Button
                className="m-2 col-5"
                href="/signup"
                variant="dark"
                size="lg"
            >
                Sign up
            </Button>
        </Container>
    );
  
}

export default Home;