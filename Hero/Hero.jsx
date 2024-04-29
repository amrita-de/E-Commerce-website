import React from 'react'
import './hero.css'
import front_temp2 from '../Assets/front_temp2.jpg'; 
import arrow from '../Assets/arrow.jpg'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left"></div>
    
      
        <div className='hand-hand-icon'>
          
            <img src={front_temp2} alt=""/>
       
      
      </div>
      <div className="hero-latest-btn">
        <div>LATEST COLLECTION</div>
        <img src={arrow} alt=''/>
      </div>
      <div className="hero-right"></div>
      
    </div>
  )
}

export default Hero
