import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
// Import the remove icon image with correct path
import remove_icon from '../Assets/remove_icon.jpg';

const CartItems = () => {
  // Accessing context using useContext hook
  const {  getTotalCartAmount,all_product, cartItems, removefromCart } = useContext(ShopContext);

  console.log(cartItems);
  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {all_product.map((e) => {
  if (cartItems[e.Id] > 0) {
    return (
      <div className='cartitems-format cartitem-format-main'>
        <img src={e.Image} alt='' className='carticon-product-icon'/>
        <p>{e.name}</p>
        <p>${e.new_price}</p>
        <button className='cartitems-quantity'>{cartItems[e.Id]}</button>
        <p>${e.new_price * cartItems[e.Id]}</p>
        <img src={remove_icon} onClick={() => removefromCart(e.Id)} alt='Remove' />
      </div>
    );
  }
  return null; // Returning null for items with quantity 0
})}
<div className="cartitems-down">
  <div className="cartitems-total">
    <h1>Cart Totals</h1>
    <div>
      <div className='cartitems-total-item'>
        <p>Subtotal</p>
        <p>${getTotalCartAmount()}</p>

      </div>
      <hr/>
      <div className='cartitems-total-item'>
        <p>Shipping Free</p>
        <p>Free</p>
      </div>
      <hr/>
      <div className='cartitems-total-item'>
        <h3>Total</h3>
        <h3>${getTotalCartAmount()}
</h3>
      </div>
    </div>
    <button>PROCEED TO CHECKOUT</button>
  </div>
  <div className='cartitems-promocode'>
    <p>If you have a promo code, Enter it here</p>
    <div className="classitems-promobox">
      <input type='text' placeholder='Promo code'/>
      <button>Submit</button>
    </div>
  </div>
</div>

    </div>
  );
};

export default CartItems;
