import React, { Component } from "react";
import {
  Container,
  Row,
    Col,
  Button
} from "react-bootstrap";


class DinerDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.splitPath = window.location.pathname.split('/');
        this.dinerName = this.splitPath[this.splitPath.length - 2];
    }
        
    render()
    {
        return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <Button href={"/diners/"+this.dinerName+"/today/"} variant="outline-dark">
                            Današnji meni
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button href={"/diners/"+this.dinerName+"/16-6-2022/"} variant="outline-dark">
                            Menu 16. 6. 2022
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DinerDetailsPage;