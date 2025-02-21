const Booking = require('../models/Booking');
const axios = require('axios');

// Add Booking
const addBooking = async (req, res) => {
    try {
        const { name, bookingAmount, state, status } = req.body;
        if (!name || !bookingAmount || !state || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newBooking = new Booking({ name, bookingAmount, state, status });
        await newBooking.save();
        res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Calculate GST
const calculateGST = (req, res) => {
    const { bookingAmount, state } = req.body;
    if (!bookingAmount || !state) {
        return res.status(400).json({ error: 'Missing bookingAmount or state' });
    }

    let igst = 0, cgst = 0, sgst = 0;
    const gstRate = 18;
    const gstAmount = (bookingAmount * gstRate) / 100;

    if (state.toLowerCase() === 'interstate') {
        igst = gstAmount;
    } else {
        cgst = gstAmount / 2;
        sgst = gstAmount / 2;
    }

    res.json({
        bookingAmount,
        gstRate,
        gstAmount,
        igst,
        cgst,
        sgst,
        status: 'GST Calculated Successfully'
    });
};

// File GST
const fileGST = (req, res) => {
    const { bookingId, gstDetails } = req.body;
    if (!bookingId || !gstDetails) {
        return res.status(400).json({ error: 'Missing bookingId or gstDetails' });
    }

    res.json({
        bookingId,
        gstFilingStatus: 'Filed Successfully',
        referenceId: `GST-${Math.floor(Math.random() * 100000)}`
    });
};

// Process GST (Runs every 5 seconds)
const processGST = async () => {
    const bookings = await Booking.find({ status: 'finished', gstFiled: false });
    for (const booking of bookings) {
        console.log(`Processing GST for Booking ID: ${booking._id}`);
        try {
            const gstResponse = await axios.post('http://localhost:5000/api/bookings/calculate-gst', {
                bookingAmount: booking.bookingAmount,
                state: booking.state
            });

            await Booking.findByIdAndUpdate(booking._id, {
                igst: gstResponse.data.igst,
                cgst: gstResponse.data.cgst,
                sgst: gstResponse.data.sgst
            });

            const filingResponse = await axios.post('http://localhost:5000/api/bookings/file-gst', {
                bookingId: booking._id,
                gstDetails: gstResponse.data
            });

            console.log('GST Filing Response:', filingResponse.data);
            await Booking.findByIdAndUpdate(booking._id, { gstFiled: true });

        } catch (error) {
            console.error('Error in GST Processing:', error.message);
        }
    }
};

module.exports = { addBooking, calculateGST, fileGST, processGST };
