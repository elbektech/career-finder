import React, { useEffect, useState } from 'react';
import CareerCard from '../components/CareerCard';
import { getFavorites } from '../utils/localStorageHelpers';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Favorite Careers</h2>
      {favorites.length === 0 ? (
        <p>You haven't saved any careers yet.</p>
      ) : (
        favorites.map((career) => (
          <CareerCard key={career.id} career={career} />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
