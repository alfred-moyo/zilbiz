import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/Style/About.css';

function About() {
  return (
    <div className="About">
      <Navbar />
      <div className="about-content-wrapper">
        <div className="about-container">
          <h1>About <span className="futuristic-underline">ZilBiz</span></h1>
          
          <section className="mission-section">
            <h2><span className="section-number">01</span>Our Mission</h2>
            <p>
              At ZilBiz, we're revolutionizing how Mauritians discover and support local businesses. 
              Our platform bridges the gap between small businesses and their communities, creating 
              meaningful connections that drive economic growth.
            </p>
          </section>

          <div className="about-grid">
            <section className="story-section">
              <h2><span className="section-number">02</span>Our Story</h2>
              <p>
              ZilBiz is pioneering simple, affordable data tools for Mauritius' small businesses. 
              We're building smart solutions to help local entrepreneurs compete like corporations - 
              turning numbers into growth opportunities.
              </p>
              <p>
              Still in development but driven by purpose: 
              To make business intelligence accessible to every shop owner, 
              artisan and startup across the island.
              </p>
            </section>

            <section className="values-section">
              <h2><span className="section-number">03</span>Our Values</h2>
              <ul>
                <li className="value-item">
                  <span className="value-icon">→</span>
                  <div>
                    <strong>Community First</strong>
                    <p>We prioritize authentic local connections</p>
                  </div>
                </li>
                <li className="value-item">
                  <span className="value-icon">→</span>
                  <div>
                    <strong>Transparency</strong>
                    <p>Honest reviews from real customers</p>
                  </div>
                </li>
                <li className="value-item">
                  <span className="value-icon">→</span>
                  <div>
                    <strong>Empowerment</strong>
                    <p>Tools for businesses to grow</p>
                  </div>
                </li>
                <li className="value-item">
                  <span className="value-icon">→</span>
                  <div>
                    <strong>Innovation</strong>
                    <p>Constantly improving our platform</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <section className="join-section">
            <h2><span className="section-number">04</span>Join Our Community</h2>
            <div className="cta-buttons">
              <Link to="/business" className="cta-btn business-btn">
                List Your Business
                <span className="arrow">↗</span>
              </Link>
              <Link to="/write-a-review" className="cta-btn review-btn">
                Write a Review
                <span className="arrow">↗</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;