const express = require('express');
const app = express();
const cors = require('cors')
const authRouter = require('./routes/auth');
const authenticateUser = require('./middleware/auth');
const bookingsRouter = require('./routes/bookings');
const initialize = require('./db/connection')

// Middleware
app.use(cors())
app.use(express.json());
// Routes
app.use('/api/auth', authRouter);

app.get('/api/protected', authenticateUser, (req, res) => {
  res.status(200).json({ message: 'This route is protected' });
});

app.use('/api/bookings', bookingsRouter);

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  initialize()
  console.log(`Server is running on port ${port}`);
});
