// models/resourceModel.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  category: { type: String, required: true, enum: ['Mild', 'Moderate', 'Severe', 'General'] },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
