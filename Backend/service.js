import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize environment variables
dotenv.config();

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Groq API configuration
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions ';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'mixtral-8x7b-32768';

// Load outfits data from Outfits.txt
let OUTFITS_DATA;
try {
  OUTFITS_DATA = fs.readFileSync(
    path.join(__dirname, 'Outfits.txt'),
    'utf-8'
  );
} catch (err) {
  console.error("Failed to read Outfits.txt:", err);
  throw new Error("Outfit dataset not available");
}

const buildPrompt = (selections) => {
  const userPreferences = `User preferences:
- Aesthetic: ${selections.aesthetics.join(', ')}
- Material: ${selections.materials.join(', ')}
- Fit: ${selections.fits.join(', ')}
- Occasion: ${selections.occasions.join(', ')}
- Wear Type: ${selections.wearTypes.join(', ')}
- Weather: ${selections.weather.join(', ')}
- Time of Day: ${selections.timeOfDay.join(', ')}
- Color Style: ${selections.colorStyles.join(', ')}`;

  return `
You are a precise outfit recommendation engine.

Based on the user preferences below, recommend **one matching Top Wear and one Bottom Wear** from the provided outfit dataset.

Outfit Dataset Format: ID.Name.jpg,Category,Type,Material,Color,Formality
${OUTFITS_DATA}

Output format STRICTLY:
Top: [Top Wear Name] (ID: Outfit ID) (Category: Top Wear)
Bottom: [Bottom Wear Name] (ID: Outfit ID) (Category: Bottom Wear)

User Preferences:
${userPreferences}
`;
};

export const getOutfitRecommendations = async (selections) => {
  try {
    const prompt = buildPrompt(selections);

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API Error: ${errorData.message || JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || '';

    // Parse the response - modified regex to capture 3 or 4 digits for ID
    const topMatch = message.match(/Top:\s*([^(]+)\s*\(ID:\s*(\d{3,4})\)\s*\(Category:\s*Top Wear\)/i);
    const bottomMatch = message.match(/Bottom:\s*([^(]+)\s*\(ID:\s*(\d{3,4})\)\s*\(Category:\s*Bottom Wear\)/i);

    if (!topMatch || !bottomMatch) {
      throw new Error('Failed to parse recommendation from API response');
    }

    return {
      top: {
        name: topMatch[1].trim(),
        id: topMatch[2].trim(), // ID should now include leading zeros if Groq returns it
        category: 'Top Wear'
      },
      bottom: {
        name: bottomMatch[1].trim(),
        id: bottomMatch[2].trim(), // ID should now include leading zeros if Groq returns it
        category: 'Bottom Wear'
      },
      accessories: []
    };

  } catch (error) {
    console.error('Recommendation error:', error.message);
    throw error;
  }
};