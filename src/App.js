import logo from './logo.png';
import './index.css';


function App() {
  return (
    <div className="App">
      <header className="Website-header">
        <img src={logo} className="header-logo"></img>
        <nav>
          <ul>
            <li><a href='#home'> Home </a></li>
            <li><a href='#about-us'> About Us</a></li>
            <li><a href ="#calendar"> Calendar</a></li>
          </ul>
        </nav>
        
      </header>
    </div>
  );
}

export default App;
