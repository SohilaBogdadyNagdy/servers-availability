var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5500");
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
    describe("it should return online server that has the lowest priority", function (done) {
        server
            .post("/available-servers")
            .send(data)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body["online_server"].should.equal("http://bosta.co")
            })

    })
});

describe("test post empty list", function () {
    describe("it should return bad request", function (done) {
        server
            .post("/available-servers")
            .send([])
            .expect(400)
            .end(function (err, res) {
                res.status.should.equal(400);
            })

    })
});