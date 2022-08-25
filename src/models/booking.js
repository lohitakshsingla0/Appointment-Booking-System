const express= require("express");
const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type:Date, 
        required:true,
        timestamp: true
    },
    endDate: {
        type:Date, 
        required:true
    },
    // startTime: {
    //     type:Number, 
    //     required:true
    // },
    // endTime: {
    //     type:Number, 
    //     required:true
    // },
    clientName: {
        type: String,
        required: true,
    }
})


const Booking = new mongoose.model("Booking" , bookingSchema);

module.exports = Booking;