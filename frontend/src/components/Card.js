import React from 'react';
import './Card.css'; // Import the CSS file

function Card({ pkg, addToCart }) {
  return (
    <div className="card">
      <h2>{pkg.name}</h2>
      <p>Price: ${pkg.price}</p>
      <button onClick={() => addToCart(pkg)}>Add to Cart</button>
    </div>
  );
}

export default Card;
