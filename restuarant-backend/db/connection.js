// In your main application file (e.g., app.js or server.js)
const mongoose = require('mongoose');

const initialize = () => {
  const connectionString = `mongodb://127.0.0.1:27017/restaurantDB`

  mongoose.set('debug', true)
  mongoose.connect(connectionString)

  const db = mongoose.connection
  db.on('error', (err) => console.log(err))
  db.once('open', () => console.log('DB Available'))
}

module.exports = initialize