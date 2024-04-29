// Cart.jsx
import React, { useContext } from 'react';
import CartItems from '../Components/CartItems/CartItems'; // Import the CartItems component
import { ShopContext } from '../Components/Context/ShopContext'; // Import the ShopContext

const Cart = () => {
  // Access cartItems from context
  const { cartItems } = useContext(ShopContext);

  return (
    <div>
      {/* Render the CartItems component */}
      <CartItems />
    </div>
  );
};

export default Cart;
