import React from 'react';
import './TrendCard.css';

const TrendCard = ({ trend }) => {
  const trendImages = {
    'Aesthetic': '/assets/aesthetic.png',
    'Casual': '/assets/casual.png',
    'Streetstyle': '/assets/streetstyle.png',
    'Formal': '/assets/formal.png'
  };

  return (
    <div className="trend-card">
      <div className="trend-image-container">
        <img 
          src={trendImages[trend.name]} 
          alt={trend.name}
          className="trend-image"
        />
      </div>
      <p className="trend-title">{trend.name}</p>
      <p className="trend-description">{trend.description}</p>
    </div>
  );
};

export default TrendCard;