import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addProd from '../../assets/addProd.jpg'
import ProdList from '../../assets/ProdList.jpg'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
      <div className='sidebar-item'>
        <img src={addProd} alt=''/>
        <p>Add Product</p>
        </div></Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className='sidebar-item'>
        <img src={ProdList} alt=''/>
        <p>Product List</p>
        </div></Link>
    </div>
  )
}

export default Sidebar
