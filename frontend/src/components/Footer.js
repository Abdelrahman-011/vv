import React from 'react';
import './Footer.css'; // Import the CSS file

function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="footer">
      <p>© {currentYear} VroomVerse | All Rights Reserved.</p>
      <p>
        Follow us:{' '}
        <a href="https://www.facebook.com" className="footer-link">Facebook</a> |{' '}
        <a href="https://www.twitter.com" className="footer-link">Twitter</a> |{' '}
        <a href="https://www.instagram.com" className="footer-link">Instagram</a>
      </p>
    </footer>
  );
}

export default Footer;