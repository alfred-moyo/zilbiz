import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import ReCAPTCHA from "react-google-recaptcha";
import '../components/Style/Business_signup.css';

function BusinessSignup() {
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.get('name')?.trim()) {
      errors.name = 'Business name is required';
    } else if (formData.get('name').length < 3) {
      errors.name = 'Business name must be at least 3 characters';
    }
    
    if (!formData.get('email')?.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.get('email'))) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.get('password')) {
      errors.password = 'Password is required';
    } else if (formData.get('password').length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.target);
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        const recaptchaToken = await recaptchaRef.current.executeAsync();

        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          phone: formData.get('phone') || '',
          address: formData.get('address') || ''
        };

        // Make API call to register
        const API_URL = 'http://localhost:5003';
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout to 10 seconds

        console.log('Sending registration request with data:', data);
        
        try {
          const response = await fetch(`${API_URL}/api/auth/register/business`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
            signal: controller.signal,
            body: JSON.stringify({
              ...data,
              recaptchaToken
            })
          });

          clearTimeout(timeoutId);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', response.status, errorText);
            throw new Error(errorText || `HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          console.log('Registration successful:', result);

          if (!response.ok) {
            throw new Error(result.message || 'Registration failed');
          }

          // Store token in localStorage if needed
          if (result.data?.token) {
            localStorage.setItem('token', result.data.token);
          }

          // Redirect to login page
          navigate('/business-login');
        } catch (error) {
          console.error('Registration error:', error);
          if (error.name === 'AbortError') {
            setError('Request timed out. Please check if the server is running and try again.');
          } else {
            setError(error.message || 'Registration failed. Please try again.');
          }
        }
      } catch (error) {
        console.error('ReCAPTCHA error:', error);
        setError('ReCAPTCHA failed. Please try again.');
      }
    }
    setIsSubmitting(false);
    recaptchaRef.current.reset();
  };
  console.log('Loaded sitekey:', process.env.REACT_APP_RECAPTCHA_SITE_KEY);
  
  return (
    <div className="BusinessSignup">
      <Link to="/">
        <h2 className="logo-title">ZilBiz</h2>
      </Link>
      <div className="businesssignup-container">
        <h2>Welcome! Sign up to get started.</h2>
        {/* <button type="button" className="google-btn">
          <FcGoogle className="google-icon" /> Sign up with Google
        </button>
        <div className="or-divider">
          <span>or</span>
        </div> */}
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Business Name"
              required
              className={formErrors.name ? 'error' : ''}
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          size="invisible"
        />
        <div className="login-link">
          Have an account? <Link to="/business-login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default BusinessSignup;