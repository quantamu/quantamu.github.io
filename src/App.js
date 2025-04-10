import React from 'react';
import { HashRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo2.png';
import linkedin from './assets/linkedin.png';
import insta from './assets/instagram.png';
import mail from './assets/mail.png';
import './App.css';
import './ReactRotatingText.css';
import About from './About';
import Officers from './Officers';
import Calendar from './Calendar';
import Newsletter from './Newsletter';
import Resources from './Resources';
import CS from './assets/sponsors/CSCE_secondary_WHT.png'
import Tamids from './assets/sponsors/TAMIDS-Identity-Left-Dark@3x.png'
import Cai from './assets/sponsors/CaiLogo.png'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="Website-header">
          <div className="header-content">
            <Link to='/'>
              <img src={logo} className="header-logo" alt="logo" />
            </Link>
            <div className="Navigation-header">
              <nav>
                <Link to='/about'>About Us</Link> |
                <Link to='/calendar'>Calendar</Link> |
                <Link to='/officers'>Officers</Link> |
                <Link to='/resources'>Resources</Link> |
                <Link to='/newsletter'>Newsletter</Link>
              </nav>
            </div>
          </div>
         
          <a href="https://discord.gg/YH5PWp8E2S" className="join-us-button">Join Us</a>  
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/calendar' element={<Calendar />} /> 
          <Route path='/officers' element= {<Officers />} />
          <Route path='/resources' element= {<Resources />} />
          <Route path='/newsletter' element={<Newsletter />} />
        </Routes>

        <footer className="Website-footer">
          <p>Contact us:</p>
          <a href="mailto:tamu.quantum@gmail.com"><img src={mail} alt="mail" /></a>
          <a href="https://www.linkedin.com/company/qtam"><img src={linkedin} alt="linkedin" /></a>
          <a href="https://www.instagram.com/tamuquantum/"><img src={insta} alt="instagram" /></a>
        </footer>

       
        <footer className="Sponsor-footer">
          <div className = "Sponsor-header">
            <p> Sponsored by: </p> 
          </div>
          
          <div className='Sponsor-logos'>
            <a href="https://tamids.tamu.edu/">
            <img src={Tamids} alt="TAMIDS" className="sponsor-logo" />
            </a>
            <a href="https://engineering.tamu.edu/cse/index.html" >
              <img src={CS} alt="Computer Science Department" className="sponsor-logo2" />
            </a>
            <a href="https://cailab-tamu.github.io/#page-top">
            <img src={Cai} alt="TAMIDS" className="sponsor-logo3" />
          </a>

          </div>
          
        </footer>
      </div>
    </Router>
  );
}

// Monkey code but is Ok!
function Home() {
  var ReactRotatingText = require('react-rotating-text');
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  return (
    <main className="home-content">
      <h1 className='title'>What is Quantum Computing?</h1>
      <div className='info-box'>
        <p>
          Quantum computing is <ReactRotatingText items={['Innovation', 'Powerful', 'Groundbreaking', 'Next-Generation', 'Noisy']} onTypingStart={() => console.log(`Typing Started`)} />
        </p>
      </div>
      <div className="button-container">
        <button className='learn-more-btn' onClick={handleLearnMoreClick}>Learn More</button>
      </div>
    </main>
    
  );
}

export default App;