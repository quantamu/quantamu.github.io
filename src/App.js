
import './index.css';


function App() {
  return (
    <div className="App">
      <header className="Website-header">
        <img src={'${process.env.PUBLIC_URL}/logo.png'} className="header-logo"></img>
        <nav style = "margin-top: 10px">
    
            <a href = "#About Us"> About Us </a> |
            <a href = "#Calendar"> Calendar </a> |
            <a href = "#Contact"> Contact</a>
          
        </nav>
        
      </header>
    </div>
  );
}

export default App;
