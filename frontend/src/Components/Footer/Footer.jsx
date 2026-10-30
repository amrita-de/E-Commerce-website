import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src="" alt=""/>
            <p>FASTSHOP</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
      
        <div className='footer-icon-container'>
        <div className="container p-4 pb-0">
    <section class="mb-4"/>
        </div>
       
        <a
        className="btn text-white btn-floating m-1"
        style={{ backgroundColor: '#dd4b39' }}
        href="#!"
        role="button"
        ><i class="fab fa-instagram"></i
      ></a>
        
        
        <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor: '#dd4b39'}}
        href="#!"
        role="button"
        ><i class="fab fa-google"></i
      ></a>
        
      </div>
      <div className='footer-copyright'>
        <hr/>
        <p>Copyright @2024 -All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
