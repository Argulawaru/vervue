import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import TrendCard from '../../components/TrendCard/TrendCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const trends = [
    {
      name: 'Aesthetic',
      description: 'Soft pastels and vintage vibes'
    },
    {
      name: 'Casual',
      description: 'Comfy everyday outfits'
    },
    {
      name: 'Streetstyle',
      description: 'Urban and edgy looks'
    },
    {
      name: 'Formal',
      description: 'Elegant office wear'
    }
  ];

  return (
    <div className="home-page">
      <PageHeader title="Vervue" />
      
      <div className="affirmation-section">
        <div className="affirmation-header">
          <FontAwesomeIcon icon="calendar" className="calendar-icon" />
          <h2>Daily Affirmation</h2>
          <span className="date">{formatDate(currentDate)}</span>
        </div>
        <div className="affirmation-content">
          <p>"Your style is a reflection of your unique self. Embrace it!"</p>
        </div>
      </div>

      <div className="trends-section">
        <h2>Trends</h2>
        <div className="trends-grid">
          {trends.map((trend, index) => (
            <TrendCard 
              key={index} 
              trend={trend}
              onClick={() => navigate('/view')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;