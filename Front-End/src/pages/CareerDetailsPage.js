import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CareerDetailsPage = () => {
  const { id } = useParams(); // get the career ID from the route
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/careers/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Career not found");
        return res.json();
      })
      .then((data) => {
        setCareer(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading career details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!career) return <p>No career found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{career.title}</h2>
      <p><strong>Description:</strong> {career.description}</p>
      <p><strong>Field:</strong> {career.field}</p>
      <p><strong>Education Required:</strong> {career.education}</p>
      <p><strong>Median Salary:</strong> ${career.median_salary.toLocaleString()}</p>
      <p><strong>Growth Rate:</strong> {career.growth_rate}</p>
      <Link to="/results">← Back to Results</Link>
    </div>
  );
};

export default CareerDetailsPage;
