import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import './ShowPage.css';

// Random Accessories Generator
const generateRandomAccessories = () => {
  const accessories = [
    "Classic Watch", "Sport Watch", "Smartwatch", // Watches
    "Leather Belt", "Canvas Belt", // Belts
    "Sneakers", "Dress Shoes", "Boots", "Loafers", // Shoes
    "Silver Chain", "Gold Chain", "Pendant Necklace", // Chains/Necklaces
    "Sunglasses", "Wallet", "Cufflinks", "Tie", "Pocket Square", // Other common men's accessories
    "Baseball Cap", "Beanie", // Hats
    "Backpack", "Messenger Bag", // Bags
    "Bracelet" // Bracelets
  ];
  const count = Math.floor(Math.random() * 3) + 1; // Generate 1 to 3 accessories
  const shuffled = accessories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ShowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { parsedOutfit: initialParsedOutfit, apiResponse } = location.state || {};

  const [parsedOutfit, setParsedOutfit] = useState(initialParsedOutfit);
  const [outfitImages, setOutfitImages] = useState({ top: null, bottom: null });

  // Add random accessories when component mounts
  useEffect(() => {
    if (initialParsedOutfit) {
      setParsedOutfit(prev => ({
        ...prev,
        accessories: generateRandomAccessories()
      }));
    }
  }, [initialParsedOutfit]);

  // Update image paths when parsedOutfit changes
  useEffect(() => {
    const getImagePath = (item, category) => {
      if (!item || !item.id || !item.name) return null;

      // Pad ID with leading zeros to 3 digits (adjust based on your ID length)
      const paddedId = item.id.padStart(3, '0');
      // Clean the name for file path: replace non-alphanumeric/space/hyphen with empty, then spaces with hyphens
      const cleanName = item.name.replace(/[^\w\s-]/gi, '').replace(/\s+/g, '-');

      // Determine folder based on category
      const folder = category === 'Top Wear' ? 'Top' : 'Bottom';

      // Construct the image path
      const imagePath = `/assets/outfits/${folder}/${paddedId}.${cleanName}.jpg`;

      console.log(`Generated image path for ${item.name} (ID: ${item.id}):`, imagePath);
      return imagePath;
    };

    if (parsedOutfit) {
      const topImage = parsedOutfit.top ? getImagePath(parsedOutfit.top, parsedOutfit.top.category) : null;
      const bottomImage = parsedOutfit.bottom ? getImagePath(parsedOutfit.bottom, parsedOutfit.bottom.category) : null;

      setOutfitImages({
        top: topImage,
        bottom: bottomImage
      });
    }
  }, [parsedOutfit]);

  const handleBack = () => {
    navigate('/get');
  };

  // Show loading if no outfit data
  if (!parsedOutfit || (!parsedOutfit.top && !parsedOutfit.bottom)) {
    return (
      <div className="show-page">
        <PageHeader title="Vervue" />
        <div className="outfit-container">
          <h2>Loading your recommended outfit...</h2>
          {apiResponse && (
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
              <h3>Debug Info:</h3>
              <pre>{JSON.stringify(location.state, null, 2)}</pre>
            </div>
          )}
          <button className="back-button" onClick={handleBack} style={{ marginTop: '20px' }}>
            Back to Preferences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="show-page">
      <PageHeader title="Vervue" />

      <div className="outfit-container">
        <h2>Your Recommended Outfit</h2>

        <div className="outfit-details">
          {/* Top */}
          <div className="outfit-item">
            <h3>Top</h3>
            {parsedOutfit.top ? (
              <div>
                <p><strong>Name:</strong> {parsedOutfit.top.name}</p>
                <p><strong>ID:</strong> {parsedOutfit.top.id}</p>
                {outfitImages.top ? (
                  <img
                    src={outfitImages.top}
                    alt={parsedOutfit.top.name}
                    className="outfit-image"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      console.log('Image failed to load:', outfitImages.top);
                      e.target.style.display = 'none';
                      const errorMsg = e.target.nextElementSibling;
                      if (errorMsg) errorMsg.style.display = 'block';
                    }}
                  />
                ) : null}
                <p style={{ display: outfitImages.top ? 'none' : 'block', color: '#666' }}>
                  Image not available: {outfitImages.top}
                </p>
              </div>
            ) : (
              <p>No Top Recommended</p>
            )}
          </div>

          {/* Bottom */}
          <div className="outfit-item">
            <h3>Bottom</h3>
            {parsedOutfit.bottom ? (
              <div>
                <p><strong>Name:</strong> {parsedOutfit.bottom.name}</p>
                <p><strong>ID:</strong> {parsedOutfit.bottom.id}</p>
                {outfitImages.bottom ? (
                  <img
                    src={outfitImages.bottom}
                    alt={parsedOutfit.bottom.name}
                    className="outfit-image"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      console.log('Image failed to load:', outfitImages.bottom);
                      e.target.style.display = 'none';
                      const errorMsg = e.target.nextElementSibling;
                      if (errorMsg) errorMsg.style.display = 'block';
                    }}
                  />
                ) : null}
                <p style={{ display: outfitImages.bottom ? 'none' : 'block', color: '#666' }}>
                  Image not available: {outfitImages.bottom}
                </p>
              </div>
            ) : (
              <p>No Bottom Recommended</p>
            )}
          </div>
        </div>

        {/* Accessories */}
        {parsedOutfit.accessories?.length > 0 && (
          <div className="outfit-item">
            <h3>Recommended Accessories</h3>
            <ul>
              {parsedOutfit.accessories.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* API Response for debugging */}
        {apiResponse && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            <h4>API Response:</h4>
            <p>{apiResponse}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="action-buttons">
          <button className="back-button" onClick={handleBack}>
            Try Different Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;