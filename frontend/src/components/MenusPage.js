import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";

import Menu from "./Menus/Menu";

class MenusPage extends Component {
    constructor(props) {
        super(props);
        this.splitPath = window.location.pathname.split('/');
        this.dinerName = this.splitPath[this.splitPath.length - 1];
        this.apiUrl = 'http://127.0.0.1:8000/api/menus/' + this.dinerName;
        console.log(this.apiUrl);
        this.state = {
            error: null,
            isLoaded: false,
            menus: []
        };        
    }
    
    componentDidMount() {
        fetch(this.apiUrl)
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    menus: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error: error
                });
            }
        );
    }
    
    render()
    {
        const { error, isLoaded, menus } = this.state;
        console.log(this.state)
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <Container>
                    <Row pt="4" >
                    {menus.map((menu, index) => (
                            <Col md="4" key={index}>
                                <Menu menu={menu} /><br></br>
                            </Col>
                    ))}
                    </Row>
                </Container>
            );
        }
    }
}

export default MenusPage;