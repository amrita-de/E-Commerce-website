import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.jpg'
import navProfile from '../../assets/navProfile.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';


// Your component code here

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt='' className='nav-logo'/> 
      <img src={navProfile} alt='' className='nav-profile'/> 
    </div>
  )
}

export default Navbar
