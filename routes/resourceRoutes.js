// routes/resourceRoutes.js
const express = require('express');
const router = express.Router();
const Resource = require('../Models/resourceModel');

// @desc    Fetch resources by category
// @route   GET /api/resources?category=Mild
// @access  Public
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    if (!category) {
      return res.status(400).json({ message: 'A category query parameter is required' });
    }

    const resources = await Resource.find({ category: category });
    res.json(resources);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;