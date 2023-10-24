const Table = require('../model/table')
async function areAllTablesBooked(time, people) {
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  const bookings = await Table.aggregate([
    {
      $match: {
        timeSlot: time,
        peopleCount: people,
        dateOfBooking: {
          $gte: today, // Greater than or equal to today
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than tomorrow (to capture all records for today)
        }
    }
  }
  ]).exec();
  if (bookings.length > 0) return false
  return true
  }

module.exports = areAllTablesBooked
  