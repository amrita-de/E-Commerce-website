import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./ProductDisplay.css";
import star_img from "../Assets/star_img.jpg";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  console.log('Product prop:', props.product); // Add the console.log here
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <div className="productdisplay-main-img">
            {/* Wrap the img tag with Link */}
            <Link to={`/product/${product.Id}`}> {/* Fix the Link component */}
              <img src={product.Image} alt="" />
            </Link>
          </div>
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <img src={star_img} alt="" />
          <p>(134)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => { addToCart(product.Id) }}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Women , T-shirt,Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest-
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
