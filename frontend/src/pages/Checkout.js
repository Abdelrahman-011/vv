import React, { useState } from 'react';
import './Checkout.css'; // Import the CSS file

const Checkout = ({ cart, onCheckout }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerName || !address) {
      alert('Please fill in all fields');
      return;
    }

    const order = {
      customerName,
      address,
      paymentMethod,
      items: cart,
      total: cart.reduce((total, item) => total + item.price, 0),
    };

    onCheckout(order);
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Cash on Delivery</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;