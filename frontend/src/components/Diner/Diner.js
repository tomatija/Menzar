import React, { Component } from "react";
import { Button } from "react-bootstrap";
const Diner = (props) => {
    const diner = props.diner;
    const date = props.date;
    
    return (
        <Button
            href={"/diners/" + diner.name + "/"}
            size="lg"
            variant="dark"
            className="mb-2 col-12"
        >
        {diner.display_name}
        </Button>
    )
}

export default Diner;