import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GetVerified4.css';
import Footer from '../../components/Footer';
import logo from '../../logo.png';

const GetVerified4 = () => {
  const navigate = useNavigate();

  return (
    <div className="get-verified-container">
      <header className="get-verified-header">
        <nav className="get-verified-nav">
          <Link to="/" className="get-verified-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <Link to="/profile" className="get-verified-profile-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </nav>
      </header>

      <main className="get-verified-main">
        <div className="get-verified-content">
          <div className="success-container">
            <h1 className="success-title">
              Done!! 🎉🎊
            </h1>
            <p className="success-message">
              Congratulations, your business is now being reviewed.
            </p>
          </div>
        </div>
        <div className="button-container">
          <button 
            onClick={() => navigate('/verified-business', { replace: true })}
            className="back-home-button"
          >
            Explore New
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetVerified4;
