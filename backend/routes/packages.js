import React, { useState } from 'react';
import PackageCard from '../components/PackageCard';

const packages = [
  { id: 1, name: 'Exterior Wash', price: 10 },
  { id: 2, name: 'Complete Wash', price: 25 },
  { id: 3, name: 'Full Detailing', price: 50 },
  { id: 4, name: 'Factory Reset', price: 100 }
];

function Services() {
  const [cart, setCart] = useState([]);

  const addToCart = (pkg) => {
    setCart([...cart, pkg]);
    alert(`${pkg.name} added to cart!`);
  };g

  return (
    <div>
      <h1>Our Services</h1>
      <div className="services">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Services;
