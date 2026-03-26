const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const getOutfitRecommendations = async (selections) => {
  try {
    console.log('Making API call to:', `${API_BASE_URL}/api/recommend`);

    const response = await fetch(`${API_BASE_URL}/api/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selections),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);

    // The backend returns { top: {...}, bottom: {...}, accessories: [...] }
    // Return it in the format expected by the frontend
    return {
      parsedOutfit: {
        top: data.top,
        bottom: data.bottom,
        accessories: data.accessories || [],
        topCategory: data.top?.category || 'Top Wear',
        bottomCategory: data.bottom?.category || 'Bottom Wear'
      },
      message: `Recommended: ${data.top?.name || 'No top'} and ${data.bottom?.name || 'No bottom'}`
    };

  } catch (error) {
    console.error('API Service Error:', error);
    throw error;
  }
};