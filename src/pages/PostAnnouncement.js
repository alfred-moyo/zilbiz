import React, { useState } from 'react';
import '../components/Style/BusinessVerified.css';

const PostAnnouncement = ({ onPostAnnouncement }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const announcement = { title, description };
    onPostAnnouncement(announcement);
    alert('Announcement posted successfully!');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="tab-content">
      <h2>Post a New Announcement</h2>
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            placeholder="Enter announcement title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
            placeholder="Describe your announcement"
          />
        </div>

        <button type="submit" className="btn-primary">Post Announcement</button>
      </form>
    </div>
  );
};

export default PostAnnouncement;
