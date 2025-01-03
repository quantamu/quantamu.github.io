import logo from './assets/logo2.png'
import insta from './assets/insta.jpg'
import linkedin from './assets/linkedin.png'
import mail from './assets/mail.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="Website-header">

        <div className = "header-content">
          <a href = "App.js">
            <img src ={logo} className="header-logo" alt="logo"/> 
          </a>
          <div className = "Navigation-header">
            <nav>
              <a href = "App.js">About Us</a> |
              <a href = "App.js">Calendar</a> |
              <a href = "App.js">Social</a>
            </nav>
          </div>
          
        </div>
        <button className = "join-us-button">Join Us</button>
      </header>

      <footer className ="Website-footer">
        <p>Contact us:</p>
        <a><img src ={mail}/></a>
        <a><img src ={linkedin}/></a>
        <a><img src ={insta}/></a>

      </footer>
      
        
      
    </div>
  );
}

export default App;
