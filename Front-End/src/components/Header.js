import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
    <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
    <Link to="/results">Career Results</Link>
    <Link to="/favorites">Favorites</Link>

  </nav>
);

export default Header;
