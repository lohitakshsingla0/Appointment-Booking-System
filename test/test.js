const { addBooking } = require("../src/routers/appointment")

const { expect } = require("chai");


describe("User Service Unit Tests", function () {
    describe("Save User functionality", function () {
      it("should successfully add a booking if the user exits and the appointment slot is free", async function () {
        const inputTestData = {
          name : "Justin",
          startDate : "2022-09-05 12:00:00",
          endDate : "2022-09-05 14:00:00",
          client : "Max"};
        const returnedAppointment = await addBooking(inputTestData);
          
        expect(returnedAppointment.user).to.equal(inputTestData.name);
          
        const start = new Date(inputTestData.startDate).getTime()
        const end = new Date(inputTestData.endDate).getTime()
        expect(returnedAppointment.startTime.toString()).to.equal(start.toString());      
        expect(returnedAppointment.endTime.toString()).to.equal(end.toString());      


      });
      it("should throw an error if the user doesnot exits and the timeslot is already booked", async function () {
      });
    });
  });