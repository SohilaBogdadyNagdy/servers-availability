var promise = require("promise");
var http = require("http");

exports.findServers = async function (req, res, next) {
    var data = req.body;
    var availabe_servers = [];
    try {
        servers = [
            "http://doesNotExist.bosta.co",
            "http://bosta.co",
            "http://offline.bosta.co",
            "http://google.com"
        ];
        servers.forEach(url => {
            check_server(url).then(
                function (url) {
                    availabe_servers.push(url);
                },
                function (err) {
                    console.log(url + " failed");
                });
        });
        console.log(availabe_servers)
        res.status(200).send({
            "availabe_servers": availabe_servers
        });

    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

function check_server(url) {
    return new Promise(function (fullfill, reject) {
        var timeout = 5000;
        var timer = setTimeout(function () {
            reject("timeout");
        }, timeout);

        const req = http.get(url, function (res) {
            if (res.statusCode >= 200 && res.statusCode <= 299) {
                fullfill(url);
            } else {
                reject(url);
            }
        });
        req.setTimeout(timeout, function () {
            reject("timeout");
        });

    });
}