import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GetVerified2.css';
import Footer from '../../components/Footer';
import logo from '../../logo.png';


const GetVerified2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    website: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value.trim()
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setIsSubmitting(true);
    
    try {
      // Store the initial verification data
      localStorage.setItem('verificationData', JSON.stringify(formData));
      
      // Here you would typically make an API call to verify the business
      // For now, we'll simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard
      navigate('/get-verified3', { replace: true });
    } catch (error) {
      console.error('Verification error:', error);
      setErrors({
        submit: 'Verification failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="get-verified-container">
      <header className="get-verified-header">
        <div className="get-verified-logo">
          <img src={logo} alt="ZilBiz Logo" />
        </div>
        <nav className="get-verified-nav">
          <Link to="/" className="get-verified-home-link">
            HOME
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
          <h1 className="get-verified-title">
            Almost there...
          </h1>
          
          <div className="get-verified-form">
            <form onSubmit={handleSubmit}>
              <div className="get-verified-input-group">
                <label htmlFor="email" className="get-verified-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="get-verified-input"
                />
              </div>

              <div className="get-verified-input-group">
                <label htmlFor="website" className="get-verified-label">
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Enter your website URL"
                  required
                  className="get-verified-input"
                />
              </div>

              <div className="get-verified-input-group">
                <label htmlFor="address" className="get-verified-label">
                  Business Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your business address"
                  required
                  className="get-verified-input"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="button-container">
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="next-button"
            disabled={isSubmitting}
          >
            Next
          </button>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default GetVerified2;