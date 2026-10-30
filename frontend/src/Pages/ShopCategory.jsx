// ShopCategory.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../Components/Context/ShopContext';
import Item from '../Components/Items/Item';
import banner from '../Components/Assets/banner.jpg';
import './ShopCatagory.css'
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext) || {};
  
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="Banner" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-8</span>out of 24 products
        </p>
        
      </div>
      <div className="shopcategory-products">
        {all_product && all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.Id} // Use 'Id' instead of 'id'
                name={item.name}
                image={item.Image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
