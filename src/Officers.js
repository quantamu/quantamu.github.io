import React from 'react';
import './Officers.css'
import aditya from './assets/officers/aditya.png'
import ishaan from './assets/officers/ishaan.png'
import samuel from './assets/officers/samuel.png'
import johnathan from  './assets/officers/johnathan.png'

function officers()  {

    return (
        <main> 
            <h1 className ='header-section'><strong>Our Team</strong></h1>
                <div className = 'team-content'>
                    <div className = 'box'>
                        <div className ="image-wrap">
                            <img src = {aditya} className = 'officer-images'/>
                        </div>
                        <p> Aditya Mishra, President</p>
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
                            <img src = {johnathan} className = 'officer-images'/>
                        </div>
                        <p> Johnathan Shirley, Secretary </p>
                    </div>
                    <div className = 'box'>
                        <div className ="image-wrap">
                            <img src = {ishaan} className = 'officer-images'/>
                        </div>
                        <p> Ishaan Kelkar, Treasurer </p>
                    </div>

                </div>
        </main>
    )

}

export default officers;