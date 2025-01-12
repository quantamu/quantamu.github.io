import React, {useState} from 'react';
import logo from './assets/logo2.png'
import linkedin from './assets/linkedin.png'
import insta from './assets/instagram.png'
import mail from './assets/mail.png'
import './App.css';
import './ReactRotatingText.css';






function App() {
  var ReactRotatingText = require('react-rotating-text');

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

      <main className = "home-content">
          <h1 className='title'>What is Quantum Computing?</h1>
          <div className='info-box'>
            <p >
               Quantum computing is <ReactRotatingText  items={['Innovation', 'Powerful', 'Groundbreaking']} onTypingStart={() => console.log(`Typing Started`)} />
            </p>
          </div>
          <div className="button-container">
            <button className='learn-more-btn'>Learn More</button>
          </div>

       </main>
      

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
