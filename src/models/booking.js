const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type:Number,
        required:true,
    },
    endTime: {
        type:Number,
        required:true
    },
    client: {
        type: String,
        required: true,
    }
})


const Booking = new mongoose.model("Booking" , bookingSchema);

module.exports = Booking;