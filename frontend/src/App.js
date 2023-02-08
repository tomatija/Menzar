import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';

function App() {

  function getCookie(name) {
    let cookieValue = null;
    //console.log(document.cookie)
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  function registerUser(){
    var csrftoken = Cookies.get();

    var url = "http://127.0.0.1:8000/user/register/";
    console.log(csrftoken)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({username:"newuser", password:"adminadmin"}),
    })
      .then((response) => {

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="http://127.0.0.1:8000/"
          target="_blank"
          rel="noopener noreferrer"
        >
          INDEX
        </a>
        <a
          className="App-link"
          href="http://127.0.0.1:8000/admin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ADMIN
        </a>
        <a
          className="App-link"
          href="http://127.0.0.1:8000/createDB/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CREATE DB
        </a>
        <a
          className="App-link"
          href="http://127.0.0.1:8000/deleteDB/"
          target="_blank"
          rel="noopener noreferrer"
        >
          DROP DB
        </a>
      </header>
      <button onClick={() => registerUser()}>register</button>
    </div>
  );
}

export default App;
