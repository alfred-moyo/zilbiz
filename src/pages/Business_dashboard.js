import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../components/Style/businessdashboard.css';
import Footer from '../components/Footer';


const BusinessDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const isAuthenticated = localStorage.getItem('businessToken');
        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            navigate('/business-login');
        }
    }, [navigate]);

    return (
        <div className="landing-page-business">
          <header className="header">
            <div className="logo">ZilBiz</div>
            <nav>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#solutions">Solutions</a></li>
                <li><a href="#resources">Resources</a></li>
              </ul>
              <div className="profile-icon">
                <Link to="/profile">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </div>
            </nav>
          </header>
    
          <main>
            <section className="hero">
              <h1>Power Your Business with <span className="brand">ZilBiz</span></h1>
              <p className="subtitle">The all-in-one platform for modern businesses to grow, connect, and succeed in the digital economy.</p>
              <div className="cta">
                <div className="cta-text">Get Verified Today</div>
                <Link to="/get-verified" className="cta-button">Get Verified</Link>
              </div>
            </section>
    
            <section className="benefits">
              <h2>Why Get <span className="brand">Verified</span> on ZilBiz?</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <h3>Enhanced Trust</h3>
                  <p>Build credibility with customers and partners through our verification process.</p>
                </div>
                <div className="benefit-card">
                  <h3>Priority Visibility</h3>
                  <p>Get featured higher in search results and recommended listings.</p>
                </div>
                <div className="benefit-card">
                  <h3>Business Tools</h3>
                  <p>Access exclusive features for verified businesses.</p>
                </div>
                <div className="benefit-card">
                  <h3>Social Reach</h3>
                  <p>Connect with other partners on our verified network.</p>
                </div>
              </div>
            </section>
    
            <section className="cta-section">
              <h2>Ready to Elevate Your Business?</h2>
              <p>Join other verified businesses growing with ZilBiz.</p>
              <Link to="/get-verified" className="cta-button">Get Verified</Link>
            </section>
          </main>
          <Footer/>
        </div>
      );
};

export default BusinessDashboard;
