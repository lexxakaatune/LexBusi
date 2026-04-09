import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4>LexBusi</h4>
            <p>Your trusted online store for mobile phones and accessories.</p>
            <div className="social-links">
              <a href="#"><FiFacebook /></a>
              <a href="#"><FiTwitter /></a>
              <a href="#"><FiInstagram /></a>
              <a href="#"><FiLinkedin /></a>
            </div>
          </div>

          <div className="col-md-3">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h4>Contact Info</h4>
            <p>📞 +234 806 539 1792</p>
            <p>✉️ info@lexbusi.com</p>
            <p>📍 Lagos, Nigeria</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 LexBusi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;