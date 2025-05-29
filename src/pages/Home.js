import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/Style/Home.css';
import { FaStar, FaSearch, FaStore, FaComments, FaChartLine } from 'react-icons/fa';

function Home() {
  return (
    <div className="Home">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>ZilBiz</h1>
          <h2>Empower Your Business, Elevate Your Presence! <span className="emoji">🚀</span></h2>
          <p>
            Welcome to ZilBiz, Mauritius's premier SME listing and review platform!
            Whether you're a small business owner looking to grow or a customer searching
            for the best local services, we've got you covered.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="primary-button">Register Your Business</Link>
            <Link to="/explore" className="secondary-button">Explore Services</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose ZilBiz?</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon"><FaSearch /></div>
            <h3>Discover Local Businesses</h3>
            <p>Find the best local services and businesses in your area with our powerful search tools.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaStore /></div>
            <h3>Promote Your Business</h3>
            <p>Create a compelling profile and showcase your products or services to potential customers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaComments /></div>
            <h3>Authentic Reviews</h3>
            <p>Read genuine customer experiences and share your own to help others make informed decisions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaChartLine /></div>
            <h3>Business Growth</h3>
            <p>Gain insights and analytics to help your business thrive in the Mauritian market.</p>
          </div>
        </div>
      </div>

      {/* Spotlight Section */}
      <div className="spotlight-section">
        <h2>Community Spotlight</h2>
        <div className="spotlight-posts">
          <div className="post">
            <div className="post-header">
              <div className="avatar">S</div>
              <div className="post-info">
                <h4>Samuel</h4>
                <p className="business-name">J-Claude Resto <span className="rating"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span></p>
              </div>
            </div>
            <p className="post-content">The food is worth the price. I recommend this place anytime anyway.</p>
            <div className="post-footer">
              <span className="post-date">2 days ago</span>
              <span className="post-likes">12 likes</span>
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="avatar">A</div>
              <div className="post-info">
                <h4>Albert</h4>
                <p className="business-name">Ritesh Garage <span className="rating"><FaStar /><FaStar /><FaStar /><FaStar /></span></p>
              </div>
            </div>
            <p className="post-content">Ritesh's garage has the best customer service.</p>
            <div className="post-footer">
              <span className="post-date">1 week ago</span>
              <span className="post-likes">8 likes</span>
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="avatar">J</div>
              <div className="post-info">
                <h4>Jennifer</h4>
                <p className="business-name">Najja Chop <span className="rating"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span></p>
              </div>
            </div>
            <p className="post-content">This is the best high-tech restaurant in Rio-en-Nos. I recommend the place anyway.</p>
            <div className="post-footer">
              <span className="post-date">3 days ago</span>
              <span className="post-likes">15 likes</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Join the ZilBiz Community?</h2>
          <p>Start connecting with local customers and growing your business today!</p>
          <Link to="/register" className="cta-button">Get Started Now</Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;