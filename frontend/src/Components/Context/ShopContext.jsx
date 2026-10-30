// ShopContext.jsx
import React, { createContext, useState, useEffect } from "react";
import all_product from '../Assets/all_product.js'; // Ensure correct import path

export const ShopContext = createContext(null);
const API_BASE = 'http://localhost:4000';

const getDefaultCart = () => {
    let Cart = {};
    for (let index = 0; index < all_product.length; index++) {
        Cart[index] = 0;
    }
    return Cart;
}

// Post a cart mutation to the backend when the shopper is logged in, so the
// cart is saved on their account instead of living only in React state.
const syncCart = (endpoint, itemId) => {
    const token = localStorage.getItem('auth-token');
    if (!token) return;
    fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token,
        },
        body: JSON.stringify({ itemId: itemId }),
    }).catch((error) => console.log('Cart sync failed: ' + error));
};

const ShopContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState(getDefaultCart());

    // Restore the saved cart for a logged-in shopper on load.
    useEffect(()=>{
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch(`${API_BASE}/getcart`,{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'auth-token':token,
                },
                body:'',
            }).then((response)=>response.json())
              .then((data)=>{ if(data && typeof data === 'object') setCartItems(data); })
              .catch((error)=>console.log('Cart restore failed: '+error));
        }
    },[])

    const addToCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        syncCart('addtocart', itemId);
    }
    const removefromCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        syncCart('removefromcart', itemId);
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.Id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        // eslint-disable-next-line
        return totalAmount;
    }
    const getTotalCartItems =()=>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[Item]>0){
                totalItem+= cartItems[Item];
            }
        }
        return totalItem;
    }


    const contextValue={getTotalCartItems,all_product,cartItems,addToCart,removefromCart,getTotalCartAmount};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
