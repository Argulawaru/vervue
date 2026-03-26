import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './PageHeader.css';

const PageHeader = ({ title }) => {
  return (
    <div className="page-header">
      <h1 className="app-title">{title}</h1>
      <button className="user-button">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
      </button>
    </div>
  );
};

export default PageHeader;