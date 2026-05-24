const mongoose = require('mongoose');
const Company = require('../models/Company');
const Review = require('../models/Review');

// 1. Add a new Company
exports.createCompany = async (req, res) => {

  try {

    const {
      name,
      location,
      city,
      foundedOn
    } = req.body;

    // Random Logos
    const dummyLogos = [
      "/logos/logo1.png",
      "/logos/logo2.png",
      "/logos/logo3.png",
      "/logos/logo4.png",
    ];

    const randomLogo =
      dummyLogos[
        Math.floor(Math.random() * dummyLogos.length)
      ];

    // Random Descriptions
    const descriptions = [
      "Leading software and technology company.",
      "Innovative startup focused on digital solutions.",
      "Trusted company delivering premium services.",
      "Fast-growing company with modern solutions.",
      "Top-rated company in the technology sector.",
    ];

    const randomDescription =
      descriptions[
        Math.floor(Math.random() * descriptions.length)
      ];

    // Create Company
    const newCompany = new Company({
      name,
      location,
      city,
      foundedOn,
      description: randomDescription,
      logoUrl: randomLogo,
    });

    await newCompany.save();

    res.status(201).json({
      success: true,
      data: newCompany
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// 2. Get All Companies with Search, City Filter, and Sorting
exports.getCompanies = async (req, res) => {

  try {

    const { search, city, sortBy } = req.query;

    let query = {};

    if (city && city !== "") {
      query.city = { $regex: city, $options: "i" };
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    let companies = await Company.find(query);

    // Dynamic Rating + Reviews
    const updatedCompanies = await Promise.all(

      companies.map(async (company) => {

        const reviews = await Review.find({
          companyId: company._id
        });

        const totalReviews = reviews.length;

        const averageRating =
          totalReviews > 0
            ? (
                reviews.reduce(
                  (acc, item) => acc + item.rating,
                  0
                ) / totalReviews
              ).toFixed(1)
            : 0;

        return {
          ...company._doc,
          totalReviews,
          averageRating
        };

      })

    );

    res.status(200).json({
      success: true,
      count: updatedCompanies.length,
      data: updatedCompanies
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
// 3. Add Review and Recalculate Average Rating
exports.addReview = async (req, res) => {

  try {

    const {
      companyId,
      fullName,
      subject,
      reviewText,
      rating
    } = req.body;

    const review = new Review({
      companyId,
      fullName,
      subject,
      reviewText,
      rating
    });

    await review.save();

    // Aggregate Ratings
    const stats = await Review.aggregate([

      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId)
        }
      },

      {
        $group: {
          _id: '$companyId',
          avgRating: { $avg: '$rating' },
          total: { $sum: 1 }
        }
      }

    ]);

    // Update Company Rating
    if (stats.length > 0) {

      await Company.findByIdAndUpdate(companyId, {

        averageRating: parseFloat(
          stats[0].avgRating.toFixed(1)
        ),

        totalReviews: stats[0].total

      });

    }

    res.status(201).json({
      success: true,
      data: review
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// 4. Get Reviews for a Specific Company
exports.getCompanyReviews = async (req, res) => {

  try {

    const { companyId } = req.params;
    const { sortBy } = req.query;

    let sortOptions = {
      createdAt: -1
    };

    // Sort by Rating
    if (sortBy === 'rating') {

      sortOptions = {
        rating: -1
      };

    }

    const reviews = await Review
      .find({ companyId })
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      data: reviews
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// 5. Get Single Company By ID
exports.getCompanyById = async (req, res) => {

  try {

    const company = await Company.findById(req.params.id);

    if (!company) {

      return res.status(404).json({
        success: false,
        message: "Company not found"
      });

    }

    res.status(200).json({
      success: true,
      data: company
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// 6. Like Review
exports.likeReview = async (req, res) => {

  try {

    const review = await Review.findById(req.params.id);

    if (!review) {

      return res.status(404).json({
        success: false,
        message: "Review not found"
      });

    }

    review.likes += 1;

    await review.save();

    res.status(200).json({
      success: true,
      data: review
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};