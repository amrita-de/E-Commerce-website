import React from 'react';

const Breadcrum = ({ product }) => {
  // Check if product exists and has the category property
  if (!product || !product.category) {
    return null; // Return null if product or category is undefined
  }

  return (
    <div className='breadcrum'>
      HOME / SHOP / {product.category} / {product.name}
    </div>   
  );
};

export default Breadcrum;


