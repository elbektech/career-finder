import React, { useEffect, useState } from 'react';
import CareerCard from '../components/CareerCard';

function ResultsPage() {
  const [careers, setCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/careers')
      .then((res) => res.json())
      .then((data) => setCareers(data))
      .catch((err) => console.error("Failed to fetch careers:", err));
  }, []);

  // Filter careers by title or field (case-insensitive)
  const filteredCareers = careers.filter(career =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Career Matches</h2>

      <input
        type="text"
        placeholder="Search by title or field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '0.5rem',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '1rem'
        }}
      />

      {filteredCareers.length === 0 ? (
        <p>No careers found.</p>
      ) : (
        filteredCareers.map((career) => (
          <CareerCard key={career.id} career={career} />
        ))
      )}
    </div>
  );
}

export default ResultsPage;
