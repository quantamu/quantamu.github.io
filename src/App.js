import React, {useState} from 'react';
import logo from './assets/logo2.png'
import insta from './assets/insta.jpg'
import linkedin from './assets/linkedin.png'
import mail from './assets/mail.jpg'
import './App.css';
import { useEffect } from 'react';

const messages = [
  "\"Quantum computing is an emergent field of cutting-edge computer science harnessing the unique qualities of quantum mechanics to solve problems beyond the ability of even the most powerful classical computers\" - IBM",
  "\"Quantum computers use qubits, which can represent both 0 and 1 simultaneously, allowing for more complex computations.\" - Quoate from someone Smart",
  "\"Quantum entanglement allows particles to be interconnected in such a way that the state of one particle can instantly influence the state of another, no matter the distance between them\". - YE"
];

function App() {
  const[currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
        <section>
          <h1>What is quantum Computing?</h1>
          <div className = "transparent-box">
            <p> <i>{messages[currentMessageIndex]}</i></p>
          </div>
          
        </section>

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
