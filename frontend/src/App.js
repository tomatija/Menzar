import { useEffect, useState } from 'react';
import Diner from './Diner/Diner';

import './App.css';

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
