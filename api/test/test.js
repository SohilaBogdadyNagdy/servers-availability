var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5000");
var data = [{
        "url": "http://doesNotExist.bosta.co",
        "priority": 1
    },
    {
        "url": "http://bosta.co",
        "priority": 7
    },
    {
        "url": "http://offline.bosta.co",
        "priority": 2
    },
    {
        "url": "http://google.com",
        "priority": 4
    }
]
describe("test list all availabe servers", function () {
    describe("it should return array", function (done) {
        server
            .post("/available-servers")
            .send(data)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (req, res) {
                res.status.should.equal(200);
                // done();

            })

    })
});