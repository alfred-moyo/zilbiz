import React, { useState } from 'react';
import './Style/Navbar.css';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);

  const toggleBusinessMenu = () => {
    setIsBusinessOpen(!isBusinessOpen);
  };

  return (
    <div className="Navbar">
      <nav>
        {/* Logo */}
        <Link to="/">
          <h2 className="Nav-title">ZilBiz</h2>
        </Link>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search" aria-label="Search" />
          <div className="nav-search-btn">
            <button aria-label='Search button'>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/write-a-review" aria-label="Write a review">
            Write a review
          </Link>
          <div className="business-dropdown">
            <button 
              className="business-dropdown-btn" 
              onClick={toggleBusinessMenu}
              onMouseEnter={() => setIsBusinessOpen(true)}
              onMouseLeave={() => setIsBusinessOpen(false)}
              aria-label="Business menu"
            >
              Business
              {isBusinessOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isBusinessOpen && (
              <div 
                className="business-dropdown-content"
                onMouseEnter={() => setIsBusinessOpen(true)}
                onMouseLeave={() => setIsBusinessOpen(false)}
              >
                <Link to="/business-login" aria-label="Business login">
                  Business Login
                </Link>
                <Link to="/business-listing" aria-label="Business listing and reviews">
                  Business Listing and Reviews
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Login Button */}
        <div className="navbar-button">
          <Link to="/login">
            <button type="button" aria-label="Login">
              LOGIN
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;