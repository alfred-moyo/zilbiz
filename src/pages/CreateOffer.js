import React, { useState } from 'react';
import '../components/Style/BusinessVerified.css';

const CreateOffer = ({ onCreateOffer }) => {
  const [offerTitle, setOfferTitle] = useState('');
  const [discount, setDiscount] = useState('');
  const [details, setDetails] = useState('');

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    const offer = { offerTitle, discount, details };
    onCreateOffer(offer);
    alert('Offer created successfully!');
    setOfferTitle('');
    setDiscount('');
    setDetails('');
  };

  return (
    <div className="tab-content">
      <h2>Create a New Offer</h2>
      <form className="form-section" onSubmit={handleOfferSubmit}>
        <div className="form-group">
          <label>Offer Title</label>
          <input 
            type="text" 
            value={offerTitle} 
            onChange={(e) => setOfferTitle(e.target.value)} 
            required 
            placeholder="Enter offer title"
          />
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input 
            type="number" 
            value={discount} 
            onChange={(e) => setDiscount(e.target.value)} 
            required 
            placeholder="Enter discount percentage"
          />
        </div>

        <div className="form-group">
          <label>Details</label>
          <textarea 
            value={details} 
            onChange={(e) => setDetails(e.target.value)} 
            required
            placeholder="Provide offer details"
          />
        </div>

        <button type="submit" className="btn-primary">Create Offer</button>
      </form>
    </div>
  );
};

export default CreateOffer;
