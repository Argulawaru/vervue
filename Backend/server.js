import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { getOutfitRecommendations } from './service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;




app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true
}));

// Middlewares
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Outfit Recommendation API is running!',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/recommend (POST)']
  });
});

// Main recommendation route
app.post('/api/recommend', async (req, res) => {
  try {
    console.log('Received recommendation request:', req.body);
    
    // Validate request body
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const result = await getOutfitRecommendations(req.body);
    console.log('Sending response:', result);
    
    res.json(result);
  } catch (err) {
    console.error('Error in /api/recommend:', err);
    res.status(500).json({ 
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: ['GET /', 'POST /api/recommend']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Test the API at: POST http://localhost:${PORT}/api/recommend`);
  console.log(`Health check at: GET http://localhost:${PORT}/`);
});