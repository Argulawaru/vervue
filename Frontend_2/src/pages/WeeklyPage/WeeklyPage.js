import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarDay, faTshirt } from '@fortawesome/free-solid-svg-icons';
import './WeeklyPage.css';

const WeeklyPage = () => {
  const sampleOutfits = [
    ['Black Crew Neck T-Shirt', 'Olive Green Chinos'],
    ['Light Grey Henley', 'Black Joggers'],
    ['Navy Blue Mandarin Shirt', 'Khaki Trousers'],
    ['Sky Blue Polo Shirt', 'White Slim-fit Jeans'],
    ['Beige Hoodie', 'Dark Grey Sweatpants'],
    ['Red Checkered Flannel', 'Dark Blue Denim Jeans'],
    ['White Graphic T-Shirt', 'Black Cargo Pants']
  ];

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayLabel = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      days.push({ day: dayLabel, items: sampleOutfits[i] });
    }
    return days;
  };

  const weeklyOutfits = getNext7Days();
  const gridPositions = [1, 2, 3, 4, 5, 6, 8];

  return (
    <div className="weekly-page">
      <PageHeader title="Vervue" />

      <div className="outfits-container">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faCalendar} className="section-icon" />
          Weekly Outfit Suggestions
        </h2>

        <div className="outfits-grid">
          {weeklyOutfits.map((outfit, index) => (
            <div
              key={index}
              className={`outfit-card grid-pos-${gridPositions[index]}`}
            >
              <h3 className="outfit-day">
                <FontAwesomeIcon icon={faCalendarDay} className="day-icon" />
                {outfit.day}
              </h3>
              <div className="outfit-items">
                {outfit.items.map((item, i) => (
                  <div key={i} className="outfit-item">
                    <FontAwesomeIcon icon={faTshirt} className="item-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="empty-card grid-pos-7" />
          <div className="empty-card grid-pos-9" />
        </div>
      </div>
    </div>
  );
};

export default WeeklyPage;
