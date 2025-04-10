const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//DB connection
const conn = require("./db/conn");
conn();

const routes = require("./routes/router");
app.use("/api", routes);

app.listen(4000, function() {
    console.log("Servidor Online!");
});

module.exports = app
