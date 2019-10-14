var promise = require("promise");
var request = require("request");

exports.findServers = async function (req, res) {
    var data = req.body;
    var availabe_servers = [];
    try {
        servers = [
            "http://doesNotExist.bosta.co",
            "http://bosta.co",
            "http://offline.bosta.co",
            "http://google.com",
        ];
        servers.forEach(async (url) => {
            check_server(url).then(
                function (url) {
                    console.log("fillfull ", url);
                    availabe_servers.push(url);
                },
                function (err) {
                    //console.log(err);
                }
            );
        });
        return res.status(200).json({
            status: 200,
            data: availabe_servers
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
        var options = {
            url: url,

        }
        request.get(options, function(err, res) {
            if (err) {
                console.log("err");
                reject(err);
            }
            if (res.statusCode <= 200 || res.statusCode > 300) {
                fullfill(url);
            }
        });

    });
}