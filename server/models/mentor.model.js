const mongoose = require('mongoose');

const MentorSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  location: { type: String, required: true },
  company: { type: String, required: true },
  tasks: { type: Array, required: false, default: [] },
});

module.exports = mongoose.model('Mentor', MentorSchema);
