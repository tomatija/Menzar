import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from "react-bootstrap";
class Diner extends Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.display_name = props.display_name;
    }

    render() {
        return (
            <Button href={"/menus/"+this.name} variant="outline-dark" pt="4" onClick={this.routeChange}>
                {this.display_name}
            </Button>
        )
    }
}

export default Diner;