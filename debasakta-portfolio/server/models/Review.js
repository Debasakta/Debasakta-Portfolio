import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Review = mongoose.model('Review', reviewSchema);