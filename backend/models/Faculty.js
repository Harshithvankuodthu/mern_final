const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  facultyId: { type: String, required: true, unique: true }, // New field for Student ID
  password: { type: String, required: true }
});


const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
    