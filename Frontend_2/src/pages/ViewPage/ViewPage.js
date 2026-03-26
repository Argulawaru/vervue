import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import './ViewPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewPage = () => {
  const navigate = useNavigate();
  const [wardrobeItems, setWardrobeItems] = React.useState(
    JSON.parse(localStorage.getItem('wardrobe')) || []
  );

  // Fill remaining slots with empty placeholders up to 20 items
  const combinedItems = Array.from({ length: 45 }, (_, i) =>
    wardrobeItems[i] || { id: `empty-${i}`, isEmpty: true }
  );

  const handleDelete = (id) => {
    const updatedItems = wardrobeItems.filter(item => item.id !== id);
    setWardrobeItems(updatedItems);
    localStorage.setItem('wardrobe', JSON.stringify(updatedItems));
  };

  return (
    <div className="view-page">
      <PageHeader title="Vervue" />
      <div className="wardrobe-container">
        <h2>Your Wardrobe</h2>
        <div className="wardrobe-grid">
          {combinedItems.map((item, index) => (
            <div
              key={item.id}
              className={`wardrobe-item ${item.isEmpty ? 'empty' : ''}`}
              onClick={() => !item.isEmpty && navigate('/tryon')}
            >
              {!item.isEmpty ? (
                <>
                  <img
                    src={item.image}
                    alt="Clothing item"
                    className="item-image"
                  />
                  <div className="item-info">
                    <span>{item.metadata?.typeCode}-{item.metadata?.wearTypeCode}</span>
                    <small>{item.metadata?.color}</small>
                  </div>
                  <div
                    title="Delete this item"
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Delete this item from wardrobe?")) {
                        handleDelete(item.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </>
              ) : (
                <div className="empty-slot">+</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
