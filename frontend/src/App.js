import React, { Component } from "react";
import Root from "./Root"; // <------------- new import
import { Route, Switch } from "react-router-dom"; // <--- remove BrowserRouter
import Home from "./components/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div>
        <Root> {/* replace BrowserRouter with Root */}
          <Switch>
            <Route path="/diners" element={Signup}/>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Home} />
            <Route path="*">Ups</Route>
          </Switch>
        </Root> {/* replace BrowserRouter with Root */}
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