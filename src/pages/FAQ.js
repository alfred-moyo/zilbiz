import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/Style/FAQ.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is ZilBiz?',
      answer: 'ZilBiz is Mauritius’s premier SME listing and review platform. It helps small business owners grow and customers find the best local services.',
    },
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the "Sign Up" button on the homepage and filling out the required information.',
    },
    {
      question: 'How do I write a review?',
      answer: 'To write a review, log in to your account, search for the business, and click on the "Write a Review" button.',
    },
    {
      question: 'Is ZilBiz free to use?',
      answer: 'Yes, ZilBiz is free for both businesses and customers. However, there may be premium features available for businesses in the future.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact support by visiting the "Contact Us" page or emailing us at support@zilbiz.com.',
    },
  ];

  return (
    <div className="FAQ">
      <Navbar />
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;