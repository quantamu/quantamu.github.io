import React from 'react';
import './Officers.css'
import Shameem from './assets/officers/shameem.png'
import nathan from './assets/officers/nathan.png'
import samuel from './assets/officers/samuel.png'
import ezra from  './assets/officers/ezra.png'

function officers()  {

    return (
        <main> 
            <h1 className ='header-section'><strong>Our Team</strong></h1>
                <div className = 'team-content'>
                    <div className = 'box'>
                        <div className ="image-wrap">
                            <img src = {Shameem} className = 'officer-images'/>
                        </div>
                        <p> Shameem Monjazeb, President</p>
                    </div>
                    <div className = 'box'>
                        <div className ="image-wrap">
                            <img src = {samuel} className = 'officer-images'/>
                        </div>
                        <p> Samuel Molero, Vice President</p>
                    </div>
                </div>
                <div className = 'team-content'>
                    <div className = 'box'>
                        <div className ="image-wrap">
                            <img src = {ezra} className = 'officer-images'/>
                        </div>
                        <p> Ezra SoRelle, Secretary </p>
                    </div>
                    <div className = 'box'>
                        <div className ="image-wrap">
                            <img src = {nathan} className = 'officer-images'/>
                        </div>
                        <p> Nathan Ngata, Treasurer </p>
                    </div>

                </div>
        </main>
    )

}

export default officers;