import React, { useState } from 'react';
import api from '../../services/api';
import './reviews.css'; 
import Rating from "./Rating";

const ReviewForm = ({ breweryId, onReviewAdded }) => {
  const [rating, setRating] = useState(0); // Initialize with 0
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = {
        rating,
        description
      };
      const response = await api.post(`/reviews/${breweryId}`, newReview);
      if (response) {
        setSuccess('Review added successfully');
        setRating(0); // Reset rating
        setDescription('');
        onReviewAdded();
      } else {
        setError('Failed to add review');
      }
    } catch (error) {
      setError('Error adding review');
    }
  };

  return (
    <div id="review-form-container">
      <h3>Add Review</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className='form-cont'>
        <label>Rating</label>
        <input
          type="number"
          id="inp-num"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          min="0.1"
          max="5"
          step="0.1"
          required
        />
        <Rating rate={rating} setRate={setRating} />

        <label>Description</label>
        <textarea
        id="input-rev"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
