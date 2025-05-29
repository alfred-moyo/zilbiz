import React from 'react';
import '../components/Style/LegalPages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions">
        <Navbar />
        <div className="legal-container">
            <header className="legal-header">
                <h1>Terms and Conditions</h1>
                <p>Last Updated: {new Date().toLocaleDateString()}</p>
            </header>
            
            <main className="legal-content">
                <section>
                <h2>1. Introduction</h2>
                <p>Welcome to our platform. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.</p>
                </section>
                
                <section>
                <h2>2. User Accounts</h2>
                <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                </section>
                
                <section>
                <h2>3. Content Ownership</h2>
                <p>All content on this platform, including text, graphics, logos, and software, is the property of our company or its content suppliers and protected by intellectual property laws.</p>
                </section>
                
                <section>
                <h2>4. Prohibited Activities</h2>
                <p>You agree not to:</p>
                <ul>
                    <li>Use the platform for any illegal purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with the platform's functionality</li>
                    <li>Upload malicious code or content</li>
                </ul>
                </section>
                
                <section>
                <h2>5. Limitation of Liability</h2>
                <p>We shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use the platform.</p>
                </section>
                
                <section>
                <h2>6. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Your continued use of the platform after such changes constitutes acceptance of the new terms.</p>
                </section>
                
                <section>
                <h2>7. Governing Law</h2>
                <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction where our company is registered.</p>
                </section>
                
                <section className="contact-section">
                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, please contact us at contact@zilbil.mu</p>
                </section>
            </main>
        </div>
        <Footer />
    </div>
    
  );
};

export default TermsAndConditions;