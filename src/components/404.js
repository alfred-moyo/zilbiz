import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import './Style/404.css';

function NotFound() {
  return (
    <div className="NotFound">
      <img src={logo} className="NotFound-logo" alt="ZilBiz Logo" />
      <div className="container">
        <h1>404 - Page Not Found</h1>
        <p className="message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="suggestions">
          <p>Here are some helpful links instead:</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/write-a-review">Write a Review</Link></li>
            <li><Link to="/business">Business Listings</Link></li>
          </ul>
        </div>
        <Link to="/" className="home-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;