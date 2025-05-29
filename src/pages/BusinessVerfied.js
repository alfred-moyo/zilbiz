import React, { useState } from 'react';
import Chatbot from './Chatbot';
import '../components/Style/BusinessVerified.css';
import PostAnnouncement from './PostAnnouncement';
import CreateOffer from './CreateOffer';

const VerifiedDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showVerificationBadge, setShowVerificationBadge] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [offers, setOffers] = useState([]);

  const handleNewAnnouncement = (announcement) => {
    setAnnouncements(prev => [announcement, ...prev]);
  };

  const handleNewOffer = (offer) => {
    setOffers(prev => [offer, ...prev]);
  };

  return (
    <div className="verified-container">
      <Chatbot />
      {showVerificationBadge && (
        <div className="verification-banner">
          <div className="banner-content">
            <span className="verified-icon">✓</span>
            <span>Congratulations! Your business is now verified.</span>
          </div>
          <button className="banner-close" onClick={() => setShowVerificationBadge(false)}>×</button>
        </div>
      )}

      <header className="dashboard-header">
        <div className="header-left">
          <h1>ZilBiz <span>Dashboard</span></h1>
          <div className="verified-status">
            <span className="status-badge">Verified</span>
          </div>
        </div>
        <div className="header-right">
          <button className="btn-notification">
            <span className="notification-icon">🔔</span>
            <span className="notification-count">{announcements.length + offers.length}</span>
          </button>
          <div className="user-profile">
            <div className="profile-avatar">AB</div>
            <span className="profile-name">Verified Business</span>
          </div>
        </div>
      </header>

      <div className="dashboard-main">
        <nav className="dashboard-sidebar">
          <ul className="nav-menu">
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
            <li className={activeTab === 'post' ? 'active' : ''} onClick={() => setActiveTab('post')}>📢 Post Announcement</li>
            <li className={activeTab === 'offer' ? 'active' : ''} onClick={() => setActiveTab('offer')}>📝 Create Offer</li>
          </ul>
        </nav>

        <div className="dashboard-content">
          {activeTab === 'dashboard' && (
            <div className="tab-content">
              <h2>Recent Activity</h2>
              <div className="activity-section">
                {announcements.map((ann, index) => (
                  <div className="activity-item" key={index}>
                    <div className="activity-icon">📢</div>
                    <div className="activity-text">
                      <p>{ann.title}: {ann.description}</p>
                      <small>Just now</small>
                    </div>
                  </div>
                ))}
                {offers.map((off, index) => (
                  <div className="activity-item" key={index}>
                    <div className="activity-icon">🎁</div>
                    <div className="activity-text">
                      <p>{off.offerTitle}: {off.discount}% off - {off.details}</p>
                      <small>Just now</small>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && offers.length === 0 && (
                  <p>No activity yet. Post an announcement or create an offer!</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'post' && (
            <PostAnnouncement onPostAnnouncement={handleNewAnnouncement} />
          )}

          {activeTab === 'offer' && (
            <CreateOffer onCreateOffer={handleNewOffer} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifiedDashboard;
