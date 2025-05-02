import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import CareerDetailsPage from './pages/CareerDetailsPage';
import Header from './components/Header';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/career/:id" element={<CareerDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />

      </Routes>
    </Router>
  );
}

export default App;
