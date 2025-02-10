import React from 'react';
import './Addcart.css';

function PackageCard({ pkg, addToCart }) {
  return (
    <div className="package-card">
      <h2>{pkg.name}</h2>
      <p className="price">Price: ${pkg.price}</p>
      <button className="add-to-cart" onClick={() => addToCart(pkg)}>
        Add to Cart
      </button>
    </div>
  );
}

export default PackageCard;

