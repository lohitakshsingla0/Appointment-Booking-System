const express = require("express");
const router = new express.Router();
const Users = require("../models/user");
const booking = require("../models/booking");
const e = require("express");


//Adding user to DB
router.post("/addUser", async(req, res) =>{
    try{
        const addingUsers = new Users(req.body);
        console.log(req.body);
        await addingUsers.save();
        res.status(201).send("User Added Successfully");
    }catch(e){
        res.status(400).send(e);
    }
})

//Creating an appointment
router.post("/addBooking", (req, res) =>{
    addBooking(req, res)
})


//get all the booking of that date for that user
router.post("/availability", async (req, res) => {
    const name = req.body.user
    const date = new Date(req.body.date).toDateString()

    const allBookings = await booking.find({user: name})

    if(allBookings.length >=0) {
        const arrayOfThatDay = []
        for (const arrangement of allBookings) {
            let meetStart = new Date(arrangement.startTime).toDateString()

            if (meetStart === date) {
                let meetStart = new Date(arrangement.startTime)
                let meetEnd = new Date(arrangement.endTime)


                let meets = {
                    startTime: meetStart,
                    endTime: meetEnd
                }

                arrayOfThatDay.push(meets)
            }
        }

        if(arrayOfThatDay >=0 ) {
            res.status(201).send(arrayOfThatDay)
        }
        else {
            res.status(201).send("No Booking found for that day")
        }
    }else{
        res.status(404).send("No booking found for that user")
    }
})


//get all appointments of that user
router.get("/booking/:user", async (req, res) => {
    const name = req.params.user
    console.log(name)
    const allAppointments = await booking.find({user: name})
    const listOfBookings = []

    if(allAppointments.length >=0) {
        for (const arrangement of allAppointments) {
            let meetStart=  new Date(arrangement.startTime)
            let meetEnd = new Date(arrangement.endTime)


            let meets = {
                startTime : meetStart,
                endTime:meetEnd
            }

            listOfBookings.push(meets)
        }
        console.log(allAppointments)
        res.status(201).send(listOfBookings)
    }else{
        res.status(404).send("No bookings found for this user")
    }
})


async function addBooking(req, res) {

    try {
        //To create an appointment, 4 data points are required
        //user, start date, end date and with whom the appointment is going to take place.
        const {name, startDate, endDate, clientName} = req.body

        console.log(req.body)

        console.log(name)
        console.log(new Date(startDate).getTime())
        console.log(new Date(endDate).getTime())
        console.log(clientName)


        //convert the given date into timestamp
        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()

        console.log("start date = "+start)
        console.log("end date = "+end)

        //find the user
        const meetingHead = await Users.find({user:name})
        if(meetingHead.length<=0) {
            console.log(meetingHead);
            return res.status(401).send("user not found")
        }

        //if the user exists, get all the bookings
        const alreadyExist = await booking.find({user:name})
        if(alreadyExist){
            for (const meeting of alreadyExist) {
                //if there is already an existing appointment give this response.
                if (between(start, meeting.startTime, meeting.endTime) || between(end, meeting.startTime, meeting.endTime) ) {
                    console.log("User already has appointment at this timestamp");
                    return res.status(201).send("appointment already exist for this user, please choose a different time");

                }
            }
        }

        await booking.create({
            user:name,
            startTime: start,
            endTime: end,
            client: clientName
        })

        console.log("Booking added......")
        return res.status(201).send("appointment successfully scheduled");


    } catch (e) {
        console.log(e)
        return res.status(400).send(e);
    }

}


const between = (x, min, max) => {
    return x >= min && x <= max;
}
module.exports = router;