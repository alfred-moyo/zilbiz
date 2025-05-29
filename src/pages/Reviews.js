import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaSearch, FaChevronLeft, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import { MAP_API_KEY, MAP_DEFAULT_OPTIONS } from '../config/googleMaps';
import Navbar from '../components/Navbar'
import '../components/Style/Reviews.css';

function WriteReview() {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [formData, setFormData] = useState({
    rating: 0,
    reviewText: '',
    photos: []
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  // Initialize Google Maps
  useEffect(() => {
    if (window.google && step === 1 && mapRef.current && !map) {
      try {
        setIsLoading(true);
        const newMap = new window.google.maps.Map(mapRef.current, {
          ...MAP_DEFAULT_OPTIONS,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });
        setMap(newMap);
        
        const input = document.getElementById('business-search');
        const searchBox = new window.google.maps.places.SearchBox(input);
        
        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();
          if (places.length === 0) return;
          
          const results = places.map(place => ({
            id: place.place_id,
            name: place.name,
            type: place.types[0] || 'Business',
            address: place.formatted_address,
            location: place.geometry.location,
            icon: place.icon
          }));
          
          setSearchResults(results);
          displayMarkers(newMap, results);
        });

        setIsLoading(false);
      } catch (err) {
        setError('Failed to load maps. Please try again later.');
        setIsLoading(false);
        console.error('Google Maps error:', err);
      }
    }
  }, [step]);

  const displayMarkers = (map, businesses) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = businesses.map(business => {
      return new window.google.maps.Marker({
        position: business.location,
        map: map,
        title: business.name,
        icon: {
          url: business.icon || 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png',
          scaledSize: new window.google.maps.Size(30, 30)
        }
      });
    });
    
    setMarkers(newMarkers);
    
    // Fit map to markers
    if (businesses.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      businesses.forEach(business => bounds.extend(business.location));
      map.fitBounds(bounds);
      
      // Set a minimum zoom level
      if (map.getZoom() > 15) map.setZoom(15);
    }
  };

  const handleBusinessSelect = (business) => {
    setSelectedBusiness(business);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - photoPreviews.length);
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...previews]);
    setFormData({
      ...formData,
      photos: [...formData.photos, ...files]
    });
  };

  const removePhoto = (index) => {
    const newPreviews = [...photoPreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPhotoPreviews(newPreviews);
    
    const newPhotos = [...formData.photos];
    newPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: newPhotos
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    try {
      const reviewData = {
        business: selectedBusiness,
        ...formData,
        date: new Date().toISOString()
      };
      
      // Here you would typically make an API call to submit the review
      console.log('Review Submitted:', reviewData);
      
      alert(`Thank you for reviewing ${selectedBusiness.name}!`);
      navigate('/');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="WriteReview">
      <Navbar />
      <div className="review-container">
        {step === 1 ? (
          <>
            <h2>Find a Business to Review</h2>
            {error && <p className="error-message">{error}</p>}
            
            <div className="search-container">
              <div className="search-group">
                <input
                  id="business-search"
                  type="text"
                  placeholder="Search for a business..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setError(null);
                  }}
                  required
                  aria-label="Search for businesses"
                />
                <button type="button" className="search-btn" aria-label="Search">
                  <FaSearch />
                </button>
              </div>
              
              {isLoading ? (
                <div className="map-loading">Loading map...</div>
              ) : (
                <div className="map-container" ref={mapRef} aria-label="Business locations map">
                  {!window.google && (
                    <div className="map-fallback">
                      <p>Map loading failed. Please ensure you have internet connection.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((business) => (
                  <div 
                    key={business.id} 
                    className="business-card"
                    onClick={() => handleBusinessSelect(business)}
                    aria-label={`Select ${business.name} for review`}
                    tabIndex="0"
                    onKeyPress={(e) => e.key === 'Enter' && handleBusinessSelect(business)}
                  >
                    <h3>{business.name}</h3>
                    <p className="business-type">{business.type.replace(/_/g, ' ')}</p>
                    <p className="business-address">
                      <FaMapMarkerAlt /> {business.address}
                    </p>
                  </div>
                ))
              ) : searchQuery && !isLoading ? (
                <p className="no-results">No businesses found. Try a different search.</p>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="review-header">
              <button 
                className="back-button"
                onClick={() => {
                  setStep(1);
                  setSelectedBusiness(null);
                  setError(null);
                }}
                aria-label="Back to business search"
              >
                <FaChevronLeft /> Back
              </button>
              <h2>Review {selectedBusiness.name}</h2>
              <p className="business-address">
                <FaMapMarkerAlt /> {selectedBusiness.address}
              </p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <form className="review-form" onSubmit={handleSubmit}>
              <div className="rating-section">
                <p>Your Rating:</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({...formData, rating: star})}
                      role="button"
                      aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                      tabIndex="0"
                      onKeyPress={(e) => e.key === 'Enter' && setFormData({...formData, rating: star})}
                    >
                      {(hoverRating || formData.rating) >= star ? (
                        <FaStar className="star filled" />
                      ) : (
                        <FaRegStar className="star" />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="reviewText"
                  placeholder="Share your experience... (What did you like or dislike?)"
                  value={formData.reviewText}
                  onChange={(e) => setFormData({...formData, reviewText: e.target.value})}
                  required
                  aria-label="Review text"
                />
              </div>

              <div className="review-photo-upload">
                <label htmlFor="photo-upload" className="upload-btn">
                  <FaCamera /> Add Photos ({photoPreviews.length}/5)
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                    disabled={photoPreviews.length >= 5}
                  />
                </label>
                <p className="photo-note">Upload up to 5 photos (optional)</p>
                
                <div className="photo-previews">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="photo-preview">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button" 
                        className="remove-photo"
                        onClick={() => removePhoto(index)}
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-btn" aria-label="Submit review">
                Post Review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default WriteReview;