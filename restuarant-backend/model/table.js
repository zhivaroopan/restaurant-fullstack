// models/Table.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

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
  },
  price: {
    type: Number,
    required: true
  },
  foodItems: [itemSchema]
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
