
// models/moodModel.js
const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  date: { type: String, required: true }, // Store date as "YYYY-MM-DD" string
  mood: { type: String, required: true }, // The emoji or mood key
}, {
  timestamps: true,
});

// Ensure a user can only have one mood entry per day
moodSchema.index({ user: 1, date: 1 }, { unique: true });

const Mood = mongoose.model('Mood', moodSchema);
module.exports = Mood;