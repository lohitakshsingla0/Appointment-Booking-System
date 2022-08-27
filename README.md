# Appointment Booking System
 Coding Challenge


For the database, I am using MongoDB
For the backend, Node and Express is used.
There are 4 APIs,

Post:

/addUser - this api adds the user to the database.
/addBooking - this create an appointment between the client and the user.
/availability - this gets the appointment of the user for that date.


GET:

/booking/:user - gets all the booking of the user.

Mongo DB models are defined in the models folder.


The main logic of the application is written in the appointment.js


Test is written in test.js which contains all the structure required to be sent over the backend.




