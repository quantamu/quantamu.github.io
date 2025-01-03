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
              <a href = "App.js">Officers</a> |
              <a href = "App.js">Contact</a>
            </nav>
          </div>
          
        </div>
        <a href = "https://discord.gg/52RwejHd" className = "join-us-button">Join Us</a>
      </header>

      <footer className ="Website-footer">
        <p>Contact us:</p>
        <a><img src ={mail}/></a>
        <a href ="https://www.linkedin.com/company/qtam"><img src ={linkedin}/></a>
        <a href = "https://www.instagram.com/tamuquantum/"><img src ={insta}/></a>

      </footer>
      
        
      
    </div>
  );
}

export default App;
