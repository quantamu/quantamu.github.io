
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="Website-header">

        <div class = "header-content">
          <a href = "App.js">
            <img src ={`${process.env.PUBLIC_URL}/assets/logo.png`} className="header-logo" alt="logo"> </img>
          </a>
            
        </div>
        
      <center>
        <nav>
            <a href = "#About Us">About Us</a> |
            <a href = "#Calendar">Calendar</a> |
            <a href = "#Contact">Contact</a>
        </nav>
      </center>
       
        
      </header>
    </div>
  );
}

export default App;
