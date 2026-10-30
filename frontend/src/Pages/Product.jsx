import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import { ShopContext } from '../Components/Context/ShopContext'; // Correct import path

const Product = () => {
  const { id } = useParams(); // Use useParams directly to get the id parameter

  console.log('Params:', useParams()); // Log the entire params object
  console.log('Id:', id); // Log the id parameter

  const { all_product } = useContext(ShopContext);

  const product = all_product.find((e)=>e.Id === Number(id));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>Product Page</h1>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <RelatedProducts />
    </div>
  );
};

export default Product;
