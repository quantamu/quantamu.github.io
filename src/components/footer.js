import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import CS from '../assets/sponsors/CSCE_secondary_WHT.png'
import Tamids from '../assets/sponsors/TAMIDS-Identity-Left-Dark@3x.png'
import Cai from '../assets/sponsors/CaiLogo.png'


// sponsor footer
const footer = () => {
    return (
        <footer className="Sponsor-footer">
          <div className = "Sponsor-header">
            <p> Special Thanks to our sponsors for their constant support </p> 
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
    );

};

export default footer;