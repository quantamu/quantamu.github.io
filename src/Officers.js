import React from 'react';
import './Officers.css'
import sam from './assets/officers/sam.png'
import arjum from './assets/officers/Arjum.png'

function officers()  {

    return (
        <main> 
            <h1 className ='header-section'>Our Team</h1>
            <div className = 'team-content'>
                <div className = 'box'>
                    <img src = {sam} className = 'officer-images'/>
                </div>
                <p> Samuel Bieberich, President</p>
                <div className = 'box'>
                    <img src = {arjum} className = 'officer-images'/>
                </div>
                <p> Arjun Som, Vice President</p>
            </div>


            
        </main>
    )

}

export default officers;