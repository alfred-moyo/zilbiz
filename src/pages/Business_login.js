import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import ReCAPTCHA from "react-google-recaptcha";
import '../components/Style/Business_login.css';

function BusinessLogin() {
  const recaptchaRef = useRef();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Verify reCAPTCHA
      if (!recaptchaRef.current) {
        throw new Error('reCAPTCHA not initialized');
      }

      const recaptchaToken = await recaptchaRef.current.executeAsync().catch(err => {
        console.error('reCAPTCHA error:', err);
        throw new Error('reCAPTCHA verification failed');
      });

      const formData = new FormData(e.target);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      // Call login API
      const API_URL = 'http://localhost:5003'; 
      console.log('Attempting login to:', `${API_URL}/api/auth/login/business`);
      
      const response = await fetch(`${API_URL}/api/auth/login/business`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          ...data,
          recaptchaToken
        })
      });

      const result = await response.json().catch(err => {
        console.error('Error parsing response:', err);
        throw new Error('Invalid response from server');
      });

      if (!response.ok) {
        console.error('Server error:', result);
        throw new Error(result.error || result.message || 'Login failed');
      }

      // Login successful
      console.log('Login successful:', result);
      
      // Store token in localStorage if needed
      if (result.data?.token) {
        localStorage.setItem('businessToken', result.data.token);
      }

      // Redirect to dashboard
      navigate('/business-dashboard');

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please try again.');
    } finally {
      setIsSubmitting(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  return (
    <div className="BusinessLogin">
      <Link to="/">
        <h2 className="logo-title">ZilBiz</h2>
      </Link>
      <div className="businesslogin-container">
        <h2>Sign In as Business</h2>
        <p>Welcome back</p>
        <button className="google-btn">
          <FcGoogle className="google-icon" /> Sign in with Google
        </button>
        <div className="or-divider">
          <span>or</span>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <input type="email" name="email" placeholder="Business Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          />
          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="signup-link">
          No account? <Link to="/business-signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default BusinessLogin;