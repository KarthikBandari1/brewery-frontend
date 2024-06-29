import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewsList from '../reviews/ReviewList';
import ReviewForm from '../reviews/ReviewForm';
import { FaLocationDot } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";

import './breweries.css'; 

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [rating, setRating]=useState('');

  const handleReviewAdded = () => {
    setBrewery({ ...brewery });
    setRefreshReviews(prev => !prev); 
  };

  useEffect(() => {
    const fetchBreweryDetails = async () => {
      try {
        const breweryData = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        const data = await breweryData.json();
        setBrewery(data);
      } catch (error) {
        console.log('Error fetching brewery details');
      }
    };
    fetchBreweryDetails();
  }, [id]);

  if (!brewery) return <p>Loading...</p>;

  return (
    <div id="brewery-detail">
      
        <h2 className="brewery-name">{brewery.name}</h2>
        <div className='det-cont'> 
        <div className='left-cont'> 
          <p className="brewery-info"><span><FaLocationDot id='icon-prop'/></span> {brewery.address_1}</p>
          <p className="brewery-info"><span><FaPhoneAlt  id='icon-prop'/></span> {brewery.phone}</p></div>
        <div>
          <p className="brewery-info"><span><CiGlobe  id='icon-prop'/></span> <a href={brewery.website_url}>{brewery.website_url}</a></p>
          <p className="brewery-info"><span>Type:</span> {brewery.brewery_type}</p>
        </div>
        </div>

        <p className="rating">Rating: {rating}</p>
      
      
      <div className="review-form">
        <ReviewForm breweryId={id} onReviewAdded={handleReviewAdded} />
      </div>
      <div className="reviews-list">
        <ReviewsList brewery={brewery} refreshReviews={refreshReviews} setRating={setRating} />
      </div>
    </div>
  );
};

export default BreweryDetail;
