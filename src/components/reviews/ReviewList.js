import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './reviews.css'; 

const ReviewsList = ({ brewery, refreshReviews, setRating }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); 
      try {
        const response = await api.get(`/reviews/${brewery.id}`);
        setReviews(response);
        setLoading(false); 
  
        if (response.length > 0) {
          const totalRating = response.reduce((acc, curr) => acc + curr.rating, 0);
          const averageRating = totalRating / response.length;
          const roundedRating = parseFloat(averageRating.toFixed(1));
  
          setRating(roundedRating);
        } else {
          setRating('-');
        }
      } catch (error) {
        setError('Error fetching reviews');
        setLoading(false); 
      }
    };
    fetchReviews();
  }, [brewery.id, refreshReviews, setRating]);

  return (
    <div className="reviews-container">
      <h3 className="reviews-header">Reviews</h3>
      {loading ? (
        <div className="loading-message">Loading reviews...</div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul>
          {reviews.length === 0 ? (
            <p className="no-reviews-message">No reviews available</p>
          ) : (
            reviews.map((review) => (
              <li className="review-item" key={review.id}>
                <p className="review-item-rating"><span>Rating:</span> {review.rating}</p>
                <p className="review-item-description">{review.description}</p>
                <p className="review-item-username"><span>Reviewed by:</span> {review.userName}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ReviewsList;
