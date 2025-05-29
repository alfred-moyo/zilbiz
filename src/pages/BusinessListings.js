import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Style/BusinessListings.css';

function BusinessListings() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // Check if user is logged in and is a customer
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        
        if (!token || userRole !== 'customer') {
          navigate('/customer-login', { 
            state: { 
              message: 'Please login as a customer to view business listings' 
            }
          });
          return;
        }

        const response = await fetch('http://localhost:5003/api/business', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          navigate('/customer-login', { 
            state: { 
              message: 'Please login as a customer to view business listings' 
            }
          });
          return;
        }

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch businesses');
        }
        
        setBusinesses(data.businesses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [navigate]);

  if (loading) {
    return (
      <div className="business-listings">
        <div className="loading">Loading businesses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="business-listings">
        <div className="error">
          {error}
          <div className="login-prompt">
            <Link to="/customer-login" className="business_login-link">
              Login as Customer
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="business-listings">
      <h1>Business Directory</h1>
      <div className="customer-view-note">
        Viewing as Customer
      </div>
      
      {businesses.length === 0 ? (
        <div className="no-businesses">
          <p>No businesses have registered yet.</p>
        </div>
      ) : (
        <div className="business-grid">
          {businesses.map(business => (
            <div key={business._id} className="business-card">
              <h2>{business.name}</h2>
              <p className="business-email">{business.email}</p>
              {business.phone && <p className="business-phone">{business.phone}</p>}
              {business.address && <p className="business-address">{business.address}</p>}
              <div className="business-status">Status: {business.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusinessListings;