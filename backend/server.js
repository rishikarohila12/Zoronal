const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Controllers import karein [cite: 9]
const companyController = require('./controllers/companyController');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Frontend (React) se connect karne ke liye zaroori hai 

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reviewApp')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// --- API ROUTES ---
// Routes ko directly controller se link karein [cite: 9]

// 1. Company Routes
app.get('/api/companies', companyController.getCompanies); // [cite: 18, 22]
app.post('/api/companies', companyController.createCompany); // [cite: 12, 17]
app.get('/api/companies/:id', companyController.getCompanyById);
// 1. Company Routes
app.get('/api/companies', companyController.getCompanies);
app.post('/api/companies', companyController.createCompany);

app.get('/api/companies/:id', companyController.getCompanyById);

// 2. Review Routes
app.post('/api/reviews', companyController.addReview); // Naya Review add karne ke liye [cite: 23, 28]
app.get('/api/reviews/:companyId', companyController.getCompanyReviews); // Review Listing [cite: 29, 32]
app.put('/api/reviews/like/:id', companyController.likeReview);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));