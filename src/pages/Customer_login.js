import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import ReCAPTCHA from "react-google-recaptcha";
import '../components/Style/Customer_login.css';

function CustomerLogin() {
  const recaptchaRef = useRef();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      console.log('Starting login process...');
      // Get form data
      const email = e.target.email.value.trim();
      const password = e.target.password.value;

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Reset reCAPTCHA before getting new token
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      // Get fresh reCAPTCHA token
      let recaptchaToken;
      try {
        if (!recaptchaRef.current) {
          throw new Error('reCAPTCHA not initialized');
        }
        recaptchaToken = await recaptchaRef.current.executeAsync();
        console.log('Got fresh reCAPTCHA token');

        if (!recaptchaToken) {
          throw new Error('reCAPTCHA verification failed - no token received');
        }
      } catch (recaptchaError) {
        console.error('reCAPTCHA error:', recaptchaError);
        throw new Error('Failed to verify reCAPTCHA. Please refresh the page and try again.');
      }

      // Call login API
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003';
      console.log('Making API request to:', `${API_URL}/api/auth/login/customer`);
      
      try {
        const response = await fetch(`${API_URL}/api/auth/login/customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include', // Important for cookies
          body: JSON.stringify({
            email,
            password,
            recaptchaToken
          })
        });

        if (!response) {
          throw new Error('No response received from server');
        }

        // First try to get the response as JSON
        const contentType = response.headers.get('content-type');
        let result;

        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          const text = await response.text();
          console.error('Unexpected response type:', contentType, 'Response:', text);
          throw new Error('Server returned an invalid response format');
        }

        if (!response.ok) {
          throw new Error(result.message || result.error || 'Login failed. Please check your credentials.');
        }

        // Store role in localStorage
        if (result.role) {
          localStorage.setItem('userRole', result.role);
        }

        // Login successful
        console.log('Login successful:', result);
        
        // Store token in localStorage if needed
        if (result.token) {
          localStorage.setItem('token', result.token);
        }

        // Redirect to dashboard or home
        navigate('/customer-dashboard');

      } catch (fetchError) {
        console.error('Network or parsing error:', fetchError);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        // Check for specific error types
        if (fetchError.message.includes('reCAPTCHA')) {
          throw new Error('Security verification failed. Please refresh the page and try again.');
        } else if (fetchError.message.includes('invalid response format')) {
          throw new Error('Server connection error. Please try again in a few moments.');
        } else {
          throw new Error(fetchError.message || 'Failed to connect to the server. Please check your internet connection.');
        }
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An unexpected error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  return (
    <div className="CustomerLogin">
      <Link to="/">
        <h2 className="logo-title">ZilBiz</h2>
      </Link>
      <div className="customerlogin-container">
        <h2>Welcome back</h2>
        <button className="google-btn">
          <FcGoogle className="google-icon" /> Sign in with Google
        </button>
        <div className="or-divider">
          <span>or</span>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          size="invisible"
        />
        <Link to="/admin" className="admin-user">
          Login as Admin
        </Link>
        <div className="customer-signup-link">
          No account? <Link to="/customer-signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
