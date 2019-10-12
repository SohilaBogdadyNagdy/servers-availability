var express = require("express");
var bodyParser = require("body-parser");
var routers = require("./routers");

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(routers)


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});