import React, { Component } from "react";
import Root from "./Root"; // <------------- new import
import { Route, Switch } from "react-router-dom"; // <--- remove BrowserRouter
import Home from "./components/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import DinerListPage from "./components/DinersListPage";
import DinerDetailsPage from "./components/DinerDetailsPage";
import DinerMenusPage from "./components/DinersMenusPage";

//TODO: For nested paths, check: https://ui.dev/react-router-nested-routes
class App extends Component {
  render() {
    return (
      <div>
        <Root>
          <Switch>
            <Route exact path="/diners" component={DinerListPage}/>
            <Route exact path="/diners/:diner" component={DinerDetailsPage}/>
            <Route exact path="/diners/:diner/:date" component={DinerMenusPage}/>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Home} />
            <Route path="*">Ups</Route>
          </Switch>
        </Root> 
      </div>
    );
  }
}

export default App;

/*import { useEffect, useState } from 'react';
import Diner from './components/Diner/Diner';

function App() {
  const [menus, setData] = useState([]);
  const apiUrl = 'http://127.0.0.1:8000/'
  
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(menus => setData(menus))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <th>Ime menze</th>
          </tr>
          {menus.map((menu, index) => (
            <tr key={index}>
              <td><Diner name={menu.name} display_name={menu.display_name} /></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
*/