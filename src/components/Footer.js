import React from 'react';
import '../components/Style/Footer.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Footer Section */}
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <img src={logo} className="footer-logo" alt="ZilBiz Logo" />
              <h2 className="footer-title">ZilBiz</h2>
            </Link>
            <p className="footer-description">
              Mauritius's premier SME listing and review platform. Connecting businesses with customers since 2023.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/" aria-label="Home">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" aria-label="About">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" aria-label="Services">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/business-listings" aria-label="Business Listings">
                  Business Listings
                </Link>
              </li>
              <li>
                <Link to="/write-a-review" aria-label="Write a Review">
                  Write a Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-links">
            <h3>Support</h3>
            <ul>
              <li>
                <Link to="/faq" aria-label="FAQ">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" aria-label="Help Center">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" aria-label="Contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/feedback" aria-label="Feedback">
                  Feedback
                </Link>
              </li>
              <li>
                <Link to="/admin" aria-label="Admin">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li>
                <Link to="/terms-conditions" aria-label="Terms and Conditions">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" aria-label="Privacy Policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" aria-label="Cookie Policy">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" aria-label="Disclaimer">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <p>Flic-en-flac, Mauritius</p>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <p>(+230) 5932 5196</p>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <p>contact@zilbiz.mu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Footer Section */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} ZilBiz. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> in Mauritius
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;