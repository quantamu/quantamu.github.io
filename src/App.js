import React from 'react';
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
import Header from './components/Header';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Container fluid>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/calendar' element={<Calendar />} /> 
            <Route path='/officers' element= {<Officers />} />
            <Route path='/resources' element= {<Resources />} />
            <Route path='/newsletter' element={<Newsletter />} />
          </Routes>
        </Container>

        {/* For main page purposes */}
        <footer className="Website-footer">
          <p>Contact us:</p>
          <a href="mailto:tamu.quantum@gmail.com"><img src={mail} alt="mail" /></a>
          <a href="https://www.linkedin.com/company/qtam"><img src={linkedin} alt="linkedin" /></a>
          <a href="https://www.instagram.com/tamuquantum/"><img src={insta} alt="instagram" /></a>
        </footer>

        <Footer />
      </div>
    </Router>
  );
}

// Home component with Bootstrap responsive design
function Home() {
  var ReactRotatingText = require('react-rotating-text');
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  return (
    <main className="home-content">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h1 className='title'><strong>What is Quantum Computing?</strong></h1>
            <div className='info-box'>
              <p>
                Quantum computing is <ReactRotatingText items={['Innovation', 'Powerful', 'Groundbreaking', 'Next-Generation', 'Noisy']} onTypingStart={() => console.log(`Typing Started`)} />
              </p>
            </div>
            <div className="button-container">
              <button className='learn-more-btn btn btn-primary' onClick={handleLearnMoreClick}>Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;