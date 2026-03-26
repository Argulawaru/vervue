import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUpload, faSearch, faList, faCalendar } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = ({ currentPage }) => {
  const navItems = [
    { id: 'home', icon: faHome, label: 'Home', path: '/' },
    { id: 'upload', icon: faUpload, label: 'Upload', path: '/upload' },
    { id: 'get', icon: faSearch, label: 'GET', path: '/get' },
    { id: 'view', icon: faList, label: 'View', path: '/view' },
    { id: 'weekly', icon: faCalendar, label: 'Weekly', path: '/weekly' }
  ];

  return (
    <footer className="footer-nav">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`footer-nav-item ${currentPage === item.id ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={item.icon} className="footer-icon" />
          <span className="footer-label">{item.label}</span>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
