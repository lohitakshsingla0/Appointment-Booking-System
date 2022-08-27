//const supertest = require('supertest');
const app = require('../src/app');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);


describe('/POST Users', () => {
    it('It should save user info in the db', (done) => {
        let userData = {
            user: "Doe",
            country: "Germany",
            contact: 123456789
        }
        chai.request(app)
            .post('/addUser')
            .send(userData)
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res)
                res.should.have.property('text').eql('User Added Successfully');
                done();
            });
    });
});


describe('/POST Bookings', () => {
    it('It should schedule an appointment with the already existing user with the client who is req for an appointment', (done) => {
        let userData = {
            name:"John Doe",
            startDate:"2022-07-23T18:45:43.511Z",
            endDate:"2022-07-23T19:15:43.511Z",
            clientName:"Lohit"
        }

        chai.request(app)
            .post('/addBooking')
            .send(userData)
            .end((err, res) => {
                res.should.have.status(201);
                console.log(res.text)
                res.should.have.property('text').eql('appointment successfully scheduled');
                done();
            });
    });
});


describe('/GET Bookings', () => {
    it('It should give all the appointments of the user', (done) => {


        chai.request(app)
            .get('/booking/Doe')
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('array');
                done();
            });
    });
});


describe('/POST Bookings', () => {
    it('It should give all the appointments of the user for that date', (done) => {
        let userData = {
            name:"Doe",
            date:"2022-07-23T18:45:43.511Z",
        }

        chai.request(app)
            .post('/availability')
            .send(userData)
            .end((err, res) => {
                console.log(res)
                res.should.have.status(201);
                res.body.should.be.a('array');
                done();
            });
    });
});