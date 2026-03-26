import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import './UploadPage.css';

const UploadPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [showColorInput, setShowColorInput] = useState(false);
  const [customColor, setCustomColor] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selections, setSelections] = useState({
    type: null,
    wearType: null,
    subtype: null,
    material: null,
    color: null
  });

  const TRANSITION_DELAY = 1000; // delay

  const clothingOptions = {
    type: ["Casual", "Formal"],
    wearType: ["Top Wear", "Bottom Wear"],
    subtype: {
      "Top Wear": ["T-shirt", "Shirt", "Hoodie", "Sweatshirt", "Jacket","Henley","Polo","Flannel","Turtle Neck","Blazer"],
      "Bottom Wear": ["Jeans", "Pants", "Shorts", "Cargo","Trousers","Chinos","Joggers","Sweat Pant"]
    },
    material: ["Cotton", "Woolen", "Silk", "Polyester", "Linen","Mixed","Denim"],
    color: ["Red", "Blue", "Green", "Black", "White", "Yellow", "Orange", "Brown", "Purple", "Grey", "Pink", "Other"]
  };

  const stepTitles = {
    1: "Upload your clothing item",
    2: "What type of clothing is this?",
    3: "Select wear type",
    4: "Choose specific style",
    5: "Select material",
    6: "Choose color"
  };

  useEffect(() => {
    // Reset color input when going back
    if (currentStep !== 6) {
      setShowColorInput(false);
    }
  }, [currentStep]);

  const advanceToNextStep = (nextStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setIsTransitioning(false);
    }, TRANSITION_DELAY);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = (category, value) => {
    setSelections(prev => ({
      ...prev,
      [category]: value
    }));

    if (category === 'color' && value === 'Other') {
      setShowColorInput(true);
      return;
    }

    setShowColorInput(false);

    // Auto-advance with 3-second delay
    if (currentStep < 6) {
      advanceToNextStep(currentStep + 1);
    }
  };

  const handleCustomColorSubmit = () => {
    if (customColor.trim() === '') return;
    setSelections(prev => ({
      ...prev,
      color: customColor
    }));
    setShowColorInput(false);
    // Stay on color step to show selection
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DELAY);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      advanceToNextStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const saveToWardrobe = async () => {
    if (isUploading || isTransitioning) return;
    
    setIsUploading(true);
    
    try {
      const outfitId = `OUTFIT-${Date.now()}`;
      const typeCode = selections.type === "Casual" ? "CAS" : "FOR";
      const wearTypeCode = selections.wearType === "Top Wear" ? "TW" : "BW";

      const outfitData = {
        id: outfitId,
        image: imagePreview,
        metadata: {
          type: selections.type,
          typeCode,
          wearType: selections.wearType,
          wearTypeCode,
          subtype: selections.subtype,
          material: selections.material,
          color: selections.color,
        },
      };

      const existingItems = JSON.parse(localStorage.getItem('wardrobe')) || [];
      localStorage.setItem('wardrobe', JSON.stringify([...existingItems, outfitData]));
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, TRANSITION_DELAY));
      
      navigate('/view');
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const getCurrentCategory = () => {
    const categories = ["type", "wearType", "subtype", "material", "color"];
    return categories[currentStep - 2];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="upload-step">
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              accept="image/*"
              disabled={isTransitioning}
            />
            <label htmlFor="file-input" className="upload-box">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">📤</span>
                  <p>Click to upload image</p>
                </div>
              )}
            </label>
            {imagePreview && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button 
                  className={`next-button ${isTransitioning ? '' : 'active'}`}
                  onClick={() => advanceToNextStep(2)}
                  disabled={isTransitioning}
                  style={{ width: '200px' }}
                >
                  {isTransitioning ? 'Processing...' : 'Upload'}
                </button>
              </div>
            )}
          </div>
        );
      case 2:
      case 3:
      case 5:
        return (
          <div className="options-grid">
            {clothingOptions[getCurrentCategory()].map(item => (
              <button
                key={item}
                className={`option-button ${selections[getCurrentCategory()] === item ? 'selected' : ''}`}
                onClick={() => handleSelect(getCurrentCategory(), item)}
                disabled={isTransitioning}
              >
                {item}
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="options-grid">
            {clothingOptions.subtype[selections.wearType]?.map(item => (
              <button
                key={item}
                className={`option-button ${selections.subtype === item ? 'selected' : ''}`}
                onClick={() => handleSelect('subtype', item)}
                disabled={isTransitioning}
              >
                {item}
              </button>
            ))}
          </div>
        );
      case 6:
        return (
          <>
            <div className="color-grid">
              {clothingOptions.color.map(color => (
                <button
                  key={color}
                  className={`color-option ${selections.color === color ? 'selected' : ''}`}
                  onClick={() => handleSelect('color', color)}
                  style={{ backgroundColor: color !== "Other" ? color.toLowerCase() : "#ccc" }}
                  disabled={isTransitioning}
                >
                  {color === "Other" ? "Other" : ""}
                </button>
              ))}
            </div>
            {showColorInput && (
              <div className="custom-color-container">
                <div className="custom-color-input">
                  <input
                    type="text"
                    placeholder="Enter color name (e.g. Teal, Burgundy)"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="color-text-input"
                    disabled={isTransitioning}
                  />
                  <button 
                    className="color-submit-button"
                    onClick={handleCustomColorSubmit}
                    disabled={!customColor.trim() || isTransitioning}
                  >
                    Submit
                  </button>
                </div>
                <p className="color-hint">Type any color name you'd like</p>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="upload-page">
      <PageHeader title="Vervue" />
      <div className="questionnaire-container">
        <h2>{stepTitles[currentStep]}</h2>
        <p>{currentStep === 1 ? "Upload an image of your clothing item" : "Select the appropriate option"}</p>

        {renderStepContent()}

        {currentStep !== 1 && (
          <div className="navigation-buttons">
            <button 
              className="back-button" 
              onClick={handleBack}
              disabled={isTransitioning}
            >
              {currentStep > 1 ? 'Back' : 'Cancel'}
            </button>
            {currentStep > 1 && !showColorInput && (
              <button
                className={`next-button ${selections[getCurrentCategory()] ? 'active' : ''}`}
                onClick={currentStep === 6 ? saveToWardrobe : handleNext}
                disabled={!selections[getCurrentCategory()] || isUploading || isTransitioning}
              >
                {isUploading ? 'Saving...' : isTransitioning ? 'Processing...' : currentStep === 6 ? 'Save to Wardrobe' : 'Next'}
              </button>
            )}
          </div>
        )}

        <div className="progress-indicator">
          {isTransitioning ? (
            <span>Transitioning to next step...</span>
          ) : (
            <span>Step {currentStep} of 6</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
