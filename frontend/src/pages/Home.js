import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home">
      <h1>Welcome to VroomVerse 🚗</h1>
      <p>Your one-stop solution for professional car washing services at home.</p>
      <Link to="/services" className="home-link">
        Explore Our Services
      </Link>
    </div>
  );
}

export default Home;