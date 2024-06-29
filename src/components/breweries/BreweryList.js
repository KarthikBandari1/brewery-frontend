import React from 'react';
import { Link } from 'react-router-dom';
import './breweries.css'
import { FaLocationDot } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";

const BreweryList = ({ breweries }) => {
  console.log('Breweries:', breweries); 

  const isBreweriesArray = Array.isArray(breweries);

  return (
    <div className='list-cont'>
      <h2>Brewery List</h2>
      {isBreweriesArray && breweries.length !== 0 && (
        <ul>
          {breweries.map((brewery) => (
            <li className='list-item' key={brewery.id}>
              <Link to={`/brewery/${brewery.id}`}>
              <div className='list-item-cont'>
                <div className='brew-div'> 
                  <p className='brew-name'> {brewery.name}</p>
                  <p>({brewery.brewery_type})</p>
                </div>
                  <p><FaLocationDot id='icon-prop'/>{brewery.address_1}</p>
                  <p><FaPhoneAlt  id='icon-prop'/>{brewery.phone}</p>
                 {brewery.website_url && <a href={brewery.website_url} alt="website url"><CiGlobe id='icon-prop'/>{brewery.website_url}</a>}
                
              </div></Link>
            </li>
          ))}
        </ul>
      ) 
      }
    </div>
  );
};

export default BreweryList;
