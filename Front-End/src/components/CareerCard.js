import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveFavorite, removeFavorite, isFavorite } from '../utils/localStorageHelpers';

const CareerCard = ({ career }) => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(career.id));
  }, [career.id]);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(career.id);
    } else {
      saveFavorite(career);
    }
    setFavorited(!favorited);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '1rem',
      margin: '1rem 0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{career.title}</h3>
      <p><strong>Field:</strong> {career.field}</p>
      <p><strong>Education:</strong> {career.education}</p>
      <p><strong>Median Salary:</strong> ${career.median_salary.toLocaleString()}</p>
      <p><strong>Growth Rate:</strong> {career.growth_rate}</p>
      <Link to={`/career/${career.id}`}>View Details</Link>
      <button onClick={toggleFavorite} style={{ marginLeft: '1rem' }}>
        {favorited ? '★ Unfavorite' : '☆ Save'}
      </button>
    </div>
  );
};

export default CareerCard;
