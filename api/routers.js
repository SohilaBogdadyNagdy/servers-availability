var express = require("express");
var router = express.Router();
var controller = require("./controller");

router.post("/available-servers", controller.findServers);

module.exports = router;