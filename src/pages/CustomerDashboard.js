import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Chatbot  from './Chatbot';
import Footer from '../components/Footer';
import '../components/Style/CustomerDashboard.css';
import '../components/Style/Home.css';

function CustomerDashboard() {
  return (
    <div className="customer-dashboard">
      <Navbar />
      <Chatbot />
      <div className="universal-container">
        <div className='hero'>
            <h1>ZilBiz</h1>
            <h3>Empower Your Business, Elevate Your Presence! <span>🚀</span></h3>
            <p>
            Welcome to ZilBiz, Mauritius’s premier SME listing and review platform!
            Whether you're a small business owner looking to grow or a customer searching
            for the best local services, we’ve got you covered. ✨
            </p>
        </div>
      </div>

      <section className="dashboard-activities">
            <h2>Recent Activities</h2>
            <p>You haven’t reviewed any business yet.</p>
          </section>

          <section className="dashboard-categories">
            <h2>Categories</h2>
            <div className="dashboard-categories-grid">
              <div className="dashboard-category">Restaurant</div>
              <div className="dashboard-category">Beauty</div>
              <div className="dashboard-category">Clothing</div>
              <div className="dashboard-category">Agriculture</div>
              <div className="dashboard-category">Automotive</div>
              <div className="dashboard-category">Financial</div>
              <div className="dashboard-category">Art</div>
              <div className="dashboard-category">More..</div>
            </div>
          </section>
      
      <Footer />
    </div>
    
  );
}

export default CustomerDashboard;
