
import './index.css';


function App() {
  return (
    <div className="App">
      <header className="Website-header">
        <img src={'${process.env.PUBLIC_URL}/logo.png'} className="header-logo"></img>
        <nav>
          <ul>
            <li><a href='#home'> Home </a> <a href='#about-us'> About Us</a> <a href ="#calendar"> Calendar</a></li>
          </ul>
        </nav>
        
      </header>
    </div>
  );
}

export default App;
