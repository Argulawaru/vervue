import React from 'react';
import './NavButton.css';

const NavButton = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`nav-button ${active ? 'active' : ''}`}
    >
      <div className="nav-icon-container">
        <div className={`nav-icon-circle ${active ? 'active' : ''}`}>
          {icon}
        </div>
      </div>
      <span className={`nav-label ${active ? 'active' : ''}`}>{label}</span>
    </button>
  );
};

export default NavButton;