import React from 'react';
import './Officers.css'
import sam from './assets/officers/sam.png'
import arjum from './assets/officers/Arjum.png'
import samuel from './assets/officers/samuel.png'
import andrii from  './assets/officers/andrii.png'
import huang from './assets/officers/huang.png'

function officers()  {

    return (
        <main> 
            <h1 className ='header-section'>Our Team</h1>
                <div className = 'team-content'>
                    <div className = 'box'>
                        <img src = {sam} className = 'officer-images'/>
                        <p> Samuel Bieberich, President</p>
                    </div>
                    <div className = 'box'>
                        <img src = {arjum} className = 'officer-images'/>
                        <p> Arjun Som, Vice President</p>
                    </div>
                </div>
                <div className = 'team-content'>
                    <div className = 'box'>
                        <img src = {samuel} className = 'officer-images'/>
                        <p> Samuel Molero, Secretary & Webmaster</p>
                    </div>
                    <div className = 'box'>
                        <img src = {andrii} className = 'officer-images'/>
                        <p> Andrii Kryvenko, Treasurer </p>
                    </div>

                </div>
        </main>
    )

}

export default officers;