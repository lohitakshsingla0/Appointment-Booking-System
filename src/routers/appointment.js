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
        const insertUser = await addingUsers.save();
        res.status(201).send(insertUser);
    }catch(e){
        res.status(400).send(e);
    }
})

//Adding data to collection
router.post("/addBooking", (req, res) =>{
    addBooking(req, res)
})



router.post("/availability", async (req, res) => {
    //get all the booking of that date
    const name = req.body.user
    const date = new Date(req.body.date).toDateString()

    const allBookings = await booking.find({user: name})
    const arrayOfThatDay =[]
    for (const arrangement of allBookings) {
        let meetStart = new Date(arrangement.startTime).toDateString()

        if(meetStart === date){
            let meetStart=  new Date(arrangement.startTime)
            let meetEnd = new Date(arrangement.endTime)


            let meets = {
                startTime : meetStart,
                endTime:meetEnd
            }

            arrayOfThatDay.push(meets)
        }
    }

    res.status(201).send(arrayOfThatDay)
})


router.get("/booking/:user", async (req, res) => {
    const name = req.params.user
    console.log(name)
    const allAppointments = await booking.find({user: name})
    const listOfBookings = []

    if(allAppointments) {
        for (const arrangement of allAppointments) {
            let meetStart=  new Date(arrangement.startTime)
            let meetEnd = new Date(arrangement.endTime)


            let meets = {
                startTime : meetStart,
                endTime:meetEnd
            }

            listOfBookings.push(meets)
        }
    }


    console.log(allAppointments)
    res.status(201).send(listOfBookings)
})

async function addBooking(req, res) {

    try {
        const {name, startDate, endDate, clientName} = req.body

        console.log(req.body)

        console.log(name)
        console.log(new Date(startDate).getTime())
        console.log(new Date(endDate).getTime())
        console.log(clientName)


        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()

        console.log("start date = "+start)
        console.log("end date = "+end)

        const meetingHead = await Users.find({user:name})
        if(meetingHead.length<=0) {
            console.log(meetingHead);
            res.status(401).send("user not found")
            return
        }
        console.log(meetingHead);



        const alreadyExist = await booking.find({user:name})
        if(alreadyExist){
            for (const meeting of alreadyExist) {
                if (between(start, meeting.startTime, meeting.endTime) || between(end, meeting.startTime, meeting.endTime) ) {
                    console.log("User already has appointment at this timestamp");
                    res.status(201).send("appointment already exist for this user, please choose a different time");
                    return
                }
            }
        }


       const appointment = await booking.create({
            user:name,
            startTime: start,
            endTime: end,
            client: clientName
        })

        console.log("Booking added......")
        res.status(201).send(appointment);


    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }

}


const between = (x, min, max) => {
    return x >= min && x <= max;
}

module.exports.addBooking = addBooking;
module.exports = router;