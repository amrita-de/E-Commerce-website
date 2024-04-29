import React from 'react'
import './RelatedProducts.css'
import Item from '../Items/Item'

import data_product from '../Assets/data_product.js';

const RealatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1><hr/>
      <div className='relatedproducts-item'>
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.Id} name={item.name}  image={item.Image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RealatedProducts;
