// ShopContext.jsx
import React, { createContext, useState, useEffect } from "react";
import all_product from '../Assets/all_product.js'; // Ensure correct import path
import Item from "../Items/Item.jsx";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let Cart = {};
    for (let index = 0; index < all_product.length; index++) {
        Cart[index] = 0;
    }
    return Cart;
}
const ShopContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState(getDefaultCart());

    
    
    const addToCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }
    const removefromCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
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
