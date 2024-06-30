import React from "react";
import { FaStar } from "react-icons/fa";
import './reviews.css';

const Rating = ({ rate, setRate }) => {
  const handleStarClick = (givenRating) => {
    setRate(givenRating);
  };

  return (
    <div className="rating-container">
      {[...Array(5)].map((_, index) => {
        const givenRating = index + 1;
        const isPartial = rate > index && rate < givenRating;
        return (
          <label key={index} className="rating-label">
            <input
              className="inp-rad"
              type="radio"
              value={givenRating}
              checked={rate >= givenRating}
              onChange={() => handleStarClick(givenRating)}
            />
            <div className="star-wrapper">
              <FaStar
                className="empty-star"
                style={{ fontSize: '40px', color: 'gray' }}
              />
              <div
                className="filled-star-wrapper"
                style={{
                  width: isPartial ? `${(rate - index) * 100}%` : rate >= givenRating ? '100%' : '0%',
                  overflow: 'hidden',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                }}
              >
                <FaStar
                  className="filled-star"
                  style={{
                    fontSize: '40px',
                    color: 'rgb(221, 196, 55)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
