const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  date: { type: String, required: true }, // You can use Date type as well
  userIds: [{ type: String, required: true }], // Store user IDs as strings
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
