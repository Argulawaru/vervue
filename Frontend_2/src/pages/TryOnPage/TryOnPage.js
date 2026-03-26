import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import './TryOnPage.css';

const TryOnPage = ({ onNavigate }) => {
  const navigate = useNavigate();

  return (
    <div className="try-on-page">
      <PageHeader title="Vervue" />
      
      <div className="virtual-try-on-container">
        <h2>Virtual Try On</h2>
        
        <div className="try-on-view">
          {/* This would contain your virtual try-on component */}
          <p>Virtual try-on feature will appear here</p>
        </div>
        
        <div className="action-buttons">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <button 
            className="save-outfit-button"
            onClick={() => alert('Outfit saved!')}
          >
            Save Outfit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;