const express= require("express");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: Number,
        required: true,
        trim: true
    }
})


const Users = new mongoose.model("Users" , userSchema);

module.exports = Users;