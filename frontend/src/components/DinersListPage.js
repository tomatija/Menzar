import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";

import Diner from "./Diner/Diner";

class DinerListPage extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = 'http://127.0.0.1:8000/api/v1/diners/';
        this.state = {
            error: null,
            isLoaded: false,
            diners: []
        };        
    }
    
    componentDidMount() {
        fetch(this.apiUrl)
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    diners: result
                });
            console.log(result);
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            console.log(error);
            }
        );
    }
    
    render()
    {
        const { error, isLoaded, diners } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <Container>
                    <Row>
                        {diners.map((diner, index) => (
                            <Diner key={index}  diner={diner} date={this.date} />
                        ))}
                    </Row>
                </Container>
            );
        }
    }
}

export default DinerListPage;