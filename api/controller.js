var promise = require("promise");
var request = require("request");

exports.findServers = async function (req, res) {
    var data = req.body;
    var promise_list = [];
    var availabe_servers = [];
    try {
        data.forEach(async obj => {
            promise_list.push(
                check_server(obj["url"]).then(
                    function (url) {
                        availabe_servers.push({
                            "url": url,
                            "priority": obj["priority"]
                        });
                    },
                    function (err) {
                        console.log(err);
                    }
                )
            )
        });
        Promise.all(promise_list).then(function () {
            availabe_servers.sort(function (a, b) {
                return a.priority - b.priority
            });
            return res.status(200).json({
                "online_server": availabe_servers[availabe_servers.length - 1]["url"]
            });
        }).catch(function () {
            return res.status(400).json({
                message: "All servers are offline"
            });
        })


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
            timeout: timeout
        }
        request.get(options, function (err, res) {
            if (err) {
                reject(err);
            }
            if (res.statusCode <= 200 || res.statusCode > 300) {
                fullfill(url);
            }
        });

    });
}