import React from 'react';
import './Heatmap.css'; 

const Heatmap = ({ details }) => {
  if (!details) {
    return <p>No stock details available.</p>;
  }

  const { price, lastUpdatedAt } = details;

  return (
    <div className="heatmap-card">
      <h3>Stock Heatmap</h3>
      <p><strong>Price:</strong> {price}</p>
      <p><strong>Last Updated At:</strong> {new Date(lastUpdatedAt).toLocaleString()}</p>
    </div>
  );
};

export default Heatmap;
