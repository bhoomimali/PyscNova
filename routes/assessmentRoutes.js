// routes/assessmentRoutes.js
const express = require('express');
const router = express.Router();
const Assessment = require('../Models/assessmentModel');
const { protect } = require('../middleware/authMiddleware'); // Import our gatekeeper

// @desc    Submit a new assessment
// @route   POST /api/assessments
// @access  Private (requires login)
router.post('/', protect, async (req, res) => {
  // Because we used the `protect` middleware, we have access to `req.user`
  try {
    const { quizType, score, resultCategory } = req.body;

    if (!quizType || !score || !resultCategory) {
      return res.status(400).json({ message: 'Please provide all assessment fields' });
    }

    const assessment = new Assessment({
      user: req.user._id, // Link the assessment to the logged-in user
      quizType,
      score,
      resultCategory,
    });

    const createdAssessment = await assessment.save();
    res.status(201).json(createdAssessment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all assessments for the logged-in user
// @route   GET /api/assessments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;