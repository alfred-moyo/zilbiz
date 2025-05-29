import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import '../components/Style/Contact.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const recaptchaRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await recaptchaRef.current.executeAsync();
      console.log('reCAPTCHA token:', token);

      // TODO: Send token & form data to backend for validation and processing

      alert('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' }); // Clear form
      recaptchaRef.current.reset(); // Reset reCAPTCHA

    } catch (error) {
      console.error('reCAPTCHA error:', error);
      alert("Failed to verify reCAPTCHA. Please try again.");
    }
  };

  return (
    <div className="ContactUs">
      <Navbar />
      <div className="ContactUs-container">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? We'd love to hear from you!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LEO3QwrAAAAAPArPyxgnqdvZHj-AtSWs-eQKMjj4"
            size="invisible"
          />
          <div className='contact-button'>
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
