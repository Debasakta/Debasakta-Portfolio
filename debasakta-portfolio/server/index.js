import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import { Review } from './models/Review.js'; // Ensure this path is correct

dotenv.config();

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅🍃 MongoDB Atlas Connected Successfully!'))
  .catch((err) => console.error('❌ Database connection error:', err));

// 1. TEST ROUTE
app.get('/', (req, res) => {
  res.send('Portfolio Server is up and running! 🚀');
});

// 2. AUTHENTICATION ROUTE
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    console.log('User Verified:', payload.name);

    res.status(200).json({
      success: true,
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      }
    });
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid Google Token' });
  }
});

// 3. POST ROUTE FOR REVIEWS
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, email, picture, comment, rating } = req.body;
    
    // Create a new document based on our Review Schema
    const newReview = new Review({
      name,
      email,
      picture,
      comment,
      rating
    });

    // Save it to MongoDB Atlas
    await newReview.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Review saved to Atlas!' 
    });
    console.log(`Review saved from: ${name}`);
  } catch (error) {
    console.error('Save Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while saving review' 
    });
  }
});
// Sending review data from MongoDB to frontend
app.get('/api/reviews', async (req, res) => {
      try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({message: 'Error fetching reviews', error});
      }
    });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});