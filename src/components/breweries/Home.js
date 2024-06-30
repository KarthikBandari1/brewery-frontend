import React, { useState, useEffect } from 'react';
import BreweryList from './BreweryList';
import { useNavigate } from 'react-router-dom';
import './breweries.css'; 
import { FiLogOut } from "react-icons/fi";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breweries, setBreweries] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('city');
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=10');
        const data = await response.json();
        setBreweries(data);
        setLoading(false); 
      } catch (error) {
        setError('Error fetching breweries');
        setLoading(false); 
      }
    };
    fetchBreweries();
  }, []);

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true)
    const url = `https://api.openbrewerydb.org/v1/breweries`;
    const response = await fetch(url + `?by_${filter}=${searchTerm}&per_page=5`);
    const data = await response.json();
    setLoading(false)
    setBreweries(data);
  };

  return (
    <div className="search-breweries-container">
      <div className="but-cont">    
        <button type="button" className="logout-button" onClick={onLogout}>Log Out <FiLogOut className='logout-icon'/></button>
      </div>
      <form className="search-breweries-form" onSubmit={handleSearch}>
        <div className="search-breweries-filter">
        <h1 className="search-breweries-title">Search By : </h1>
          <select value={filter} onChange={handleFilter} className="search-breweries-select">
            <option value="city">By city</option>
            <option value="name">By name</option>
            <option value="type">By type</option>
          </select>
          <input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="search-breweries-input"
          />
          <button type="submit" className="search-breweries-button">Search</button>
        </div>
      </form>
      {error && <p className="search-breweries-error">{error}</p>}
      {loading && <div className="loader-container"><div className="loader"></div></div>} 
      <div className="brewery-list-container">
        <BreweryList breweries={breweries} />
      </div>
    </div>
  );
};

export default Home;
