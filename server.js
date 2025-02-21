require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/bookings', bookingRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`GST API running on http://localhost:${PORT}`);
});
