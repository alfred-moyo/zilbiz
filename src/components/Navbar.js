import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp, FaBars, FaTimes, FaUser, FaBuilding, FaPen, FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import '../components/Style/Navbar.css';

function Navbar() {
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleBusinessMenu = () => {
    setIsBusinessOpen(!isBusinessOpen);
  };

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo and Mobile Menu Button */}
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <h2 className="logo">ZilBiz</h2>
          </Link>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Search for businesses, services..." aria-label="Search" />
            <button className="search-button" aria-label="Search button">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
          <Link to="/" className="nav-link" aria-label="Home">
            <span className="nav-icon"><FaHome /></span>
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/write-a-review" className="nav-link" aria-label="Write a review">
            <span className="nav-icon"><FaPen /></span>
            <span className="nav-text">Write a Review</span>
          </Link>
          <div className="dropdown">
            <button 
              className="dropdown-toggle" 
              onClick={toggleBusinessMenu}
              onMouseEnter={() => setIsBusinessOpen(true)}
              onMouseLeave={() => setIsBusinessOpen(false)}
              aria-label="Business menu"
            >
              <span className="nav-icon"><FaBuilding /></span>
              <span className="nav-text">Business</span>
              <span className="dropdown-arrow">
                {isBusinessOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div 
              className={`dropdown-menu ${isBusinessOpen ? 'show' : ''}`}
              onMouseEnter={() => setIsBusinessOpen(true)}
              onMouseLeave={() => setIsBusinessOpen(false)}
            >
              <Link to="/business-login" className="dropdown-item" aria-label="Business login">
                Business Login
              </Link>
              <Link to="/business-register" className="dropdown-item" aria-label="Register business">
                Register Business
              </Link>
              <Link to="/business-listings" className="dropdown-item" aria-label="Business listings">
                Business Listings
              </Link>
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/login" className="login-button">
            <span className="btn-icon"><FaUser /></span>
            <span className="btn-text">Login</span>
          </Link>
          <Link to="/register" className="register-button">
            <span className="btn-text">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;