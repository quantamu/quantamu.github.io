import logo from './assets/logo2.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="Website-header">

        <div className = "header-content">
          <a href = "App.js">
            <img src ={logo} className="header-logo" alt="logo"/> 
          </a>
        </div>
        <button className = "join-us-button">Join Us</button>
      </header>
      <center>
        <nav>
            <a href = "#About Us">About Us</a> |
            <a href = "#Calendar">Calendar</a> |
            <a href = "#Contact">Contact</a>
        </nav>

        </center>   
    </div>
  );
}

export default App;
