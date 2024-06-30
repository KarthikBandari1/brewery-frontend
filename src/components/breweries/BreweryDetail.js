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

  if (!brewery) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div id="brewery-detail">
        <h2 className="brewery-name">{brewery.name}</h2>
        <div className='det-cont'> 
        <div className='left-cont'> 
          {brewery.address_1 && <p className="brewery-info"><FaLocationDot id='icon-prop'/> {brewery.address_1}</p> }
          {brewery.phone && <p className="brewery-info"><FaPhoneAlt  id='icon-prop'/> {brewery.phone}</p>}
        </div>
        <div>
          {brewery.website_url &&  <p className="brewery-info"><CiGlobe  id='icon-prop'/> <a href={brewery.website_url}>{brewery.website_url}</a></p>}
          {brewery.brewery_type && <p className="brewery-info"><span>Type :</span> {brewery.brewery_type}</p>}
        </div>
        </div>
        <div className="parent-container">
          <p className="rating">Rating : {rating}</p>
        </div>

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
