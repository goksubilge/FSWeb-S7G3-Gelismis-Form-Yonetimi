import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form />

        {/*
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          />
          Learn React */}
      </header>
    </div>
  );
}

export default App;
