import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GetVerified.css';
import Footer from '../../components/Footer';
import logo from '../../logo.png';

const GetVerified = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    registrationNumber: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value.trim()
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.registrationNumber) {
      newErrors.registrationNumber = 'Registration number is required';
    } else if (!/^[A-Z0-9-]{5,}$/i.test(formData.registrationNumber)) {
      newErrors.registrationNumber = 'Invalid registration number format';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      localStorage.setItem('verificationData', JSON.stringify(formData));

      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/get-verified2', { replace: true });
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
          <Link to="/" className="get-verified-home-link">HOME</Link>
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
            Get verified <span className="check">✓</span>
          </h1>
          <p className="get-verified-subtitle">Complete your business verification</p>

          <div className="get-verified-form">
            <form onSubmit={handleSubmit}>
              <div className="get-verified-input-group">
                <label htmlFor="businessName" className="get-verified-label">Business Name</label>
                <input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter your business name"
                  required
                  className="get-verified-input"
                />
              </div>

              <div className="get-verified-input-group">
                <label htmlFor="registrationNumber" className="get-verified-label">Registration Number</label>
                <input
                  id="registrationNumber"
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Enter business registration number"
                  required
                  className="get-verified-input"
                />
              </div>

              <div className="get-verified-input-group">
                <label htmlFor="phoneNumber" className="get-verified-label">Phone Number</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="get-verified-input"
                />
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  className="next-button"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetVerified;
