const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bookingAmount: { type: Number, required: true },
    state: { type: String, required: true },
    status: { type: String, required: true },
    igst: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    gstFiled: { type: Boolean, default: false }
});

module.exports = mongoose.model('Booking', bookingSchema);
