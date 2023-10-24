// models/Table.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  username: String,
  timeSlot: {
    type: String,
    required: true,
  },
  peopleCount: {
    type: Number,
    required: true,
  },
  dateOfBooking: {
    type: Date,
    default: new Date()
  }
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
