import React, { Component } from "react";
import Root from "./Root"; // <------------- new import
import { Route, Switch } from "react-router-dom"; // <--- remove BrowserRouter
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import DinerListPage from "./components/DinersListPage";
import DinerDetailsPage from "./components/DinerDetailsPage";
import DinerMenusPage from "./components/DinersMenusPage";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import UserRequired from "./utils/UserRequired";
import Navigation from "./components/Navbar/Navigation";
import UserOptional from "./utils/UserOptional";

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL === undefined
        ? "http://127.0.0.1:8000/api/v1/"
        : process.env.REACT_APP_BACKEND_URL + "api/v1/";

axios.defaults.baseURL = BACKEND_URL;

// below <Root> add
class App extends Component {
    render() {
        return (
            <div>
                <Root>
                    <Navigation />
                    <ToastContainer hideProgressBar={true} newestOnTop={true} />
                    <Switch>
                        <Route exact path="/diners" component={UserOptional(DinerListPage)} />
                        <Route exact path="/diner/:diner" component={DinerDetailsPage} />
                        <Route exact path="/diner/:diner/:date" component={UserOptional(DinerMenusPage)} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/dashboard" component={UserRequired(Dashboard)} />
                        <Route exact path="/" component={UserOptional(DinerListPage)} />
                        <Route path="*">Ups</Route>
                    </Switch>
                </Root>
            </div>
        );
    }
}

export default App;
