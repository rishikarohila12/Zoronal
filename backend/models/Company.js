// models/Company.js
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  foundedOn: { type: Date, required: true },
  logoUrl: { type: String, default: 'https://via.placeholder.com/150' }, 
  description: { type: String, default: 'No description provided.' },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);