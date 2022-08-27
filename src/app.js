const express = require("express");
const app = express();
const Users = require("../src/models/user");
const router = require("../src/routers/appointment")

require("../src/db/conn")
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(router);


module.exports = app.listen(port, () => {
    console.log(`Conenction is live at port no ${port}`);
})
