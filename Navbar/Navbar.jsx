import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../Assets/logo.jpg';
import cart_icon from '../Assets/cart_icon.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css';
import { ShopContext } from '../Context/ShopContext';



const Navbar = () => {
  const [menu,setMenu]=useState("Shop");
  const {getTotalCartItems}=useContext(ShopContext);
  return (
    <div className='navbar'>
   <div className='nav-logo'>
    <img src={logo} alt=" "/>
    
   </div>
   <ul className="Nav-menu">
    <li onClick={()=>{setMenu("Shop")}}> <Link  style={{textDecoration:'none'}}to="/">Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
    <li onClick={()=>{setMenu("Men")}}> <Link  style={{textDecoration:'none'}} to="/mens">Men </Link> {menu==="Men"?<hr/>:<></>}</li>
    <li onClick={()=>{setMenu("Women")}}><Link  style={{textDecoration:'none'}} to="/womens">Women </Link> {menu==="Women"?<hr/>:<></>}</li>
    <li onClick={()=>{setMenu("Kids")}}> <Link  style={{textDecoration:'none'}} to="/kids">Kids</Link> {menu==="Kids"?<hr/>:<></>}</li>
   </ul>
   <div className="nav-login-cart">
  {localStorage.getItem('auth-token')
   ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
   :<Link to="/login"><button type="button" className="btn btn-light">Login</button></Link>}     
   <Link to ="/cart"><img src={cart_icon} alt=" "/></Link>
 
   </div>
    </div>
  )
}

export default Navbar
