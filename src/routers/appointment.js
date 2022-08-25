const express = require("express");
const router = new express.Router();
const Users = require("../models/user");
const booking = require("../models/booking");
const e = require("express");


//Adding data to collection
router.post("/addUser", async(req, res) =>{
    try{
        const addingUsers = new Users(req.body);
        console.log(req.body);
        const insertuser = await addingUsers.save();
        res.status(201).send(insertuser);
    }catch(e){
        res.status(400).send(e);
    }
})

//Adding data to collection
router.post("/addBooking", async(req, res) =>{
    try{
        const addBooking = new booking(req.body);
        //console.log(req.body);
        const insertbooking = await addBooking.save();
        console.log(checkingAvailability(insertbooking));
      

        console.log("Booking added......")
        res.status(201).send(insertbooking);
    }catch(e){
        console.log(e)
        res.status(400).send(e);
    }
})
const timeList = [];
const checkingAvailability = function(obj){
    
    const nameOfUser = obj.name;
    const newStartDate= obj.startDate;
    const newEndDate= obj.endDate;
    //const timeList = [];
    if (timeList.length!=0){
    
        for (let i=0; i<timeList.length; i+2 )
            if((newStartDate>=timeList[i]) && ( timeList[i+1] < newEndDate)){
                console.log("Date is invalid");
                break;
            }
           
        console.log(nameOfUser)
        
    }
    else{
        timeList.push(newStartDate);
        timeList.push(newEndDate);
    }
    console.log(timeList);
    return typeof(newStartDate);
}

//Reading User Data
router.get("/users", async(req, res) =>{
    try{
        const readUserData = await Users.find({});
        res.send(readUserData);
    }catch(e){
        res.status(400).send(e);
    }
})


//Fetching Bookings for User(with name)
router.get("/booking/:name", async(req, res) =>{
    try{
        const _name = req.params.name;
        const readBookingsByName = await booking.find({ name:_name});
        //const a = JSON.stringify(readBookingsByName)

        // const startDate= readBookingsByName[0].startDate;
        // const endDate= readBookingsByName[0].endDate;



        console.log(startDate, endDate);
        res.send(readBookingsByName);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

//Fetching Bookings for User(with id)
router.get("/booking/:id", async(req, res) =>{
    try{
        const _id = req.params.id;
        const readBookingsById = await booking.findById(_id);
        res.send(readBookingsById);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

module.exports = router;