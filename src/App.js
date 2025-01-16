import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo2.png';
import linkedin from './assets/linkedin.png';
import insta from './assets/instagram.png';
import mail from './assets/mail.png';
import './App.css';
import './ReactRotatingText.css';
import About from './About';
import Officers from './Officers';

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
                <Link to='/'>Calendar</Link> |
                <Link to='/officers'>Officers</Link> |
                <Link to='/'>Contact</Link>
              </nav>
            </div>
          </div>
          <a href="https://discord.gg/52RwejHd" className="join-us-button">Join Us</a>
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/officers' element= {<Officers />} />
        </Routes>

        <footer className="Website-footer">
          <p>Contact us:</p>
          <a><img src={mail} alt="mail" /></a>
          <a href="https://www.linkedin.com/company/qtam"><img src={linkedin} alt="linkedin" /></a>
          <a href="https://www.instagram.com/tamuquantum/"><img src={insta} alt="instagram" /></a>
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
          Quantum computing is <ReactRotatingText items={['Innovation', 'Powerful', 'Groundbreaking']} onTypingStart={() => console.log(`Typing Started`)} />
        </p>
      </div>
      <div className="button-container">
        <button className='learn-more-btn' onClick={handleLearnMoreClick}>Learn More</button>
      </div>
    </main>
  );
}

export default App;