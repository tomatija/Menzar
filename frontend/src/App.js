import logo from './logo.svg';
import './App.css';

function App() {
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
    </div>
  );
}

export default App;
