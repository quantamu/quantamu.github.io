import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './assets/logo2.png'
import linkedin from './assets/linkedin.png'
import insta from './assets/instagram.png'
import mail from './assets/mail.png'
import './App.css';
import './ReactRotatingText.css';
import About from './About';


function App() {
  var ReactRotatingText = require('react-rotating-text');

  return (
    <Router>
      <div className="App">
        <header className="Website-header">

          <div className = "header-content">
            <Link to = '/'>
              <img src ={logo} className="header-logo" alt="logo"/> 
            </Link>
            <div className = "Navigation-header">
              <nav>
                <Link to = '/about'>About Us</Link> |
                <Link to = '/'>Calendar</Link> |
                <Link to = '/'>Officers</Link> |
                <Link to = '/'>Contact</Link>
              </nav>
            </div>
            
          </div>
          <a href = "https://discord.gg/52RwejHd" className = "join-us-button">Join Us</a>
        </header>
      
        <Routes>
          <Route path='/' element={
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
          } />
        <Route path="/about" element={<About />} />
         {/* somestuff here */}
       </Routes>
        

        <footer className ="Website-footer">
          <p>Contact us:</p>
          <a><img src ={mail}/></a>
          <a href ="https://www.linkedin.com/company/qtam"><img src ={linkedin}/></a>
          <a href = "https://www.instagram.com/tamuquantum/"><img src ={insta}/></a>

        </footer>
        
      </div>  
    </Router>
      
   
  );
}

export default App;
