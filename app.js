var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var router = express.Router();

router.post('/available-servers', (req, res) => {
    data = req.body;
    console.log(data);
    res.status(200).send({
        success: 'true',
        message: 'servers retrieved successfully',
    })
});
const PORT = 5000;

app.use("/", router);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});