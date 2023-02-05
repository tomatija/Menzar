import React, { Component } from "react";
import { Button } from "react-bootstrap";
class Diner extends Component {
    constructor(props) {
        super(props);
        this.date = props.date;
        this.diner = props.diner;
    }

    render() {
        return (
            <Button href={"/diners/"+this.diner.name+"/"} variant="outline-dark" pt="4">
                {this.diner.display_name}
            </Button>
        )
    }
}

export default Diner;