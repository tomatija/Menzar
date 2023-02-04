import React, { Component} from "react";
import { Button } from "react-bootstrap";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.diner = props.diner;
        this.soupString = props.soup;
        
        //TODO: Check if splitting with "," is the best way to do this
        this.dishString = props.dish.split(",");
    }
        
    onMenuClick = () => {
        //TODO: Implement user when user login is implemented
        //const userData = {
        //    username: this.state.username,
        //    password: this.state.password
        //};
        console.log("User ordered " + this.soupString + " and " + this.dishString + " at " + this.diner);
    };
    
    render() {
        return (
            <Button variant="outline-dark" pt="4" onClick={this.onMenuClick}>
                <li>{this.soupString}</li>
                {this.dishString.map((dish, index) => (
                    <li key={index}>{dish}</li>))
                }
            </Button>
        )
    }
}

export default Menu;