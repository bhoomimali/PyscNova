// routes/moodRoutes.js
const express = require('express');
const router = express.Router();
// Added a comment to force a Git update
const Mood = require('../models/moodModel');
const { protect } = require('../middleware/authMiddleware');

// @desc    Save or update today's mood
// @route   POST /api/moods
// @access  Private
router.post('/', protect, async (req, res) => {
  const { date, mood } = req.body;
  if (!date || !mood) {
    return res.status(400).json({ message: 'Date and mood are required' });
  }

  // "upsert": update if exists, insert if it doesn't
  const newMood = await Mood.findOneAndUpdate(
    { user: req.user._id, date: date }, // Find by user and date
    { mood: mood }, // Set the new mood
    { new: true, upsert: true } // Options: return new doc, create if not found
  );

  res.status(201).json(newMood);
});

// @desc    Get all moods for the logged-in user
// @route   GET /api/moods
// @access  Private
router.get('/', protect, async (req, res) => {
  const moods = await Mood.find({ user: req.user._id });
  res.json(moods);
});

module.exports = router;