const express = require('express');
const { addBooking, calculateGST, fileGST, processGST } = require('../controllers/bookingController');

const router = express.Router();

router.post('/add', addBooking);
router.post('/calculate-gst', calculateGST);
router.post('/file-gst', fileGST);

// Simulated Firestore Trigger (process GST every 1 Minute)
setInterval(processGST, 60000);

module.exports = router;
