import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GetVerified2.css';
import Footer from '../../components/Footer';
import logo from '../../logo.png';


const GetVerified3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    industry: '',
    openingTime: '09:00',
    closingTime: '17:00'
  });

  const categories = [
    'Retail',
    'Services',
    'Food & Beverage',
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Other'
  ];

  const industries = {
    'Retail': ['Fashion', 'Electronics', 'Home & Garden', 'Sports & Leisure', 'Books & Media'],
    'Services': ['Financial', 'Legal', 'Consulting', 'Real Estate', 'Education'],
    'Food & Beverage': ['Restaurant', 'Cafe', 'Bakery', 'Catering', 'Food Truck'],
    'Technology': ['Software', 'Hardware', 'IT Services', 'Telecommunications', 'Digital Media'],
    'Healthcare': ['Medical', 'Dental', 'Pharmacy', 'Wellness', 'Mental Health'],
    'Manufacturing': ['Textiles', 'Electronics', 'Automotive', 'Food Processing', 'Construction'],
    'Other': ['Other']
  };
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
      
      // Reset industry if category changes
      if (name === 'category') {
        newState.industry = '';
      }
      
      return newState;
    });
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
      navigate('/get-verified4', { replace: true });
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
            Business Details
          </h1>
          
          <div className="get-verified-form">
            <form onSubmit={handleSubmit}>
              <div className="get-verified-input-group">
                <label htmlFor="category" className="get-verified-label">
                  Business Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="get-verified-input"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="get-verified-input-group">
                <label htmlFor="industry" className="get-verified-label">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="get-verified-input"
                  disabled={!formData.category}
                >
                  <option value="">Select an industry</option>
                  {formData.category && industries[formData.category].map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="get-verified-time-group">
                <div className="get-verified-input-group">
                  <label htmlFor="openingTime" className="get-verified-label">
                    Opening Time
                  </label>
                  <input
                    id="openingTime"
                    type="time"
                    name="openingTime"
                    value={formData.openingTime}
                    onChange={handleChange}
                    required
                    className="get-verified-input"
                  />
                </div>

                <div className="get-verified-input-group">
                  <label htmlFor="closingTime" className="get-verified-label">
                    Closing Time
                  </label>
                  <input
                    id="closingTime"
                    type="time"
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={handleChange}
                    required
                    className="get-verified-input"
                  />
                </div>
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

export default GetVerified3;