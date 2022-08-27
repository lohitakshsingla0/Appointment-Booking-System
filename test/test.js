const { addBooking } = require("../src/routers/appointment")




describe("User Service Unit Tests", function () {
    describe("Save User functionality", function () {
      it("should successfully add a booking if the user exits and the appointment slot is free", async function () {
        const name = "Justin";
        const startDate = "2022-09-05 12:00:00";
        const endDate = "2022-09-05 14:00:00";
        const client = "Max";
        const returnedUser = await addBooking({
            name,
            startDate,
            endDate,
            client,
          });


      });
      it("should throw an error if the user doesnot exits and the timeslot is already booked", async function () {
      });
    });
  });