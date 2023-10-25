// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../model/table');
const areAllTablesBooked = require('../services/bookingLogic');
const User = require('../model/user');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const { fromDate, toDate, people } = req.query
    let query = {}
    if (fromDate && toDate) {
      query.dateOfBooking = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }
    if (people) {
      query.peopleCount = parseFloat(people);
    }
    const bookings = await Booking.aggregate([
      {
        $match: query,
      },
    ]).exec();
    let price = 0
    if  (bookings.length > 0) {
      bookings.forEach(booking => {
        price += booking.price
      })
    }
    res.status(200).json({ data: bookings, price })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to check table availability for a specific time frame
router.post('/', async (req, res) => {
    const { time, people, name, price } = req.body; // Assuming you pass these as query parameters
  
    try {
      const allTablesBooked = await areAllTablesBooked(time, people);
      if (allTablesBooked) {
        const booking = new Booking({
          timeSlot: time,
          peopleCount: people,
          username: name,
          price
        })
        await booking.save()
        res.status(200).json({ message: 'Table Booked successfully' });
      } else {
        res.status(400).json({ message: 'No tables available for this slot' });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Update a booking by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(404).json({ error: 'Booking not found' });
  }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Booking not found' });
  }
});

module.exports = router;
