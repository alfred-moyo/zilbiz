import React, { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import '../components/Style/Customer_signup.css';

function CustomerSignup() {
  const recaptchaRef = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [recaptchaError, setRecaptchaError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Initialize reCAPTCHA when component mounts
  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        if (recaptchaRef.current) {
          await recaptchaRef.current.reset();
          setRecaptchaError('');
        }
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
        setRecaptchaError('Error loading reCAPTCHA. Please refresh the page.');
      }
    };
    loadRecaptcha();
    // Cleanup on unmount
    return () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        server: ''
      }));
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Execute reCAPTCHA with proper error handling
      let recaptchaToken;
      try {
        recaptchaToken = await recaptchaRef.current.executeAsync();
        if (!recaptchaToken) {
          throw new Error('reCAPTCHA verification failed');
        }
      } catch (error) {
        console.error('reCAPTCHA error:', error);
        setErrors({
          server: 'reCAPTCHA verification failed. Please try again.'
        });
        setIsLoading(false);
        return;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003';
      const response = await fetch(`${API_URL}/api/auth/register/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        })
      }).catch(error => {
        console.error('Network error:', error);
        throw new Error('Network connection failed. Please check your internet connection.');
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('JSON parsing error:', error);
        throw new Error('Invalid response from server. Please try again later.');
      }

      if (response.ok) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setFormData({ name: '', email: '', password: '' });
        
        // Store user role in localStorage
        localStorage.setItem('userRole', 'customer');
        
        setTimeout(() => {
          navigate('/customer-login');
        }, 2000);
      } else {
        switch (response.status) {
          case 400:
            setErrors({ server: data.message || 'Please check your input' });
            break;
          case 409:
            setErrors({ email: 'Email already registered' });
            break;
          default:
            setErrors({ server: data.message || 'Registration failed' });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        server: 'Unable to connect to the server. Please try again later.'
      });
    } finally {
      setIsLoading(false);
      // Reset reCAPTCHA after submission
      try {
        await recaptchaRef.current.reset();
      } catch (error) {
        console.error('Error resetting reCAPTCHA:', error);
      }
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && !isLoading;

  return (
    <div className="CustomerSignup">
      <Link to="/">
        <h2 className="logo-title">ZilBiz</h2>
      </Link>
      <div className="customersignup-container">
        <h2>Sign up to get started.</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {errors.server && <div className="error-message">{errors.server}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          {recaptchaError && <div className="error-message">{recaptchaError}</div>}

          <button className="google-btn" disabled={isLoading}>
            <FcGoogle /> Sign up with Google
          </button>

          <div className="or-divider"><span>or</span></div>

          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              disabled={isLoading}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              disabled={isLoading}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              disabled={isLoading}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          theme="light"
          onErrored={() => setRecaptchaError('reCAPTCHA error occurred. Please try again.')}
        />

        <p className="login-prompt">
          Already have an account? <Link to="/customer-login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default CustomerSignup;
