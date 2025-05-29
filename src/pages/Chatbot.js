import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../components/Style/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm ZilBiz Assistant. How can I help you today? 😊", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const userMessage = { text: userText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: userText });

      const botReply = response?.data?.response?.trim() || "Sorry, I didn't understand that. Could you please rephrase? 🤔";
      const botMessage = { text: botReply, isUser: false };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        text: "Sorry, I'm having trouble connecting to our assistant. Please try again later. 😔", 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className={`zilbiz-chatbot-container ${isOpen ? 'open' : 'closed'}`}>
      <div className="zilbiz-chat-header" onClick={toggleChat}>
        <h3 className="zilbiz-chat-title">ZilBiz Assistant</h3>
        <button className="zilbiz-toggle-button">
          {isOpen ? '×' : '💬'}
        </button>
      </div>

      {isOpen && (
        <>
          <div className="zilbiz-chat-body">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`zilbiz-message ${msg.isUser ? 'zilbiz-user-message' : 'zilbiz-bot-message'}`}
              >
                {msg.text}
              </div>
            ))}

            {isLoading && (
              <div className="zilbiz-message zilbiz-bot-message">
                <div className="zilbiz-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="zilbiz-input-container">
            <input
              type="text"
              className="zilbiz-chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
              disabled={isLoading}
            />
            <button 
              className="zilbiz-send-button" 
              onClick={handleSendMessage} 
              disabled={isLoading}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
