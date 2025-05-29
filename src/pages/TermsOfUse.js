import React from 'react';
import '../components/Style/LegalPages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfUse = () => {
  return (
    <div className="terms-of-use">
        <Navbar />
        <div className="legal-container">
            <header className="legal-header">
                <h1>Terms of Use</h1>
                <p>Last Updated: {new Date().toLocaleDateString()}</p>
            </header>
            
            <main className="legal-content">
                <section>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree, you must not use our services.</p>
                </section>
                
                <section>
                <h2>2. Service Description</h2>
                <p>Our platform provides businesses and customer a place to interact powered by AI. We reserve the right to modify or discontinue any aspect of the service at any time.</p>
                </section>
                
                <section>
                <h2>3. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul>
                    <li>Provide accurate information when creating an account</li>
                    <li>Use the service only for lawful purposes</li>
                    <li>Not attempt to disrupt the service's operation</li>
                    <li>Comply with all applicable laws and regulations</li>
                </ul>
                </section>
                
                <section>
                <h2>4. Intellectual Property</h2>
                <p>The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
                </section>
                
                <section>
                <h2>5. Privacy</h2>
                <p>Your use of the service is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.</p>
                </section>
                
                <section>
                <h2>6. Termination</h2>
                <p>We may terminate or suspend your access to the service immediately, without prior notice, for any reason, including if you breach these Terms of Use.</p>
                </section>
                
                <section>
                <h2>7. Disclaimer of Warranties</h2>
                <p>The service is provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
                </section>
                
                <section className="contact-section">
                <h2>Contact Information</h2>
                <p>For any questions regarding these Terms of Use, please contact us at contact@zilbiz.mu</p>
                </section>
            </main>
        </div>
        <Footer />
    </div>
    
  );
};

export default TermsOfUse;