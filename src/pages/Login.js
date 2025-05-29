import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Style/Login.css';

function Login() {
  return (
    <div className="login-choice-container">
      <h2>Choose Login Type</h2>
      <div className="login-options">
        <Link to="/customer-login" className="login-option">
          <button>Customer Login</button>
        </Link>
        <Link to="/business-login" className="login-option">
          <button>Business Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
