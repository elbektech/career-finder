import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome to the Career Finder</h1>
      <button onClick={() => navigate('/results')}>View Careers</button>
    </div>
  );
};

export default HomePage;
